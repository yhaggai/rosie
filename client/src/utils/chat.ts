import { User } from 'firebase/auth';
import { limitToLast, onChildAdded, onValue, ref, set, query } from 'firebase/database';
import { auth, database } from '~src/lib/firebase';
import { ChatMessage, UserTyping } from '~src/types';
import { isMessageBot } from '.';

export function addMesasge(content: string) {
  const timestamp = Date.now();
  const payload: ChatMessage = {
    content,
    timestamp,
    ...getUserData()
  };
  set(ref(database, `chat/${timestamp}`), payload);
}

export function setUserTyping() {
  const { uid, displayName } = auth.currentUser as User;
  set(ref(database, 'typing'), { uid, name: displayName, ts: Date.now() });
}

export function listenToIncomingMessages(callback: Function) {
  const messages = ref(database, 'chat');

  onValue(query(messages, limitToLast(30)), (snapshot) => {
    const chatMessages: ChatMessage[] = Object.values(snapshot.val());
    callback(chatMessages);
  });
}

export function listenToBotMessage(callback: Function) {
  listenToNewMessage(callback, isMessageBot);
}

export function listenToSelfMadeMessage(callback: Function) {
  listenToNewMessage(callback, (message: ChatMessage) => message.userUID === auth.currentUser?.uid);
}

export function listenToNewMessage(callback: Function, predicate: Function) {
  const messages = ref(database, 'chat');

  let isInitialValue = true;
  onChildAdded(messages, (snapshot) => {
    const chatMessage: ChatMessage = snapshot.val();
    if (isInitialValue) {
      isInitialValue = false;
      return;
    }
    if (predicate(chatMessage)) {
      callback();
    }
  });
}

function amITyping(user: UserTyping) {
  return user.uid === auth.currentUser?.uid;
}
export function listenToUserTyping(callback: Function) {
  const typing = ref(database, 'typing');
  let isInitialValue = true;
  onValue(typing, (snapshot) => {
    const user = snapshot.val() as UserTyping;
    if (isInitialValue) {
      isInitialValue = false;
      return;
    }
    if (amITyping(user)) {
      return;
    }
    callback(user);
  });
}

export function getUserData() {
  const { displayName = '', photoURL = '', uid } = auth.currentUser as User;

  return {
    displayName: displayName as string,
    profilePictureUrl: photoURL as string,
    userUID: uid
  };
}
