import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGE_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyB-2rWRIkdd5Gr-9aYIS7p-z90vjvAPTKw",

  authDomain: "discord-clone-a2d7b.firebaseapp.com",

  projectId: "discord-clone-a2d7b",

  storageBucket: "discord-clone-a2d7b.appspot.com",

  messagingSenderId: "148086133792",

  appId: "1:148086133792:web:93294a12602a9c5b8b5845",

  measurementId: "G-27B2MB9LHF",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
