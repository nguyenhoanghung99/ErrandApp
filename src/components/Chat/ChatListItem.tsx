import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {S3Image} from 'aws-amplify-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ChatStackParam} from '../../types/navigation';
import {diffDateToString} from '../../utils/util';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

interface ChatListItemProps {
  profileImageUrl: string;
  name: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadMessageCount: number;
  categoryImageUrl: string;
  distance?: string;
  chatId: string;
}

const ChatListItem = (props: ChatListItemProps) => {
  const {t} = useTranslation();
  const {
    profileImageUrl,
    name,
    distance,
    lastMessage,
    lastMessageTime,
    unreadMessageCount,
    categoryImageUrl,
    chatId,
  } = props;
  const navigation = useNavigation<NavigationProp<ChatStackParam>>();

  const title = lastMessage.includes(':@#$%IMAGE@#$%:')
    ? t('image')
    : lastMessage;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ChatRoom', {chatId, chatRoomName: name});
      }}
      style={styles.container}>
      {profileImageUrl ? (
        <S3Image imgKey={profileImageUrl} style={styles.profileImage} />
      ) : (
        <View style={styles.profileImage} />
      )}
      <View style={styles.textContainer}>
        <View style={styles.topRowTextContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
        <Text numberOfLines={1} style={styles.lastMessageText}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.timeCountContainer}>
          <Text style={styles.lastMessageTimeText}>
            {diffDateToString(dayjs(lastMessageTime))}
          </Text>
          <View
            style={{
              ...styles.unReadMessageCountContainer,
              opacity: unreadMessageCount > 0 ? 1 : 0,
            }}>
            <Text style={styles.unReadMessageCountText}>
              {unreadMessageCount}
            </Text>
          </View>
        </View>
        {categoryImageUrl ? (
          <View
            style={{
              ...styles.profileImage,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#EBEBEB',
            }}>
            <S3Image
              imgKey={categoryImageUrl}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
            />
          </View>
        ) : (
          <View style={styles.profileImage} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 51,
    height: 51,
    borderRadius: 25.5,
    backgroundColor: '#EBEBEB',
  },
  textContainer: {
    marginLeft: 12,
    gap: 8,
  },
  topRowTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },
  distanceText: {
    fontSize: 10,
    color: '#171717',
    fontWeight: '500',
  },
  lastMessageText: {
    fontSize: 12,
    color: '#757575',
    width: 200,
  },
  timeCountContainer: {
    alignItems: 'center',
    gap: 3,
  },
  lastMessageTimeText: {
    fontSize: 9,
    color: '#757575',
  },
  unReadMessageCountContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F95F4A',
  },
  unReadMessageCountText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});
