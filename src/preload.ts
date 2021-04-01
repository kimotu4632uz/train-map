import { contextBridge, ipcRenderer } from 'electron'

import { IPC_EVENTS } from './utils'
import { GeoJson, RailwayInfo, StoreType } from './store'

contextBridge.exposeInMainWorld('api', {
  fetchRailInfo: async (type: StoreType): Promise<RailwayInfo | GeoJson | undefined> => await ipcRenderer.invoke(IPC_EVENTS.FETCH_RAIL_INFO, type),
  readRailInfo: async (): Promise<RailwayInfo | undefined> => await ipcRenderer.invoke(IPC_EVENTS.READ_RAIL_INFO),
});

declare global {
  interface Window {
    api: Api
  }
}

export type Api = {
  readRailInfo: () => Promise<RailwayInfo | undefined>
  fetchRailInfo: (type: StoreType) => Promise<RailwayInfo | GeoJson | undefined>
}