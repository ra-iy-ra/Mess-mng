import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


 
const firebaseConfig = {
    apiKey: "AIzaSyDGBFJVzLkA_cp7769ziPwCbDjiQQpoI1Y",
    authDomain: "mess-management-d5ad8.firebaseapp.com",
    projectId: "mess-management-d5ad8",
    storageBucket: "mess-management-d5ad8.appspot.com",
    messagingSenderId: "839575205353",
    appId: "1:839575205353:web:4e76d6d8d1b362d7004778",
    measurementId: "G-HEF82QVD7F"
  };

const app = initializeApp(firebaseConfig);
 const messaging = getMessaging(app);





if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      return getToken(messaging, {
        vapidKey: 'BC4uGFDtlcHZ-HNgTIUtzrCCCxeGF62WHOfaaVB34dGKC9yPHmgM_efmG3pfD9pJInxnqXvrBj46FLNUD0vk7fE'  
      });
    })
    .then((token) => {
      console.log('Firebase Token:', token);
    })
    .catch((error) => {
      console.error('Error registering Service Worker or getting token:', error);
    });
}

export const requestFirebaseNotificationPermission = () =>
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        return getToken(messaging, { vapidKey: 'BC4uGFDtlcHZ-HNgTIUtzrCCCxeGF62WHOfaaVB34dGKC9yPHmgM_efmG3pfD9pJInxnqXvrBj46FLNUD0vk7fE' });
      } else {
        throw new Error('Permission not granted for Notification');
      }
    })
    .catch((err) => {
      console.error('Unable to get permission to notify.', err);
    });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { app };
