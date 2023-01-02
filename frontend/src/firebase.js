// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBluL77YR-J_H89X0_BDESoADpmEKSxFTk",
  authDomain: "dumdle-cce57.firebaseapp.com",
  projectId: "dumdle-cce57",
  storageBucket: "dumdle-cce57.appspot.com",
  messagingSenderId: "204121462021",
  appId: "1:204121462021:web:7c943eed03b37cfd40936c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
