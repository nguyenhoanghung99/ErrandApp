import {Chat} from '../../API';
import {ChatMessage} from '../../types/chat';

export const initChatInfo: Chat = {
  __typename: 'Chat',
  id: '',
  clientId: '',
  clientName: '',
  clientImageUrl: '',
  helperId: '',
  helperName: '',
  helperImageUrl: '',
  errandId: '',
  categoryId: '',
  messages: [],
  createdAt: '',
  updatedAt: '',
};

export const initMessage: ChatMessage = {
  isViewed: false,
  message: '',
  senderId: '',
  timestamp: 0,
};
