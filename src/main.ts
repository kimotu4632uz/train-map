import { BrowserWindow, app, dialog, ipcMain } from 'electron';
import { RailwayInfo, GeoJson, railInfoStore, railroadStore } from './store';

import { IPC_EVENTS, FILE_FILTERS_JSON, FILE_FILTERS_GEOJSON, readJson } from './utils'

const mainURL = `file://${__dirname}/index.html`;
let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`
    }
  });

  mainWindow.loadURL(mainURL);
  mainWindow.setMenu(null);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle(IPC_EVENTS.FETCH_RAIL_INFO, async (_): Promise<RailwayInfo | undefined> => {
  if (mainWindow === null) return;

  const files = await dialog.showOpenDialog(mainWindow, { properties: ['openFile'], filters: FILE_FILTERS_JSON });
  if (files.canceled || files.filePaths.length === 0) return;

  const json = readJson(files.filePaths[0]);
  return railInfoStore.set_object(json);
});

ipcMain.handle(IPC_EVENTS.READ_RAIL_INFO, async (): Promise<RailwayInfo | undefined> => {
  if (mainWindow === null) return;

  if (!railInfoStore.isDataStored()) return;
  return railInfoStore.get_info();
})

ipcMain.handle(IPC_EVENTS.FETCH_RAIL_ROAD, async (_): Promise<GeoJson | undefined> => {
  if (mainWindow === null) return;

  const files = await dialog.showOpenDialog(mainWindow, { properties: ['openFile'], filters: FILE_FILTERS_GEOJSON });
  if (files.canceled || files.filePaths.length === 0) return;

  const json = readJson(files.filePaths[0]);
  return railroadStore.set_object(json);
});

