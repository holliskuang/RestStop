import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    receive: (channel: Channels, ...args: unknown[]) => {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel , args);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: Channels, ...args: unknown[]) {
      return await ipcRenderer.invoke(channel, ...args);
    },
    send: (channel: Channels, ...args: unknown[])=> {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.send(channel, ...args);
    },
    // on to subscribe to a channel and receive updates
    sub: (callback) => {
      // if listener is already registered, remove it
      ipcRenderer.removeAllListeners('subscription');
      ipcRenderer.on('subscription', callback);
    },
    //on 

  },
};

contextBridge.exposeInMainWorld('api', electronHandler);

export type ElectronHandler = typeof electronHandler;
