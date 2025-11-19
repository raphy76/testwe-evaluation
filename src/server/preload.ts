// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'ipc-example' | 'get-data' | 'save-data';

const electronHandler = {
  storage: {
    getData: () => ipcRenderer.invoke("get-data"),
    saveData: (data: any) => ipcRenderer.invoke("save-data", data)
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
