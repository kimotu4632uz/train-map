import fs from 'fs';

export enum IPC_EVENTS {
  FETCH_RAIL_INFO = 'fetch-rail-info',
  READ_RAIL_INFO = 'read-rail-info',
  FETCH_RAIL_ROAD = 'fetch-rail-road',
  READ_RAIL_ROAD = 'read-rail-road',
}

export const FILE_FILTERS_JSON: {
  name: string;
  extensions: string[];
}[] = [
  { name: 'json', extensions: ['json'] },
  { name: 'All Files', extensions: ['*'] }
];

export const FILE_FILTERS_GEOJSON: {
  name: string;
  extensions: string[];
}[] = [
  { name: 'geojson', extensions: ['geojson'] },
  { name: 'All Files', extensions: ['*'] }
];


export const readJson = (fileName: string): any => {
  let text = '';
  try {
    text = fs.readFileSync(fileName, {encoding: 'utf-8'});
  } catch (e) {
    console.log(e);
  }
  return JSON.parse(text);
};
