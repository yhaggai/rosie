export type ChatMessage = {
  content: string;
  timestamp: number;
  displayName: string;
  profilePictureUrl: string;
  userUID: string;
};

export type UserTyping = {
  uid: string;
  name: string;
};
