import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: (import.meta as ImportMeta & {
    env: { VITE_FIREBASE_API_KEY: string };
  }).env.VITE_FIREBASE_API_KEY,
  authDomain: "fridayai-1bcce.firebaseapp.com",
  projectId: "fridayai-1bcce",
  storageBucket: "fridayai-1bcce.firebasestorage.app",
  messagingSenderId: "685732418401",
  appId: "1:685732418401:web:2efc73c5189e37bcfe6b20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
