import ElectronStore from 'electron-store';
import Ajv, { ValidateFunction } from 'ajv';
import * as path from 'path';

import { readJson } from './utils'

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

class RailwayInfoStore {
  private store: ElectronStore<RailwayInfo>;
  private validate: ValidateFunction<RailwayInfo>;

  private data?: RailwayInfo;

  constructor() {
    const ajv = new Ajv();
    const schema = readJson(path.resolve(__dirname, 'schema.json'));
    this.validate = ajv.compile<RailwayInfo>(schema.definitions.RailwayInfo);
    this.store = new ElectronStore<RailwayInfo>({name: 'railway-info'});
    this.data = undefined;
  }

  isDataStored(): boolean {
    return this.store.has('comp_list');
  }

  get_info(): RailwayInfo | undefined {
    return this.data;
  }

  set_object(object: object): RailwayInfo | undefined {
    if (this.validate(object)) {
      this.store.store = object as RailwayInfo;
      this.data = object;
      return object;
    } else {
      return;
    }
  }
}

export type GeoJson = {
  type: string,
  id?: string;
  features: {
    type: string,
    properties: object,
    geometry: object,
  }[],
};

class RailroadStore {
  private store: ElectronStore<GeoJson>;
  private validate: ValidateFunction<GeoJson>;

  private data?: GeoJson;

  constructor() {
    const ajv = new Ajv();
    const schema = readJson(path.resolve(__dirname, 'schema.json'));
    this.validate = ajv.compile<GeoJson>(schema.definitions.GeoJson);
    this.store = new ElectronStore<GeoJson>({name: 'railroad'});
  }

  get_object(): GeoJson | undefined {
    return this.data;
  }

  set_object(object: object): GeoJson | undefined {
    if (this.validate(object)) {
      this.store.store = object as GeoJson;
      this.data = object;
      return object;
    } else {
      return;
    }
  }
}

export const railInfoStore = new RailwayInfoStore();
export const railroadStore = new RailroadStore();