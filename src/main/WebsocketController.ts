import WebSocket from 'ws';

export const WebSocketController = {
  websocket: null,
  // Initialize websocket connection
  openWebSocket: (event, reqResObj) => {
    const ws = new WebSocket(reqResObj.url);
    this.websocket = ws;
    console.log('websocket', this.websocket);
    reqResObj.connectionStatus = 'connecting';
    reqResObj.chatLog = [];
    // what if it doesn't connect?
    ws.on('open', function open() {
      reqResObj.connectionStatus = 'open';
      event.sender.send('serverMessage', reqResObj);
    });

    // handle websocket errors and unexpected responses
    ws.on('error', function error(err) {
      reqResObj.chatLog.push([err.message, Date.now(), 'server']);
      event.sender.send('serverMessage', reqResObj);
    });
    ws.on('unexpected-response', function unexpectedResponse(req, res) {
      reqResObj.chatLog.push([res.statusCode, Date.now(), 'server']);
      event.sender.send('serverMessage', reqResObj);
    });

    // handle websocket close
    ws.on('close', function close() {
      reqResObj.chatLog.push([
        'WebSocket closed',
        Date.now(),
        'server',
      ]);
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
    const ws = this.websocket;
    if (ws == null) {
      return;
    }

    // Transfer Message From Main to Renderer that is received from the websocket

    ws.on('message', function incoming(data) {
      reqResObj.chatLog.push([data, Date.now(), 'server']);
      console.log('data', data);
      event.sender.send('serverMessage', reqResObj);
    });

    reqResObj.chatLog.push([message, Date.now(), 'client']);
    console.log('pushing message', message);
    console.log('reqResObj', reqResObj);
    event.sender.send('serverMessage', reqResObj);
    this.websocket.send(message);
  },
};
///// Diff OBJS updating to state, only one survives
