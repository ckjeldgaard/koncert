import {GeoPoint} from '../../../src/util/region/geo-point';
import {Point} from '../../../src/util/region/point';
import {Region} from '../../../src/util/region/region';

describe('Region', () => {

  let region: Region;
  beforeEach(() => {
    let square: Point[] = [];
    square.push(new GeoPoint(0, 0));
    square.push(new GeoPoint(0, 2));
    square.push(new GeoPoint(2, 2));
    square.push(new GeoPoint(2, 0));
    region = new Region(square);
  });

  it ('should check if point is inside a region', () => {
    const point: Point = new GeoPoint(1, 1);
    expect(point.inside(region)).toBeTruthy();
  });

  it ('should check if point is outside a region', () => {
    const point: Point = new GeoPoint(3, 3);
    expect(point.inside(region)).toBeFalsy();
  });

});
