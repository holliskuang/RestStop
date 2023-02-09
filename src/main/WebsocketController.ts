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
    ws.on('open', function open() {
      reqResObj.connectionStatus = 'open';
      event.sender.send('serverMessage', [reqResObj, Date.now()]);
    });

    // handle websocket errors and unexpected responses
    ws.on('error', function error(err) {
      reqResObj.response.serverMessage.push(err.message);
      event.sender.send('serverMessage', [reqResObj, Date.now()]);
    });
    ws.on('unexpected-response', function unexpectedResponse(req, res) {
      reqResObj.response.serverMessage.push(res.statusCode);
      event.sender.send('serverMessage', [reqResObj, Date.now()]);
    });

    // handle websocket close
    ws.on('close', function close() {
      reqResObj.response.serverMessage.push('WebSocket closed');
      reqResObj.connectionStatus = 'closed';
      event.sender.send('serverMessage', [reqResObj, Date.now()]);
    });
  },

  closeWebSocket: (event, reqResObj) => {
    this.websocket.close();
    reqResObj.connectionStatus = 'closed';
    event.sender.send('serverMessage', [reqResObj, Date.now()]);
  },
  TransferMessageToWebSocket: (event, message, reqResObj) => {
    const ws = this.websocket;
    if (ws == null) {
      return;
    }

    // Transfer Message From Main to Renderer that is received from the websocket

    ws.on('message', function incoming(data) {
      reqResObj.response.serverMessage.push([data, Date.now()]);
      console.log('data', data);
      event.sender.send('serverMessage', reqResObj);
    });

    reqResObj.response.clientMessage.push(message);
    console.log('pushing message', message);
    console.log('reqResObj', reqResObj);
    event.sender.send('serverMessage', [reqResObj, Date.now()]);
    this.websocket.send(message);
  },
};
///// Diff OBJS updating to state, only one survives
