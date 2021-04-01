import ElectronStore from 'electron-store';
import * as path from 'path';
import Ajv, { ValidateFunction } from 'ajv';

import { readJson } from './utils'

export type StoreType = 'RailwayInfo' | 'RailroadGeoJson' | 'StationGeoJson';

export type RailwayInfo = {
  comp_list: string[],
  detail_list: {
    comp_name: string,
    lines: {
      line_name: string,
      line_color?: string,
    }[]
  }[],
};

export type GeoJson = object;

class RailwayInfoStore {
  private store: ElectronStore<RailwayInfo>;
  private validate: ValidateFunction<RailwayInfo>;

  constructor() {
    const ajv = new Ajv();
    const schema = readJson(path.resolve(__dirname, 'schema.json'));
    this.validate = ajv.compile<RailwayInfo>(schema.definitions.RailwayInfo);
    this.store = new ElectronStore<RailwayInfo>({name: 'railway-info'});
  }

  isDataStored(): boolean {
    return this.store.has('comp_list');
  }

  get_info(): RailwayInfo {
    return this.store.store;
  }

  set_object(object: object): RailwayInfo | undefined {
    if (this.validate(object)) {
      this.store.store = object as RailwayInfo;
      return object;
    } else {
      return;
    }
  }
}

class RailroadStore {
  private store: ElectronStore<GeoJson>;

  constructor() {
    this.store = new ElectronStore<GeoJson>({name: 'railroad'});
  }

  get_object(): GeoJson { return this.store.store; }

  set_object(object: object): GeoJson {
    this.store.store = object;
    return object;
  }
}

export const railInfoStore = new RailwayInfoStore();
export const railroadStore = new RailroadStore();