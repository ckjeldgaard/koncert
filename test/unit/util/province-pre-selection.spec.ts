import {ProvincePreSelection} from '../../../src/util/region/province-pre-selection';
import {GeoPoint} from '../../../src/util/region/geo-point';
import {Province} from '../../../src/model/Province';

describe('Province Pre Selection', () => {

  it ('should return koebenhavn if inside that province', () => {
    const pointInsideKoebenhavn = new GeoPoint(55.69873390000001, 12.597520999999999);
    let provinces = [];
    provinces.push(new Province('koebenhavn', 'København'));
    provinces.push(new Province('fyn', 'Fyn'));
    provinces.push(new Province('oestjylland', 'Østjylland'));

    expect(new ProvincePreSelection(
      pointInsideKoebenhavn,
      provinces
    ).getPreSelection()).toBe('koebenhavn');
  });

  it ('should return \'abroad\' if not inside any provinces', () => {
    const pointAbroad = new GeoPoint(0, 0);
    let provinces = [];
    provinces.push(new Province('koebenhavn', 'København'));
    provinces.push(new Province('fyn', 'Fyn'));
    provinces.push(new Province('oestjylland', 'Østjylland'));

    expect(new ProvincePreSelection(
      pointAbroad,
      provinces
    ).getPreSelection()).toBe('udlandet');
  });

  it ('should also return \'abroad\' if not inside any of the known provinces', () => {
    const pointInsideOestjylland = new GeoPoint(56.15618208013887, 10.205612182617188); // Aarhus
    let provinces = [];
    provinces.push(new Province('koebenhavn', 'København'));
    provinces.push(new Province('fyn', 'Fyn'));

    expect(new ProvincePreSelection(
      pointInsideOestjylland,
      provinces
    ).getPreSelection()).toBe('udlandet');
  });

});
