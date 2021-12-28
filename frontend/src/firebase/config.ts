import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  // DO NOT USE THESE CREDENTIALS ! THEY ARE HERE TO HELP IN THE LEARNING PROCESS.
  // ANY AND ALL DATA ON THAT DOMAIN IS SUBJECT TO CHANGE AND REMOVAL AT ANY TIME
  // THIS ACCOUNT IS ALSO ON THE FREE PLAN AND IS SUBJECT TO RESTRICTIONS !
  apiKey: 'AIzaSyBZeNBrDIHc3ZD1kKMjJclcP2ti-u37AyQ',
  authDomain: 'soat-590de.firebaseapp.com',
  projectId: 'soat-590de',
  storageBucket: 'soat-590de.appspot.com',
  messagingSenderId: '642731467036',
  appId: '1:642731467036:web:b3f465b1363ee956215ad9',
  measurementId: 'G-27H6QRMNXR'
};

export const firebaseApp = firebase.initializeApp(config);

export default config;
