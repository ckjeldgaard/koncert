import Vue, {Component} from 'vue';
import { SinonSpy } from 'sinon';
import merge from 'lodash.merge';
import { ILogger } from './log';
import {ServiceApi} from '../data/service-api';
import {ServiceCallback} from '../data/servic-callback';
import {Artist} from '../model/artist';
import {DomainObjectBuilder} from '../../test/unit/domain-object-builder/dob';
import {Concert} from '../model/concert';

export interface IComponents {
  [key: string]: Component;
}

export class ComponentTest {

  public vm: Vue;

  constructor(private template: string, private components: IComponents) {
  }

  public createComponent(createOptions?: any): void {
    let options = {
      template: this.template,
      components: this.components
    };
    if (createOptions) merge(options, createOptions);
    this.vm = new Vue(options).$mount();
  }

  public async execute(callback: (vm: Vue) => Promise<void> | void): Promise<void> {
    await Vue.nextTick();
    await callback(this.vm);
  }

}

export class MockLogger implements ILogger {

  constructor(private loggerSpy: SinonSpy) {
  }

  info(msg: any) {
    this.loggerSpy(msg);
  }

  warn(msg: any) {
    this.loggerSpy(msg);
  }

  error(msg: any) {
    this.loggerSpy(msg);
  }
}

export class MockServiceApi implements ServiceApi {

  public static testProvinces = {
    bornholm: 'Bornholm',
    koebenhavn: 'København',
    sydsoenderjylland: 'Syd- og Sønderjylland'
  };

  public static testGenres = {
    heavymetal: 'Heavy metal',
    black: 'Black metal',
    death: 'Death metal'
  };

  public static testArtists: Artist[] = [
    new Artist(1, 'Alice', 'alice'),
    new Artist(2, 'Bob', 'bob')
  ];

  public readonly concerts: Concert[] = [];

  constructor(private serviceSpy: SinonSpy) {
    this.buildConcerts();
  }

  private buildConcerts() {
    let time: number = new Date().getTime() / 1000;
    const provinces: string[] = ['bornholm', 'koebenhavn', 'sydsoenderjylland'];
    const genres: string[] = ['heavymetal', 'black', 'death'];

    for (let i: number = 0; i < 10; i++) {
      let concertDate = time + (i * 259200);
      this.concerts.push(
        DomainObjectBuilder.aNew().concert()
          .withName('Concert' + i)
          .startingAt(concertDate)
          .endingAt(concertDate)
          .withArtists([{id: 'artist' + i, name: 'Artist ' + i}])
          .withGenres([genres[i % 3]])
          .inProvince(provinces[i % 3])
          .build()
      );
    }
  }

  getConcerts(callback: ServiceCallback, startAt: number) {
    callback.onLoaded(this.concerts);
    this.serviceSpy(this.concerts);
  }

  getProvinces(callback: ServiceCallback) {
    callback.onLoaded(MockServiceApi.testProvinces);
    this.serviceSpy(MockServiceApi.testProvinces);
  }

  getGenres(callback: ServiceCallback) {
    callback.onLoaded(MockServiceApi.testGenres);
    this.serviceSpy(MockServiceApi.testGenres);
  }

  searchArtists(callback: ServiceCallback, searchQuery: string) {
    callback.onLoaded(MockServiceApi.testArtists);
    this.serviceSpy(MockServiceApi.testArtists);
  }

}
