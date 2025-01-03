import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyLzKTsIxAf4CF3AZShm3nRdRu-ZM1JuU",
  authDomain: "character-selector.firebaseapp.com",
  projectId: "character-selector",
  storageBucket: "character-selector.firebasestorage.app",
  messagingSenderId: "304476061745",
  appId: "1:304476061745:web:7b816b2e83af9d496f5510",
  measurementId: "G-XB9CVLEQWG",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };