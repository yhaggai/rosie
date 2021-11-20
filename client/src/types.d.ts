export type ChatMessage = {
  content: string;
  timestamp: number;
  displayName: string;
  profilePictureUrl: string;
  userUID: string;
  questionMessage?: ChatMessage;
};

export type UserTyping = {
  uid: string;
  name: string;
};
