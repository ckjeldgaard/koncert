import {ServiceApi} from './service-api';
import {ServiceCallback} from './servic-callback';
import * as Firebase from 'firebase';
import Database = firebase.database.Database;
import {Concert} from '../model/concert';

export class FirebaseServiceApi implements ServiceApi {

  private readonly database: Database;

  constructor(name: string) {
    let firebaseApp = Firebase.initializeApp(process.env.FIREBASE, name);
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
