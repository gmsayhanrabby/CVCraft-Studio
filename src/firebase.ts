import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser 
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's provided Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDzUrkIwDTygtwrBuOSsWUqFkk9svag1ks",
  authDomain: "cvcraft-studio-330e6.firebaseapp.com",
  projectId: "cvcraft-studio-330e6",
  storageBucket: "cvcraft-studio-330e6.firebasestorage.app",
  messagingSenderId: "1037420311837",
  appId: "1:1037420311837:web:8e96d62daccd5347135df4",
  measurementId: "G-LHJL4WWEZ6"
};

// Initialize Firebase singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Google Auth Provider configured
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics safely (works only in client browser environments that support it)
export let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized for cvcraft-studio-330e6");
    }
  }).catch((err) => {
    console.debug("Firebase analytics not supported in this environment:", err);
  });
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};
export type { FirebaseUser };
