import {ServiceApi} from './service-api';
import {ServiceCallback} from './servic-callback';
import * as Firebase from 'firebase';
import Database = firebase.database.Database;
import {Concert} from '../model/concert';

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

  constructor(name: string) {
    let firebaseApp = Firebase.initializeApp(this.config, name);
    this.database = firebaseApp.database();
  }

  getConcerts(callback: ServiceCallback, startAt: number) {
    try {
      let ref = this.database.ref('data/events').orderByChild('dateStart').startAt(startAt);
      ref.on('value', (response) => {
        let data = response.val();
        let concerts: Concert[] = [];
        for (let key in data) {
          data[key].id = key;
          concerts.push(data[key]);
        }
        callback.onLoaded(concerts);
      });
    }
    catch (e) {
      callback.onError(e);
    }
  }

  getProvinces(callback: ServiceCallback) {
    let ref = this.database.ref('data/provinces');
    ref.on('value', (response) => {
      callback.onLoaded(response.val());
    });
  }

  getGenres(callback: ServiceCallback) {
    let ref = this.database.ref('data/genres');
    ref.on('value', (response) => {
      callback.onLoaded(response.val());
    });
  }

}
