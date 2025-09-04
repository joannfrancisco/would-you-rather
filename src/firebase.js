import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsN3hxMuQ6CQts1040Njyms8YYHfUYdXI",
  authDomain: "would-you-rather-20a16.firebaseapp.com",
  projectId: "would-you-rather-20a16",
  storageBucket: "would-you-rather-20a16.firebasestorage.app",
  messagingSenderId: "420089975203",
  appId: "1:420089975203:web:c736a8763acc1cc7f14a16",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
