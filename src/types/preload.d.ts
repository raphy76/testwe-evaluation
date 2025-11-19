import { ElectronHandler } from '../server/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
  }
}

export {};
