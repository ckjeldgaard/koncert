import { expect } from 'chai';
import {ConcertSplit} from '../../../src/util/concert-split';


describe('Concert split', () => {

  let JANUARY_2017: number = 1484438400;
  let FEBRUARY_2017: number = 1487116800;

  let testConcerts = {
    concert1: {
      cancelled: false,
      dateEnd: JANUARY_2017,
      dateStart: JANUARY_2017,
      festival: true,
      name: 'Concert 1',
      venue: 'Venue 1',
      province: 'province1'
    },
    concert2: {
      cancelled: false,
      dateEnd: FEBRUARY_2017,
      dateStart: FEBRUARY_2017,
      festival: true,
      name: 'Concert 2',
      venue: 'Venue 2',
      province: 'province2'
    },
    concert3: {
      cancelled: false,
      dateEnd: JANUARY_2017,
      dateStart: JANUARY_2017,
      festival: true,
      name: 'Concert 3',
      venue: 'Venue 3',
      province: 'province1'
    }
  };

  it('should split concerts by month', async () => {
    let concertSplit: ConcertSplit = new ConcertSplit(testConcerts);

    expect(concertSplit.splitByMonths()[0].name).to.equal('January 2017');
    expect(concertSplit.splitByMonths()[1].name).to.equal('February 2017');
  });

});
