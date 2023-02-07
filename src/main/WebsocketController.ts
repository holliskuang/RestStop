import { ipcMain } from 'electron';
import ws from 'ws';

export default function WebSocketController(reqResObj, mainWindow): void {
  // Initialize websocket connection
  const ws = new ws(reqResObj.url);

  // let front end know that the websocket is open
  reqResObj.connectionStatus = 'open';
  mainWindow.webContents.send('serverMessage', reqResObj);

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, arg) => {
    ws.send(arg);
  });

  // Transfer Message From Main to Renderer that is received from the websocket

  ws.on('message', function incoming(data) {
    reqResObj.clientMessage.push(data);
    mainWindow.webContents.send('serverMessage', reqResObj);
  });

  // handle websocket errors and unexpected responses
  ws.on('error', function error(err) {
    reqResObj.clientMessage.push(err.message);
    mainWindow.webContents.send('serverMessage', reqResObj);
  });
  ws.on('unexpected-response', function unexpectedResponse(req, res) {
    reqResObj.clientMessage.push(res.statusCode);
    mainWindow.webContents.send('serverMessage', reqResObj);
  });

  // handle websocket close
  ws.on('close', function close() {
    reqResObj.clientMessage.push('WebSocket closed');
    reqResObj.connectionStatus = 'closed';
    mainWindow.webContents.send('serverMessage', reqResObj);
  });
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, arg) => {
    ws.close();
  });
}
