import {useContext, useEffect, useState} from 'react';
import {Chat, ListChatsQuery, OnUpdateChatSubscription} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {listChats} from '../../graphql/queries';
import {GraphQLResult, GraphQLSubscription} from '@aws-amplify/api';
import {Alert} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {onUpdateChat} from '../../graphql/subscriptions';

const useChatList = () => {
  const navigation = useNavigation();
  const {id: myId} = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);

  const getMyChatList = async () => {
    setLoading(true);
    try {
      const chatListQuery = (await API.graphql(
        graphqlOperation(listChats, {
          filter: {
            or: [{helperId: {eq: myId}}, {clientId: {eq: myId}}],
            and: [{status: {eq: 'ACTIVE'}}],
          },
        }), // helper id로 필터링
      )) as GraphQLResult<ListChatsQuery>;
      chatListQuery.data?.listChats?.items &&
        setChatList(
          chatListQuery.data.listChats.items.filter(Boolean) as Chat[],
        );
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to get chat list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyChatList().then(() => {
        const subscription = API.graphql<
          GraphQLSubscription<OnUpdateChatSubscription>
        >(
          graphqlOperation(onUpdateChat, {
            filter: {or: [{helperId: {eq: myId}}, {clientId: {eq: myId}}]},
          }),
        );
        if ('subscribe' in subscription) {
          subscription.subscribe({
            // @ts-ignore
            next: ({value: {data}}: {value: {data: {onUpdateChat: Chat}}}) => {
              if (!data) {
                return;
              }
              const chat = data.onUpdateChat;
              const newChatList = [...chatList];
              const targetIndex = newChatList.findIndex(
                item => item.id === chat.id,
              );
              if (targetIndex === -1) {
                return;
              }
              newChatList[targetIndex] = chat;
              setChatList(newChatList);
            },
          });
        }
      });
    });
    return unsubscribe;
  }, []);

  return {
    isLoading,
    chatList,
  };
};

export default useChatList;
