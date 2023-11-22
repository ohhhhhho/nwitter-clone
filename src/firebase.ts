import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBX2RWhDoqVE2faX0hOWep_oVmXuEking",
  authDomain: "nwitter-reloaded-17ae0.firebaseapp.com",
  projectId: "nwitter-reloaded-17ae0",
  storageBucket: "nwitter-reloaded-17ae0.appspot.com",
  messagingSenderId: "422645357613",
  appId: "1:422645357613:web:a657fb0687e548bc5a6ca4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
