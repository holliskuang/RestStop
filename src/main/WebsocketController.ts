import { ipcMain } from 'electron';
import WebSocket from 'ws';

export const WebSocketController = {
  websocket: null,
  // Initialize websocket connection
  openWebSocket: (event, reqResObj) => {
    const ws = new WebSocket(reqResObj.url);
    this.websocket = ws;
    console.log('websocket', this.websocket);
    reqResObj.connectionStatus = 'connecting';
    reqResObj['response'] = { serverMessage: [], clientMessage: [] };
    // let front end know that the websocket is open
    ws.on('open', function open() {
      reqResObj.connectionStatus = 'open';
      event.sender.send('serverMessage', reqResObj);
    });
    // Transfer Message From Main to Renderer that is received from the websocket
    ws.on('message', function incoming(data) {
      reqResObj.response.serverMessage.push(data);
      console.log('data', data);
      event.sender.send('serverMessage', reqResObj);
    });
    // handle websocket errors and unexpected responses
    ws.on('error', function error(err) {
      reqResObj.response.serverMessage.push(err.message);
      event.sender.send('serverMessage', reqResObj);
    });
    ws.on('unexpected-response', function unexpectedResponse(req, res) {
      reqResObj.response.serverMessage.push(res.statusCode);
      event.sender.send('serverMessage', reqResObj);
    });

    // handle websocket close
    ws.on('close', function close() {
      reqResObj.response.serverMessage.push('WebSocket closed');
      reqResObj.connectionStatus = 'closed';
      event.sender.send('serverMessage', reqResObj);
    });
  },
  closeWebSocket: (event, reqResObj) => {
    this.websocket.close();
    reqResObj.connectionStatus = 'closed';
    event.sender.send('serverMessage', reqResObj);
  },
  TransferMessageToWebSocket: (event, message, reqResObj) => {
    if (this.websocket == null) {
      return;
    }
    reqResObj.response.clientMessage.push(message);
    event.sender.send('serverMessage', reqResObj);
    this.websocket.send(message);
  },
};
