import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "quest-journal-14942.firebaseapp.com",
  projectId: "quest-journal-14942",
  storageBucket: "quest-journal-14942.appspot.com",
  messagingSenderId: "101975172369",
  appId: "1:101975172369:web:2fb8795df427f0c2a9d8b0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);
const storage = getStorage(app);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}

export { app, db, functions, auth, storage };

export default {
  install(Vue) {
    Vue.prototype.$firebase = { app, db, functions, auth, storage };
  },
};
