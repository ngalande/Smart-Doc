import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {

  //Add config from firebase
  apiKey: "AIzaSyBunSslDrinyrU425JziL1mlr_em2MjHIs",

  authDomain: "smart-doc-1fdfe.firebaseapp.com",

  projectId: "smart-doc-1fdfe",

  storageBucket: "smart-doc-1fdfe.appspot.com",

  messagingSenderId: "552508563690",

  appId: "1:552508563690:web:8dcdd58437cddb25c5f793",

  measurementId: "G-YGM58M446K"

};

  

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

export default app






