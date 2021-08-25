import { contextBridge, ipcRenderer } from 'electron'

import { IPC_EVENTS } from './utils'
import { GeoJson, RailwayInfo } from './store'

contextBridge.exposeInMainWorld('api', {
  fetchRailInfo: async (): Promise<RailwayInfo | undefined> => await ipcRenderer.invoke(IPC_EVENTS.FETCH_RAIL_INFO),
  readRailInfo: async (): Promise<RailwayInfo | undefined> => await ipcRenderer.invoke(IPC_EVENTS.READ_RAIL_INFO),
  fetchRailroad: async (): Promise<GeoJson | undefined> => await ipcRenderer.invoke(IPC_EVENTS.FETCH_RAIL_ROAD),
  readRailroad: async (): Promise<GeoJson| undefined> => await ipcRenderer.invoke(IPC_EVENTS.READ_RAIL_ROAD),
});

declare global {
  interface Window {
    api: Api
  }
}

export type Api = {
  readRailInfo: () => Promise<RailwayInfo | undefined>
  fetchRailInfo: () => Promise<RailwayInfo | undefined>
  readRailroad: () => Promise<GeoJson| undefined>
  fetchRailroad: () => Promise<GeoJson| undefined>
}