import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { signOut as fSignout } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '~src/lib/firebase';

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  await fSignout(auth);
}

export function listenToRegisteredUsers(callback: Function) {
  const usersRef = ref(database, 'users/registered');
  onValue(usersRef, (snapshot) => {
    callback(snapshot.val() as Number);
  });
}

export { auth };
