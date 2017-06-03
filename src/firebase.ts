import * as Firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyAp1g8dggti7IuMl8zfVoKsyMc8TcN9vmc',
  authDomain: 'koncert-9a232.firebaseapp.com',
  databaseURL: 'https://koncert-9a232.firebaseio.com',
  projectId: 'koncert-9a232',
  storageBucket: 'koncert-9a232.appspot.com',
  messagingSenderId: '664870108843'
};
let firebaseApp = Firebase.initializeApp(config);
export const db = firebaseApp.database();
