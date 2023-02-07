import { ipcMain } from 'electron';
import webSocket from 'ws';

const WebSocketController = {
  websocket: null,
  // Initialize websocket connection
  openWebSocket: (event, arg, reqResObj) => {
    const ws = new webSocket.WebSocket(reqResObj.serverUrl);
    this.websocket = ws;
    reqResObj.connectionStatus = 'connecting';
    reqResObj.response.clientMessage = [];
    // let front end know that the websocket is open
    ws.on('open', function open() {
      reqResObj.connectionStatus = 'open';
      event.webContents.send('serverMessage', reqResObj);
    });
    // Transfer Message From Main to Renderer that is received from the websocket
    ws.on('message', function incoming(data) {
      reqResObj.response.clientMessage.push(data);
      event.webContents.send('serverMessage', reqResObj);
    });
    // handle websocket errors and unexpected responses
    ws.on('error', function error(err) {
      reqResObj.response.clientMessage.push(err.message);
      event.webContents.send('serverMessage', reqResObj);
    });
    ws.on('unexpected-response', function unexpectedResponse(req, res) {
      reqResObj.response.clientMessage.push(res.statusCode);
      event.webContents.send('serverMessage', reqResObj);
    });

    // handle websocket close
    ws.on('close', function close() {
      reqResObj.response.clientMessage.push('WebSocket closed');
      reqResObj.connectionStatus = 'closed';
      event.webContents.send('serverMessage', reqResObj);
    });
  },
  closeWebSocket: (event, reqResObj) => {
    this.websocket.close();
    reqResObj.connectionStatus = 'closed';
    event.webContents.send('serverMessage', reqResObj);
  },
  TransferMessageToWebSocket: (event, message) => {
    this.websocket.send(message);
  }
};

module.exports = () => {
  // initialize websocket connection
  ipcMain.on('openWebSocket', (event, arg, reqResObj) => {
    WebSocketController.openWebSocket(event, arg, reqResObj);
  });
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, reqResObj) => {
    WebSocketController.closeWebSocket(event, reqResObj);
  });

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, message) => {
    WebSocketController.TransferMessageToWebSocket(event, message);
  });
};
