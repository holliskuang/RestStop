/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { handleRequest } from './util';
import { GQLFetch } from './GraphQLController';
import { WebSocketController } from './WebsocketController';
import { SSEController } from './SSEController';
import { GRPCController, parseProtoFile } from './GRPCController';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  // get request and return object that contains updated response
  ipcMain.handle('fetch', async (event, reqResObj) => {
    return handleRequest(reqResObj);
  });

  ipcMain.handle('gql', async (event, reqResObj) => {
    return GQLFetch(reqResObj, mainWindow);
  });

  // initialize websocket connection
  ipcMain.on('openWebSocket', (event, reqResObj) => {
    WebSocketController.openWebSocket(event, reqResObj);
  });
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, reqResObj) => {
    WebSocketController.closeWebSocket(event, reqResObj);
  });

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, message, reqResObj) => {
    WebSocketController.TransferMessageToWebSocket(event, message, reqResObj);
  });

  // SSE Event Listener for the main process to listen for SSE events
  ipcMain.on('openSSE', (event, reqResObj) => {
    SSEController.openSSE(event, reqResObj);
  });

  ipcMain.on('closeSSE', (event, reqResObj) => {
    SSEController.closeSSE(event, reqResObj);
  });

  // GRPC File Upload Event Listener
  ipcMain.on('grpcFileUpload', async (event, filePath) => {
    parseProtoFile(event, filePath);
  });

  ipcMain.on('grpcConnect', async (event, reqResObj) => {
    GRPCController.openGRPCConnection(event, reqResObj);
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()

  // listen for fetch, return json or text along with headers and cookies
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
