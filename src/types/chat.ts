export interface ChatMessage {
  senderId: string;
  message: string;
  timestamp: number;
  isViewed: boolean;
}
