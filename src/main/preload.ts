import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    receive: (channel, cb) => {
      ipcRenderer.on(channel, (event, ...args) => cb(...args));
      ipcRenderer.removeAllListeners(channel);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: Channels, ...args: unknown[]) {
      return await ipcRenderer.invoke(channel, ...args);
    },
    send: (channel, ...data) => {
      ipcRenderer.send(channel, ...data);
    },

    /*on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      }; */
  },
};

contextBridge.exposeInMainWorld('api', electronHandler);

export type ElectronHandler = typeof electronHandler;
