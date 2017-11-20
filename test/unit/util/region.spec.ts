import {UserPosition} from '../../../src/util/region/user-position';
import {Point} from '../../../src/util/region/point';
import {Region} from '../../../src/util/region/region';

import polygon from '../../../src/util/region/polygon-data.json';

describe('Region', () => {

  let region: Region;
  beforeEach(() => {
    let square: Point[] = [];
    square.push(new UserPosition(0, 0));
    square.push(new UserPosition(0, 2));
    square.push(new UserPosition(2, 2));
    square.push(new UserPosition(2, 0));
    region = new Region(square);
  });

  it ('should check if point is inside a region', () => {
    const position: Point = new UserPosition(1, 1);

    console.log(polygon.koebenhavn[0].latitude);

    expect(position.inside(region)).toBeTruthy();
  });

  it ('should check if point is outside a region', () => {
    const position: Point = new UserPosition(3, 3);
    expect(position.inside(region)).toBeFalsy();
  });

});
