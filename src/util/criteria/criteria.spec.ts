import { expect } from 'chai';
import {Concert} from '../../model/concert';
import {CriteriaProvince} from './criteria-province';
import {CriteriaGenre} from './criteria-genre';
import {AndCriteria} from './and-criteria';
import {OrCriteria} from './or-criteria';

describe('Criteria', () => {

  const JANUARY_2017: number = 1484438400;
  const FEBRUARY_2017: number = 1487116800;

  const testConcerts: Concert[] = [
    {
      id: 'event-1',
      artists: [],
      cancelled: false,
      dateStart: JANUARY_2017,
      dateEnd: JANUARY_2017,
      festival: true,
      name: 'Concert 1',
      venue: 'Venue 1',
      province: 'province1',
      genres: ['genre1', 'genre2'],
      startTime: '19:00',
      ticketPrice: '100 DKK',
      buyLink: 'www',
      facebookLink: 'http',
    },
    {
      id: 'event-2',
      artists: [],
      cancelled: false,
      dateStart: FEBRUARY_2017,
      dateEnd: FEBRUARY_2017,
      festival: false,
      name: 'Concert 2',
      venue: 'Venue 2',
      province: 'province2',
      genres: ['genre1'],
      startTime: '19:00',
      ticketPrice: '100 DKK',
      buyLink: 'www',
      facebookLink: 'http',
    },
    {
      id: 'event-3',
      artists: [],
      cancelled: false,
      dateStart: FEBRUARY_2017,
      dateEnd: FEBRUARY_2017,
      festival: false,
      name: 'Concert 3',
      venue: 'Venue 3',
      province: 'province1',
      genres: ['genre3'],
      startTime: '19:00',
      ticketPrice: '100 DKK',
      buyLink: 'www',
      facebookLink: 'http',
    }
  ];

  it('should filter by province when using province criteria', async () => {
    const criteria: CriteriaProvince = new CriteriaProvince('province2');
    expect(criteria.meetCriteria(testConcerts).length).to.equal(1);
    expect(criteria.meetCriteria(testConcerts)[0]).to.eql(testConcerts[1]);
  });

  it('should filter by genre when using genre criteria', async () => {
    const criteria: CriteriaGenre = new CriteriaGenre('genre2');
    expect(criteria.meetCriteria(testConcerts).length).to.equal(1);
    expect(criteria.meetCriteria(testConcerts)[0]).to.eql(testConcerts[0]);
  });

  it('should filter by province and genre when using the AND criteria', async () => {
    const criteriaProvince: CriteriaProvince = new CriteriaProvince('province1');
    const criteriaGenre: CriteriaGenre = new CriteriaGenre('genre2');
    const provinceAndGenreCriteria: AndCriteria = new AndCriteria(criteriaProvince, criteriaGenre);

    expect(provinceAndGenreCriteria.meetCriteria(testConcerts).length).to.equal(1);
    expect(provinceAndGenreCriteria.meetCriteria(testConcerts)[0]).to.eql(testConcerts[0]);
  });

  it('should filter by multiple genres when using the OR criteria', async () => {
    const criteriaGenre1: CriteriaGenre = new CriteriaGenre('genre1');
    const criteriaGenre2: CriteriaGenre = new CriteriaGenre('genre2');
    const orCriteria: OrCriteria = new OrCriteria(criteriaGenre1, criteriaGenre2);

    expect(orCriteria.meetCriteria(testConcerts).length).to.equal(2);
    expect(orCriteria.meetCriteria(testConcerts)[0]).to.eql(testConcerts[0]);
    expect(orCriteria.meetCriteria(testConcerts)[1]).to.eql(testConcerts[1]);
  });

});
