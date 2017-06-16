import {ServiceApi} from './service-api';
import {ServiceCallback} from './servic-callback';
import * as Firebase from 'firebase';
import Database = firebase.database.Database;

export class FirebaseServiceApi implements ServiceApi {

  private readonly config = {
    apiKey: 'AIzaSyAp1g8dggti7IuMl8zfVoKsyMc8TcN9vmc',
    authDomain: 'koncert-9a232.firebaseapp.com',
    databaseURL: 'https://koncert-9a232.firebaseio.com',
    projectId: 'koncert-9a232',
    storageBucket: 'koncert-9a232.appspot.com',
    messagingSenderId: '664870108843'
  };
  private readonly database: Database;

  constructor() {
    let firebaseApp = Firebase.initializeApp(this.config);
    this.database = firebaseApp.database();
  }

  getConcerts(callback: ServiceCallback, startAt: number) {
    let ref = this.database.ref('data/events').orderByChild('dateStart').startAt(startAt);
    ref.on('value', (response) => {
      callback.onLoaded(response.val());
    });

  }

}
