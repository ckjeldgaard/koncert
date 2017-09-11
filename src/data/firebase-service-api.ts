import {ServiceApi} from './service-api';
import {ServiceCallback} from './servic-callback';
import * as Firebase from 'firebase';
import Database = firebase.database.Database;
import {Concert} from '../model/concert';
import {Artist} from '../model/artist';

export class FirebaseServiceApi implements ServiceApi {

  private readonly database: Database;

  constructor(name: string) {
    let firebaseApp = Firebase.initializeApp(process.env.FIREBASE, name);
    this.database = firebaseApp.database();
  }

  getConcerts(callback: ServiceCallback, startAt: number) {
    try {
      let ref = this.database.ref('data/events').orderByChild('dateStart').startAt(startAt);
      if (navigator.onLine) {
        ref.on('value', (response) => {
          let data = response.val();
          let concerts: Concert[] = [];
          for (let key in data) {
            data[key].id = key;
            concerts.push(data[key]);
          }
          localStorage.setItem('concerts', JSON.stringify(concerts));
          callback.onLoaded(concerts);
        });
      } else {
        // Not online. Get concerts from local storage:
        this.handleOffline(callback, 'concerts');
      }
    }
    catch (e) {
      callback.onError(e);
    }
  }

  getProvinces(callback: ServiceCallback) {
    let ref = this.database.ref('data/provinces');
    if (navigator.onLine) {
      ref.on('value', (response) => {
        localStorage.setItem('provinces', JSON.stringify(response.val()));
        callback.onLoaded(response.val());
      });
    } else {
      // Not online. Get provinces from local storage:
      this.handleOffline(callback, 'provinces');
    }
  }

  getGenres(callback: ServiceCallback) {
    let ref = this.database.ref('data/genres');
    if (navigator.onLine) {
      ref.on('value', (response) => {
        localStorage.setItem('genres', JSON.stringify(response.val()));
        callback.onLoaded(response.val());
      });
    } else {
      // Not online. Get genres from local storage:
      this.handleOffline(callback, 'genres');
    }
  }

  private handleOffline(callback: ServiceCallback, itemKey: string): void {
    const localStorageItems = localStorage.getItem(itemKey);
    if (localStorageItems != null) {
      callback.onLoaded(JSON.parse(localStorageItems));
    } else {
      callback.onError(new Error('Couldn\'t load ' + itemKey + ' when offline.'));
    }
  }

  searchArtists(callback: ServiceCallback, searchQuery: string) {
    try {
      let ref = this.database.ref('data/artists')
        .orderByChild('lowercase')
        .limitToFirst(7)
        .startAt(searchQuery.toLowerCase())
        .endAt(searchQuery.toLowerCase() + '\uf8ff');
      ref.on('value', (response) => {
        let data = response.val();
        let artists: Artist[] = [];
        for (let key in data) {
          data[key].id = key;
          artists.push(data[key]);
        }
        callback.onLoaded(artists);
      });
    } catch (e) {
      callback.onError(e);
    }
  }
}
