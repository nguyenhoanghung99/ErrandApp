import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {CategoryContext} from '../../../contexts/CategoryContext';
import useChatList from '../../../hooks/chat/useChatList';
import ChatListItem from '../../../components/Chat/ChatListItem';
import {UserContext} from '../../../contexts/UserContext';
import {getLastChat, getUnreadChatCount} from '../../../utils/util';
import {useTranslation} from 'react-i18next';

const Chat = () => {
  const {t} = useTranslation();
  const {id: myId} = useContext(UserContext);
  const {categoryList} = useContext(CategoryContext);
  const {chatList} = useChatList();

  if (chatList.length === 0) {
    return (
      <View
        style={{
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>
          {t('noChat')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.page}>
        {chatList.map(chat => {
          let amIHelper = false;
          const lastChat = getLastChat(chat?.messages as string[]);
          if (myId === chat.helperId) {
            amIHelper = true;
          }
          return (
            <ChatListItem
              chatId={chat.id}
              key={chat.id}
              profileImageUrl={
                amIHelper ? chat.clientImageUrl : chat.helperImageUrl
              }
              name={amIHelper ? chat.clientName : chat.helperName}
              lastMessage={lastChat.message}
              lastMessageTime={lastChat.timestamp}
              unreadMessageCount={getUnreadChatCount(
                myId,
                chat?.messages as string[],
              )}
              categoryImageUrl={
                categoryList.find(category => category.id === chat.categoryId)
                  ?.imageUrl as string
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
});
