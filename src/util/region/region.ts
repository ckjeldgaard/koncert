import {GeoPoint} from './geo-point';

export class Region {
  constructor(readonly boundary: GeoPoint[]) {}
}
