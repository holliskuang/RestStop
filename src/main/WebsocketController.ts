import { ipcMain } from 'electron';
import webSocket from 'ws';

export default function WebSocketController(reqResObj, mainWindow): void {
  // Initialize websocket connection
  const ws = new webSocket.WebSocket(reqResObj.serverUrl);
  reqResObj.connectionStatus = 'connecting';
  reqResObj.response.clientMessage = [];
  // let front end know that the websocket is open
  ws.on('open', function open() {
    reqResObj.connectionStatus = 'open';
    mainWindow.webContents.send('serverMessage', reqResObj);
  });

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, arg) => {
    ws.send(arg);
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
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, arg) => {
    ws.close();
    reqResObj.connectionStatus = 'closed';
    mainWindow.webContents.send('serverMessage', reqResObj);
  });
}
