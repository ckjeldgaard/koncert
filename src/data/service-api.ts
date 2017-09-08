import {ServiceCallback} from './servic-callback';

export interface ServiceApi {
  getConcerts(callback: ServiceCallback, startAt: number);
  getProvinces(callback: ServiceCallback);
  getGenres(callback: ServiceCallback);
  searchArtists(callback: ServiceCallback, searchQuery: string);
}
