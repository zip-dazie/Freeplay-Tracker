import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJzMeZMcco-YrAmOanceyV967pIHhqSYw',
  authDomain: 'freeplay-tracker.firebaseapp.com',
  projectId: 'freeplay-tracker',
  storageBucket: 'freeplay-tracker.appspot.com',
  messagingSenderId: '467862293825',
  appId: '1:467862293825:web:04f87dae4a739c3ed225c0'
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
