import {ServiceCallback} from './servic-callback';

export interface ServiceApi {
  getConcerts(callback: ServiceCallback, startAt: number);
}
