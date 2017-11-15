import {CriteriaBuilder} from '../../../src/components/concerts/helpers/criteria_builder';
import {DomainObjectBuilder} from '../domain-object-builder/dob';
import {Concert} from '../../../src/model/concert';

describe('Criteria builder', () => {

  it('should filter by 1 genre', async () => {
    const concerts: Concert[] = [
      DomainObjectBuilder.aNew().concert().inProvince('province').withGenres(['genre1']).build(),
      DomainObjectBuilder.aNew().concert().inProvince('province').withGenres(['genre2']).build()
    ];
    const result: Concert[] = new CriteriaBuilder(
      '',
      'province',
      [DomainObjectBuilder.aNew().genre().withKey('genre1').withName('Genre 1').build()]
    ).build().meetCriteria(concerts);

    expect(result.length).toBe(1);
    expect(result[0].genres[0]).toBe('genre1');
  });

  it('should filter by multiple genres', async () => {
    const concerts: Concert[] = [
      DomainObjectBuilder.aNew().concert().withId('1').inProvince('province').withGenres(['genre1']).build(),
      DomainObjectBuilder.aNew().concert().withId('2').inProvince('province').withGenres(['genre2']).build(),
      DomainObjectBuilder.aNew().concert().withId('3').inProvince('province').withGenres(['genre3']).build()
    ];
    const result: Concert[] = new CriteriaBuilder(
      '',
      null,
      [
        DomainObjectBuilder.aNew().genre().withKey('genre2').withName('Genre 2').build(),
        DomainObjectBuilder.aNew().genre().withKey('genre3').withName('Genre 3').build(),
      ]
    ).build().meetCriteria(concerts);

    expect(result.length).toBe(2);
    expect(result[0].genres[0]).toBe('genre2');
    expect(result[1].genres[0]).toBe('genre3');
  });
});
