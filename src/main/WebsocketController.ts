import { ipcMain } from 'electron';
import WebSocket from 'ws';

const WebSocketController = {
  websocket: null,
  // Initialize websocket connection
  openWebSocket: (event, reqResObj, mainWindow) => {
    const ws = new WebSocket(reqResObj.url);
    this.websocket = ws;
    reqResObj.connectionStatus = 'connecting';
    reqResObj.clientMessage = [];
    // let front end know that the websocket is open
    ws.on('open', function open() {
      reqResObj.connectionStatus = 'open';
      mainWindow.webContents.send('serverMessage', reqResObj);
    });
    // Transfer Message From Main to Renderer that is received from the websocket
    ws.on('message', function incoming(data) {
      reqResObj.response.clientMessage.push(data);
      mainWindow.webContents.send('serverMessage', reqResObj);
    });
    // handle websocket errors and unexpected responses
    ws.on('error', function error(err) {
      reqResObj.response.clientMessage.push(err.message);
      mainWindow.webContents.send('serverMessage', reqResObj);
    });
    ws.on('unexpected-response', function unexpectedResponse(req, res) {
      reqResObj.response.clientMessage.push(res.statusCode);
      mainWindow.webContents.send('serverMessage', reqResObj);
    });

    // handle websocket close
    ws.on('close', function close() {
      reqResObj.response.clientMessage.push('WebSocket closed');
      reqResObj.connectionStatus = 'closed';
      mainWindow.webContents.send('serverMessage', reqResObj);
    });
  },
  closeWebSocket: (event, reqResObj, mainWindow) => {
    this.websocket.close();
    reqResObj.connectionStatus = 'closed';
    mainWindow.webContents.send('serverMessage', reqResObj);
  },
  TransferMessageToWebSocket: (event, message) => {
    this.websocket.send(message);
  },
};

export default function turnOnWebSocketListeners(mainWindow) {
  // initialize websocket connection
  ipcMain.on('openWebSocket', (event, reqResObj, mainWindow) => {
    WebSocketController.openWebSocket(event, reqResObj,mainWindow);
  });
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, reqResObj, mainWindow) => {
    WebSocketController.closeWebSocket(event, reqResObj,mainWindow);
  });

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, message, mainWindow) => {
    WebSocketController.TransferMessageToWebSocket(event, message);
  });
}
