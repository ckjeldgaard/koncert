import Vue from 'vue';
import { SinonSpy } from 'sinon';
import merge from 'lodash.merge';
import { ILogger } from './log';
import {DrawerProvider} from '../components/drawer/drawer-provider';
import {ServiceApi} from '../data/service-api';
import {ServiceCallback} from '../data/servic-callback';

export interface IComponents {
  [key: string]: Vue.Component;
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

export class MockDrawerProvider implements DrawerProvider {
  open() {
  }

  close() {
  }
}

export class MockServiceApi implements ServiceApi {

  public static JANUARY_2017: number = 1484438400;
  public static FEBRUARY_2017: number = 1487116800;

  public static testEvents = {
    event1: {
      cancelled: false,
      dateEnd: MockServiceApi.JANUARY_2017,
      dateStart: MockServiceApi.JANUARY_2017,
      festival: true,
      name: 'Event 1',
      venue: 'Venue 1'
    },
    event2: {
      cancelled: false,
      dateEnd: MockServiceApi.FEBRUARY_2017,
      dateStart: MockServiceApi.FEBRUARY_2017,
      festival: true,
      name: 'Event 2',
      venue: 'Venue 2'
    }
  };

  public static testProvinces = {
    bornholm: 'Bornholm',
    koebenhavn: 'København',
    sydsoenderjylland: 'Syd- og Sønderjylland'
  };

  constructor(private serviceSpy: SinonSpy) {
  }

  getConcerts(callback: ServiceCallback, startAt: number) {
    callback.onLoaded(MockServiceApi.testEvents);
    this.serviceSpy(MockServiceApi.testEvents);
  }

  getProvinces(callback: ServiceCallback) {
    callback.onLoaded(MockServiceApi.testProvinces);
    this.serviceSpy(MockServiceApi.testProvinces);
  }
}
