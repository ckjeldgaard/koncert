import {Position} from '../../../src/util/region/position';
import {Point} from '../../../src/util/region/point';
import {Region} from '../../../src/util/region/region';

describe('Region', () => {

  it ('should check if coordinate is inside a region', () => {
    const userPosition: Point = new Position(55.684628399999994, 12.5861179);

    let coords: Point[] = [];
    coords.push(new Position(56.1639061, 12.2332764));
    coords.push(new Position(55.8290587, 13.2934570));
    coords.push(new Position(55.1003733, 12.7166748));
    coords.push(new Position(54.5178931, 12.0684814));
    coords.push(new Position(54.6325179, 10.9039307));
    coords.push(new Position(55.4227790, 11.0028076));
    coords.push(new Position(55.8999561, 10.7171631));
    const zealand: Region = new Region(coords);

    expect(userPosition.inside(zealand)).toBeTruthy();
  });

});
