import {PreSelection} from './pre-selection';
import {Province} from '../../model/Province';
import {Point} from './point';
import {GeoPoint} from './geo-point';
import {Region} from './region';

export class ProvincePreSelection implements PreSelection {

  private static readonly ABROAD: string = 'udlandet';
  private polygon: any;

  constructor(readonly point: Point, readonly provinces: Province[]) {
    this.polygon = require('../../../src/util/region/polygon-data.json');
  }

  public getPreSelection(): string {
    for (let region of this.polygon.regions) {
      if (
        this.point.inside(new Region(this.buildBoundaries(region.boundaries))) &&
        this.provinces.findIndex(item => item.key === region.name) !== -1
      ) {
        return region.name;
      }
    }
    return ProvincePreSelection.ABROAD;
  }

  private buildBoundaries(regionPoints): Point[] {
    let points: Point[] = [];
    for (let p of regionPoints) {
      points.push(new GeoPoint(p.latitude, p.longitude));
    }
    return points;
  }
}
