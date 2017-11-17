import {Point} from './point';
import {Region} from './region';

export class Position implements Point {

  constructor(readonly latitude: number, readonly longitude: number) {}

  inside(region: Region): boolean {
    let i, j: number;
    let isInside: boolean = false;

    const sides: number = region.boundary.length;
    for (i = 0, j = sides - 1; i < sides; j = i++) {
      if (
        (
          (
            (region.boundary[i].longitude <= this.longitude) && (this.longitude < region.boundary[j].longitude)
          ) || (
            (region.boundary[j].longitude <= this.longitude) && (this.longitude < region.boundary[i].longitude)
          )
        ) &&
        (this.latitude < (region.boundary[j].latitude - region.boundary[i].latitude) * (this.longitude - region.boundary[i].longitude) / (region.boundary[j].longitude - region.boundary[i].longitude) + region.boundary[i].latitude)
      ) {
        isInside = !isInside;
      }
    }
    return isInside;
  }

}
