import dayjs, {Dayjs} from 'dayjs';
import {ChatMessage} from '../types/chat';
import {LatLng} from 'react-native-maps';
import {getI18n} from 'react-i18next';
import { Platform } from 'react-native';
export const isIosPlatform = Platform.OS === 'ios';

export const diffDate = (date: Dayjs) => {
  const diffDay = dayjs().diff(date, 'day');
  const diffHour = dayjs().diff(date, 'hour') - diffDay * 24;
  const diffMinute =
    dayjs().diff(date, 'minute') - diffDay * 24 * 60 - diffHour * 60;
  return {diffDay, diffHour, diffMinute};
};

export const diffDateToString = (date: Dayjs) => {
  const {diffDay, diffHour, diffMinute} = diffDate(date);
  const langugae = getI18n().language;
  switch (langugae) {
    case 'ko':
      if (diffDay > 0) {
        return `${diffDay}일 전`;
      } else if (diffHour > 0) {
        return `${diffHour}시간 전`;
      } else if (diffMinute > 0) {
        return `${diffMinute}분 전`;
      }
      return '방금 전';
    case 'en':
      if (diffDay > 0) {
        return `${diffDay} day ago`;
      } else if (diffHour > 0) {
        return `${diffHour} hour ago`;
      } else if (diffMinute > 0) {
        return `${diffMinute} minute ago`;
      }
      return 'just now';
    case 'vi':
      if (diffDay > 0) {
        return `${diffDay} ngày trước`;
      } else if (diffHour > 0) {
        return `${diffHour} giờ trước`;
      } else if (diffMinute > 0) {
        return `${diffMinute} phút trước`;
      }
      return 'vừa xong';
    default:
    case 'en':
      if (diffDay > 0) {
        return `${diffDay} day ago`;
      } else if (diffHour > 0) {
        return `${diffHour} hour ago`;
      } else if (diffMinute > 0) {
        return `${diffMinute} minute ago`;
      }
      return 'just now';
  }
};

export const diffStartDateToString = (date: Dayjs) => {
  const {diffDay, diffHour, diffMinute} = diffDate(date);
  const langugae = getI18n().language;

  switch (langugae) {
    case 'ko':
      if (diffDay < 0) {
        return `${Math.abs(diffDay)}일 후`;
      } else if (diffHour < 0) {
        return `${Math.abs(diffHour)}시간 후`;
      } else if (diffMinute < 0) {
        return `${Math.abs(diffMinute)}분 후`;
      }
      return '지금 바로';
    case 'en':
      if (diffDay < 0) {
        return `${Math.abs(diffDay)} day after`;
      } else if (diffHour < 0) {
        return `${Math.abs(diffHour)} hour after`;
      } else if (diffMinute < 0) {
        return `${Math.abs(diffMinute)} minute after`;
      }
      return 'right now';
    case 'vi':
      if (diffDay < 0) {
        return `${Math.abs(diffDay)} ngày sau`;
      } else if (diffHour < 0) {
        return `${Math.abs(diffHour)} giờ sau`;
      } else if (diffMinute < 0) {
        return `${Math.abs(diffMinute)} phút sau`;
      }
      return 'ngay bây giờ';
    default:
      if (diffDay < 0) {
        return `${Math.abs(diffDay)} day after`;
      } else if (diffHour < 0) {
        return `${Math.abs(diffHour)} hour after`;
      } else if (diffMinute < 0) {
        return `${Math.abs(diffMinute)} minute after`;
      }
      return 'right now';
  }
};

export const getLastChat = (messages?: string[]): ChatMessage => {
  if (messages && messages.length > 0) {
    const lastChat = messages[messages.length - 1];
    return JSON.parse(lastChat) as ChatMessage;
  }
  return {isViewed: false, message: '', senderId: '', timestamp: 0};
};

export const getUnreadChatCount = (myId: string, messages?: string[]) => {
  if (messages && messages.length > 0) {
    return messages.filter(
      message =>
        !JSON.parse(message).isViewed && JSON.parse(message).senderId !== myId,
    ).length;
  }
  return 0;
};

export const calculateDistance = (
  myPosition: LatLng,
  errandPosition: LatLng,
) => {
  if (!myPosition || !errandPosition) {
    return NaN;
  }
  const earthRadius = 6371;

  const degToRad = (deg: number) => deg * (Math.PI / 180);

  const dLat = degToRad(errandPosition.latitude - myPosition.latitude);
  const dLon = degToRad(errandPosition.longitude - myPosition.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(myPosition.latitude)) *
      Math.cos(degToRad(errandPosition.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // 거리를 반환 (킬로미터 단위)
};
