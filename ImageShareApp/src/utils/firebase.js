import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC6GXfwlGtPlt1WQwg_gWLSqWEGKoTsLMk",
  authDomain: "rn-imageshareapp.firebaseapp.com",
  projectId: "rn-imageshareapp",
  storageBucket: "rn-imageshareapp.appspot.com",
  messagingSenderId: "90589775617",
  appId: "1:90589775617:web:28a6d649d7e2613f3e7d00",
  measurementId: "G-V7VKEEYR7B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
