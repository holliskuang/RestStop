import EventSource from 'eventsource';

export const SSEController = {
  sse: null,
  // Initialize SSE connection
  openSSE: (event, reqResObj) => {
    //headers
    var eventSourceInitDict = reqResObj.headers;
    const sse = new EventSource(reqResObj.url, eventSourceInitDict);
    this.sse = sse;
    console.log('sse', this.sse);
    reqResObj.connectionStatus = 'connecting';
    reqResObj.chatLog = [];
    sse.onopen = function open() {
      reqResObj.connectionStatus = 'open';
      event.sender.send('SSEserverMessage', reqResObj);
    };

    // handle SSE errors and unexpected responses
    sse.onerror = function error(err) {
      reqResObj.chatLog.push([err.data, Date.now(), 'server']);
      event.sender.send('SSEserverMessage', reqResObj);
    };
    sse.onmessage = function incoming(data) {
      reqResObj.chatLog.push([data, Date.now(), 'server']);
      console.log('data', data);
      event.sender.send('SSEserverMessage', reqResObj);
    };
  },

  closeSSE: (event, reqResObj) => {
    this.sse.close();
    reqResObj.connectionStatus = 'closed';
    event.sender.send('SSEserverMessage', reqResObj);
  },
};
