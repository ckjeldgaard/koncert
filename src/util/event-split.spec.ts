import { expect } from 'chai';
import {EventSplit} from './event-split';


describe('Event split', () => {

  let JANUARY_2017: number = 1484438400;
  let FEBRUARY_2017: number = 1487116800;

  let testEvents = {
    event1: {
      cancelled: false,
      dateEnd: JANUARY_2017,
      dateStart: JANUARY_2017,
      festival: true,
      name: 'Event 1',
      venue: 'Venue 1'
    },
    event2: {
      cancelled: false,
      dateEnd: FEBRUARY_2017,
      dateStart: FEBRUARY_2017,
      festival: true,
      name: 'Event 2',
      venue: 'Venue 2'
    }
  };

  it('should split events by month', async () => {
    let eventSplit: EventSplit = new EventSplit(testEvents);

    expect(eventSplit.splitByMonths()[0].name).to.equal('January 2017');
    expect(eventSplit.splitByMonths()[1].name).to.equal('February 2017');
  });

});
