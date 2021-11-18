import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC5ZUgH09gBppxpeOsKWQT2WDubgicCVqU',
  authDomain: 'chity-chat-a9504.firebaseapp.com',
  projectId: 'chity-chat-a9504',
  storageBucket: 'chity-chat-a9504.appspot.com',
  messagingSenderId: '293378425466',
  appId: '1:293378425466:web:8dbeb1aa4bd56ce973b1c3',
  measurementId: 'G-XTDJ0LXC4P'
};

const app = initializeApp(firebaseConfig);
const fs = getFirestore();

const auth = getAuth(app);
const database = getDatabase(app);
export default app;

export { auth, database, fs };
