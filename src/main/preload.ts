import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    receive: (channel, cb) => {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, cb);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: Channels, ...args: unknown[]) {
      return await ipcRenderer.invoke(channel, ...args);
    },
    send: (channel, cb) => {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.send(channel, cb);
    },
    // on to subscribe to a channel and receive updates
    sub: (callback) => {
      // if listener is already registered, remove it
      ipcRenderer.removeAllListeners('subscription');
      ipcRenderer.on('subscription', callback);
    },
  },
};

contextBridge.exposeInMainWorld('api', electronHandler);

export type ElectronHandler = typeof electronHandler;
