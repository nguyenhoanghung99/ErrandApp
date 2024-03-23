import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatStackParam} from '../../../types/navigation';
import useErrandDetail from '../../../hooks/errand/useErrandDetail';
import useCategory from '../../../hooks/useCategory';
import ErrandCard from '../../../components/@shared/Card/ErrandCard';
import useChat from '../../../hooks/chat/useChat';
import ChatFooter from '../../../components/Chat/ChatFooter';
import MyChatContent from '../../../components/Chat/MyChatContent';
import OtherPersonChatContent from '../../../components/Chat/OtherPersonChatContent';
import {UserContext} from '../../../contexts/UserContext';
import Loading from '../../../components/@shared/Loading';
import {ChatMessage} from '../../../types/chat';
import {calculateDistance, diffDateToString} from '../../../utils/util';
import {LatLng} from 'react-native-maps';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<ChatStackParam, 'ChatRoom'>;

const ChatRoom = ({route}: Props) => {
  const {t} = useTranslation();
  const {id: myId, myPosition, translateLanguage} = useContext(UserContext);
  const {chatId} = route.params;
  const {
    isLoading,
    chatInfo,
    chatInputValue,
    handleChatInputValue,
    handleSend,
    setLoading,
  } = useChat(chatId);
  const chatContentRef = useRef<FlatList>(null);
  const {errand} = useErrandDetail(chatInfo?.errandId || '');
  const {getCategoryImage, convertCategoryIdToName} = useCategory();
  const [chatCount, setChatCount] = React.useState(11);
  const [isChangedByChatMore, setIsChangedByChatMore] = React.useState(false);

  const messages = (
    chatInfo.messages
      ? chatInfo?.messages.map(message => JSON.parse(message as string))
      : []
  )
    .reverse()
    .slice(0, chatCount)
    .reverse() as ChatMessage[];

  const amIHelper = myId === chatInfo?.helperId;

  const calculatedDistance = calculateDistance(myPosition as LatLng, {
    latitude: errand?.latitude || 0,
    longitude: errand?.longitude || 0,
  });
  const distance = isNaN(calculatedDistance)
    ? '000.0km'
    : `${calculatedDistance.toFixed(1)}km`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <View style={styles.page}>
        <View style={styles.errandInfo}>
          <ErrandCard
            language={translateLanguage}
            imgSrc={getCategoryImage(errand?.categoryId || '')}
            category={convertCategoryIdToName(errand?.categoryId || '')}
            title={errand?.title || ''}
            distance={distance}
            time={diffDateToString(dayjs(errand?.createdAt))}
            price={(errand?.price?.toLocaleString() || '') + '₫'}
          />
        </View>
        <FlatList
          ref={chatContentRef}
          collapsable={false}
          onLayout={() => chatContentRef.current?.scrollToEnd({animated: true})}
          onContentSizeChange={() => {
            if (isChangedByChatMore) {
              setTimeout(() => {
                setIsChangedByChatMore(false);
              }, 100);
              return;
            }
            chatContentRef.current?.scrollToEnd({animated: true});
          }}
          data={messages}
          contentContainerStyle={{marginBottom: 100}}
          keyExtractor={(item, index) => item.timestamp + index.toString()}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.precaution}>{t('chatDescription')}</Text>
              {chatInfo.messages && chatInfo.messages?.length > chatCount ? (
                <TouchableOpacity
                  style={{width: '100%', marginBottom: 16}}
                  onPress={() => {
                    setIsChangedByChatMore(true);
                    setChatCount(chatCount + 10);
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: '#757575',
                    }}>
                    {t('showMore')}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          renderItem={({item}: {item: ChatMessage}) => {
            return item.senderId === myId ? (
              <MyChatContent content={item.message} isViewed={item.isViewed} />
            ) : (
              <OtherPersonChatContent
                profileImageUrl={
                  amIHelper
                    ? chatInfo?.clientImageUrl
                    : chatInfo?.helperImageUrl
                }
                content={item.message}
              />
            );
          }}
        />
        <ChatFooter
          errandId={errand?.id || ''}
          amIHelper={amIHelper}
          setLoading={setLoading}
          chatId={chatId}
          value={chatInputValue}
          senderId={myId}
          handleSendOriginal={handleSend}
          onChangeText={handleChatInputValue}
          handleSend={() => {
            handleSend(myId, chatInputValue);
          }}
        />
      </View>
      <Loading isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  errandInfo: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  precaution: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 7,
    marginHorizontal: 12,
    color: '#757575',
    fontSize: 12,
    marginVertical: 12,
  },
});
