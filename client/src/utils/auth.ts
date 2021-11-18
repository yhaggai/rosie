import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { signOut as fSignout } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '~src/lib/firebase';

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log(res);

    window.location.href = '/';
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
    console.log('snapshot', snapshot);
    callback(snapshot.val() as Number);
  });
}

export { auth };
