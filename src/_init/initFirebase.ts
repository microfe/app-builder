// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuHkt5NY9joRgvdsKUi3gScTPU0-pZGt8',
  authDomain: 'webbench-55d54.firebaseapp.com',
  projectId: 'webbench-55d54',
  storageBucket: 'webbench-55d54.appspot.com',
  messagingSenderId: '197783044672',
  appId: '1:197783044672:web:3ad6117f2c3a16a42295a5'
};

export const initFirebase = async () => {
  initializeApp(firebaseConfig);

  // Enable anonymously
  const auth = getAuth();
  await signInAnonymously(auth);
};