import { expect } from 'chai';
import {Concert} from '../../../src/model/concert';
import {CriteriaProvince} from '../../../src/util/criteria/criteria-province';
import {CriteriaGenre} from '../../../src/util/criteria/criteria-genre';
import {AndCriteria} from '../../../src/util/criteria/and-criteria';
import {OrCriteria} from '../../../src/util/criteria/or-criteria';
import {DomainObjectBuilder} from '../domain-object-builder/dob';
import {CriteriaSearch} from '../../../src/util/criteria/criteria-search';

describe('Criteria', () => {

  it('should filter by province when using province criteria', async () => {

    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().inProvince('province1').build(),
      DomainObjectBuilder.aNew().concert().inProvince('province2').build(),
    ];

    const criteria: CriteriaProvince = new CriteriaProvince('province2');
    expect(criteria.meetCriteria(concertList).length).to.equal(1);
    expect(criteria.meetCriteria(concertList)[0]).to.eql(concertList[1]);
  });

  it('should filter by genre when using genre criteria', async () => {

    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().withGenres(['genre1']).build(),
      DomainObjectBuilder.aNew().concert().withGenres(['genre2']).build(),
    ];
    const criteria: CriteriaGenre = new CriteriaGenre('genre2');
    expect(criteria.meetCriteria(concertList).length).to.equal(1);
    expect(criteria.meetCriteria(concertList)[0]).to.eql(concertList[1]);
  });

  it('should filter by search term for concert names', async () => {
    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().withName('concertA').build(),
      DomainObjectBuilder.aNew().concert().withName('concertB').build(),
    ];

    const criteria: CriteriaSearch = new CriteriaSearch('concertA');

    expect(criteria.meetCriteria(concertList).length).to.equal(1);
    expect(criteria.meetCriteria(concertList)[0]).to.eql(concertList[0]);
  });

  it('should filter by search term for concert venues', async () => {
    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().withVenue('venueA').build(),
      DomainObjectBuilder.aNew().concert().withVenue('venueB').build(),
    ];

    const criteria: CriteriaSearch = new CriteriaSearch('venueB');

    expect(criteria.meetCriteria(concertList).length).to.equal(1);
    expect(criteria.meetCriteria(concertList)[0]).to.eql(concertList[1]);
  });

  it('should filter by province and genre when using the AND criteria', async () => {
    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().inProvince('province1').withGenres(['genre1']).build(),
      DomainObjectBuilder.aNew().concert().inProvince('province1').withGenres(['genre2']).build(),
      DomainObjectBuilder.aNew().concert().inProvince('province2').withGenres(['genre2']).build(),
    ];
    const criteriaProvince: CriteriaProvince = new CriteriaProvince('province1');
    const criteriaGenre: CriteriaGenre = new CriteriaGenre('genre2');
    const provinceAndGenreCriteria: AndCriteria = new AndCriteria(criteriaProvince, criteriaGenre);

    expect(provinceAndGenreCriteria.meetCriteria(concertList).length).to.equal(1);
    expect(provinceAndGenreCriteria.meetCriteria(concertList)[0]).to.eql(concertList[1]);
  });

  it('should filter by multiple genres when using the OR criteria', async () => {

    const concertList: Concert[] = [
      DomainObjectBuilder.aNew().concert().withId('1').withGenres(['genre1', 'genre2']).build(),
      DomainObjectBuilder.aNew().concert().withId('2').withGenres(['genre1']).build(),
      DomainObjectBuilder.aNew().concert().withId('3').withGenres(['genre3']).build(),
    ];

    const criteriaGenre1: CriteriaGenre = new CriteriaGenre('genre1');
    const criteriaGenre2: CriteriaGenre = new CriteriaGenre('genre2');
    const orCriteria: OrCriteria = new OrCriteria(criteriaGenre1, criteriaGenre2);

    expect(orCriteria.meetCriteria(concertList).length).to.equal(2);
    expect(orCriteria.meetCriteria(concertList)[0]).to.eql(concertList[0]);
    expect(orCriteria.meetCriteria(concertList)[1]).to.eql(concertList[1]);
  });

});
