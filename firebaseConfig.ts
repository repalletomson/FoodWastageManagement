import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCs8mu_BRR8xGQHxPSUM7KILizuHpEKAS8",
  authDomain: "seva-1b499.firebaseapp.com",
  projectId: "seva-1b499",
  storageBucket: "seva-1b499.appspot.com",
  messagingSenderId: "294579454182",
  appId: "1:294579454182:android:1a0b8f73742e467e54bb27",
  measurementId: "G-XXXXXXXXXX" // Optional, if you have Google Analytics enabled
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
