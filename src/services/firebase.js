import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCUpGiMcRBb6qHUQETVxeYFu3OiMJhfbJo',
  authDomain: 'fir-poc-d5313.firebaseapp.com',
  databaseURL: 'https://fir-poc-d5313.firebaseio.com',
  projectId: 'fir-poc-d5313',
  storageBucket: 'fir-poc-d5313.appspot.com',
  messagingSenderId: '983413085387',
  appId: '1:983413085387:web:38ea278e81ad027d92374e',
  measurementId: 'G-79ED0ZGTF7',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  'BCAebYykjM5vkq6T1HVfzdJLMXOzGQ8l0OZ6LcekowlFLKziOtSKqnDu7l-yD1WcLQsg72tJ3i29Jo3Zl72CJTs'
);

export { firebase, messaging };
