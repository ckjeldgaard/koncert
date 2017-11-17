import {Region} from './region';

export interface Point {
  readonly latitude: number;
  readonly longitude: number;
  inside(region: Region): boolean;
}
