import { User } from 'firebase/auth';
import { onChildAdded, onChildChanged, onValue, ref, set } from 'firebase/database';
import { auth, database } from '~src/lib/firebase';
import { ChatMessage, UserTyping } from '~src/types';

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
  console.log('setUserTyping!!!');
  const { uid, displayName } = auth.currentUser as User;
  set(ref(database, 'typing'), { uid, name: displayName, ts: Date.now() });
}

export function listenToIncomingMessages(callback: Function) {
  const messages = ref(database, 'chat');
  onValue(messages, (snapshot) => {
    const chatMessages: ChatMessage[] = Object.values(snapshot.val());
    callback(chatMessages);
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
    console.log('typing!!1', snapshot.val());
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
