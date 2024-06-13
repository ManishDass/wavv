// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAme65iNCWZMdphhPrZBvw75uGR_1AErE0",
  authDomain: "wavv-music.firebaseapp.com",
  projectId: "wavv-music",
  storageBucket: "wavv-music.appspot.com",
  messagingSenderId: "245569092931",
  appId: "1:245569092931:web:190b3215a950fe5a82c3f6",
  measurementId: "G-2K7452MNJ7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable Firebase authentication logging
auth.settings.appVerificationDisabledForTesting = false;

export { auth };

