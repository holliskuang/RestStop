import { ipcMain } from 'electron';
import ws from 'ws';

export default function WebSocketController(reqResObj, mainWindow): void {
  const ws = new ws(reqResObj.url);

  ws.on('open', function open() {
    ws.send('Hello!');
  });

  // Transfer Message From Renderer to Main and send it through the websocket
  ipcMain.on('clientMessage', (event, arg) => {
    ws.send(arg);
  });

  // Transfer Message From Main to Renderer that is received from the websocket

  ws.on('message', function incoming(data) {
    mainWindow.webContents.send('serverMessage', data);
  });

  // handle websocket errors and unexpected responses
  ws.on('error', function error(err) {
    mainWindow.webContents.send('serverMessage', err.message);
  });
  ws.on('unexpected-response', function unexpectedResponse(req, res) {
    mainWindow.webContents.send('serverMessage', res.statusCode);
  });

  // handle websocket close
  ws.on('close', function close() {
    mainWindow.webContents.send('serverMessage', 'WebSocket closed');
  });
  // initialize websocket close
  ipcMain.on('closeWebSocket', (event, arg) => {
    ws.close();
  });
}
