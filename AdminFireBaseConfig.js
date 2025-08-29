import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env. VITE_ADMIN_API,
  authDomain: import.meta.env.VITE_ADMIN_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_ADMIN_PROJECT_ID,
  storageBucket: import.meta.env.VITE_ADMIN_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_ADMIN_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ADMIN_APP_ID,
  measurementId: import.meta.env. VITE_ADMIN_MEASUREMENT_ID
};

// Initialize Firebase
const adminApp = !getApps().some(app => app.name === "adminApp")
  ? initializeApp(firebaseConfig, "adminApp")
  : getApp("adminApp");

const Adminauth = getAuth(adminApp);
const Admindb = getFirestore(adminApp);

export { Adminauth,Admindb };