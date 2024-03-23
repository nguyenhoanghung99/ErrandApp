interface MatchCompleteNotification {
  errandTitle: string;
  errandId: string;
  fcmToken: string;
  type: 'MATCH' | 'COMPLETE' | 'CANCEL';
  language: string;
}

interface ChatNotification {
  fcmToken: string;
  title: string;
  body: string;
  chatId: string;
  chatRoomName: string;
}

export const postMatchCompleteNotification = async (
  body: MatchCompleteNotification,
) => {
  return fetch(
    'https://43c7rv0004.execute-api.ap-southeast-1.amazonaws.com/default/handsfree-errand-match-notification',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};

export const postChatNotification = async (body: ChatNotification) => {
  return fetch(
    'https://655x2f7qn0.execute-api.ap-southeast-1.amazonaws.com/default/handsfree-chat-notification',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};
