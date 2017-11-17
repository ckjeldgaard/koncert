import {Position} from '../../../src/util/region/position';
import {Point} from '../../../src/util/region/point';
import {Region} from '../../../src/util/region/region';

describe('Region', () => {

  let region: Region;
  beforeEach(() => {
    let square: Point[] = [];
    square.push(new Position(0, 0));
    square.push(new Position(0, 2));
    square.push(new Position(2, 2));
    square.push(new Position(2, 0));
    region = new Region(square);
  });

  it ('should check if point is inside a region', () => {
    const position: Point = new Position(1, 1);
    expect(position.inside(region)).toBeTruthy();
  });

  it ('should check if point is outside a region', () => {
    const position: Point = new Position(3, 3);
    expect(position.inside(region)).toBeFalsy();
  });

});
