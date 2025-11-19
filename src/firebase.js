// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGKtIHKLUMIqBYPGV6_rC-ypQUTlBzxHI",
  authDomain: "kitty-code-d97cb.firebaseapp.com",
  projectId: "kitty-code-d97cb",
  storageBucket: "kitty-code-d97cb.firebasestorage.app",
  messagingSenderId: "95588739929",
  appId: "1:95588739929:web:e0b2b6f7c1503a7889ba48",
  measurementId: "G-1BS4GRZG08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);

// Default export
export default app;

