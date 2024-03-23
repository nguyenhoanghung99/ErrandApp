import {useContext, useEffect, useState} from 'react';
import {initChatInfo} from '../../constants/model/chat';
import {API, graphqlOperation} from 'aws-amplify';
import {Chat, GetChatQuery, OnUpdateChatSubscription} from '../../API';
import {createChat, updateChat} from '../../graphql/mutations';
import {GraphQLResult, GraphQLSubscription} from '@aws-amplify/api';
import {Alert} from 'react-native';
import {getChat} from '../../graphql/queries';
import {ChatMessage} from '../../types/chat';
import {UserContext} from '../../contexts/UserContext';
import {onUpdateChat} from '../../graphql/subscriptions';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {postChatNotification} from '../../utils/notification';

const useChat = (chatId?: string) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {id: myId} = useContext(UserContext);
  const [chatInfo, setChatInfo] = useState(initChatInfo);
  const [isLoading, setLoading] = useState(false);
  const [chatInputValue, setChatInputValue] = useState('');
  const [isInitialViewd, setIsInitialViewd] = useState(false);
  const [openChatEndAlert, setOpenChatEndAlert] = useState(false);

  const amIHelper = chatInfo.helperId === myId;

  const endChatAlert = () => {
    // '거래가 종료되었습니다.'
    Alert.alert('Alert', 'The transaction has been completed.', [
      {
        text: t('check'),
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  const getChatInfo = async () => {
    if (!chatId) {
      return;
    }
    setLoading(true);
    try {
      const chatQuery = (await API.graphql(
        graphqlOperation(getChat, {id: chatId}),
      )) as GraphQLResult<GetChatQuery>;
      chatQuery.data?.getChat && setChatInfo(chatQuery.data.getChat);
      chatQuery.data?.getChat?.helperId === myId &&
        chatQuery.data?.getChat?.status === 'INACTIVE' &&
        endChatAlert();
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to get chat info.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialViewd) {
      return;
    }
    if (!chatInfo.id) {
      return;
    }
    handleViewed().then(() => {
      setIsInitialViewd(true);
    });
  }, [chatInfo.id, isInitialViewd]);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const subscription = API.graphql<
      GraphQLSubscription<OnUpdateChatSubscription>
    >(graphqlOperation(onUpdateChat, {filter: {id: {eq: chatId}}}));

    getChatInfo().then(() => {
      if ('subscribe' in subscription) {
        subscription.subscribe({
          // @ts-ignore
          next: ({value: {data}}: {value: {data: {onUpdateChat: Chat}}}) => {
            if (!data) {
              return;
            }
            const chat = data.onUpdateChat;
            if (!chat) {
              return;
            }

            const amIHelpers = chat.helperId === myId;

            if (!openChatEndAlert && chat.status === 'INACTIVE' && amIHelpers) {
              setOpenChatEndAlert(true);
              'unsubscribe' in subscription &&
                typeof subscription.unsubscribe === 'function' &&
                subscription.unsubscribe();
              endChatAlert();
            }
            setChatInfo(chat);
          },
        });
      }
    });
    return () => {
      'unsubscribe' in subscription &&
        typeof subscription.unsubscribe === 'function' &&
        subscription.unsubscribe();
    };
  }, [chatId]);

  const createChatInfo = async (chatParam: Partial<Chat>) => {
    setLoading(true);
    try {
      const createChatMutation = (await API.graphql(
        graphqlOperation(createChat, {input: chatParam}),
      )) as GraphQLResult<Chat>;
      createChatMutation.data && setChatInfo(createChatMutation.data);
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to create chat info.');
    } finally {
      setLoading(false);
    }
  };

  const updateChatInfo = async (chatParam: Partial<Chat>) => {
    setLoading(true);
    try {
      await API.graphql(graphqlOperation(updateChat, {input: chatParam}));
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to update chat info.');
    } finally {
      setLoading(false);
    }
  };

  const handleChatInputValue = (text: string) => {
    setChatInputValue(text);
  };

  const handleSend = (senderId: string, message: string) => {
    if (!chatId) {
      return;
    }

    const chatList = chatInfo.messages?.map(msg => {
      const chatMsg = JSON.parse(msg as string) as ChatMessage;
      if (chatMsg.senderId !== myId) {
        chatMsg.isViewed = true;
      }
      return JSON.stringify(chatMsg);
    }) as string[];

    const chatMessage: ChatMessage = {
      senderId,
      message,
      isViewed: false,
      timestamp: new Date().getTime(),
    };

    const chatParam: Partial<Chat> = {
      id: chatId,
      messages: [...chatList, JSON.stringify(chatMessage)],
    };
    updateChatInfo(chatParam).then(() => {
      const fcmToken = amIHelper ? chatInfo.clientFcm : chatInfo.helperFcm;
      const title = amIHelper ? chatInfo.clientName : chatInfo.helperName;
      fcmToken &&
        postChatNotification({
          fcmToken,
          title,
          body: message,
          chatId: chatInfo.id,
          chatRoomName: amIHelper ? chatInfo.helperName : chatInfo.clientName,
        });
      setChatInputValue('');
    });
  };

  const handleViewed = async () => {
    if (!chatId) {
      return;
    }
    let isLastMsgViewed = false;

    if (chatInfo.messages && chatInfo.messages.length > 0) {
      const lastMsg = JSON.parse(
        chatInfo.messages[chatInfo.messages.length - 1] as string,
      ) as ChatMessage;
      isLastMsgViewed = lastMsg.isViewed;
    }

    const chatList = chatInfo.messages?.map(message => {
      const chatMsg = JSON.parse(message as string) as ChatMessage;
      if (chatMsg.senderId !== myId) {
        chatMsg.isViewed = true;
      }
      return JSON.stringify(chatMsg);
    }) as string[];

    if (!isLastMsgViewed && chatInfo.messages && chatInfo.messages.length > 0) {
      const chatParam: Partial<Chat> = {
        id: chatId,
        messages: chatList,
      };

      await updateChatInfo(chatParam);
    }
  };

  const updateChatStatus = async (status: string) => {
    if (!chatId) {
      return;
    }
    const chatParam: Partial<Chat> = {
      id: chatId,
      status,
    };
    updateChatInfo(chatParam);
  };

  return {
    chatInfo,
    isLoading,
    setLoading,
    createChatInfo,
    chatInputValue,
    handleChatInputValue,
    handleSend,
    updateChatStatus,
  };
};

export default useChat;
