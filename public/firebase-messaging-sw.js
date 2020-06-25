importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCUpGiMcRBb6qHUQETVxeYFu3OiMJhfbJo",
  authDomain: "fir-poc-d5313.firebaseapp.com",
  databaseURL: "https://fir-poc-d5313.firebaseio.com",
  projectId: "fir-poc-d5313",
  storageBucket: "fir-poc-d5313.appspot.com",
  messagingSenderId: "983413085387",
  appId: "1:983413085387:web:38ea278e81ad027d92374e",
  measurementId: "G-79ED0ZGTF7",
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  console.log('clicked on notif', JSON.stringify(event))
});