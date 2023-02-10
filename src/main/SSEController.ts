import eventsources from 'sse-event-sources';

export const SSEController = {
  sse: null,
  // Initialize SSE connection
  openSSE: (event, reqResObj) => {
    //headers
    var eventSourceInitDict = reqResObj.headers;
    const sse = new eventsources.EventSource(
      reqResObj.url,
      eventSourceInitDict
    );
    this.sse = sse;
    console.log('sse', this.sse);
    reqResObj.connectionStatus = 'connecting';
    reqResObj.chatLog = [];
    sse.onopen = function open() {
      reqResObj.connectionStatus = 'open';
      event.sender.send('serverMessage', reqResObj);
    };

    // handle SSE errors and unexpected responses
    sse.onerror = function error(err) {
      reqResObj.chatLog.push([err.message, Date.now(), 'server']);
      event.sender.send('serverMessage', reqResObj);
    };
    sse.onunexpectedresponse = function unexpectedResponse(req, res) {
      reqResObj.chatLog.push([res.statusCode, Date.now(), 'server']);
      event.sender.send('serverMessage', reqResObj);
    };
    sse.onmessage = function incoming(data) {
      reqResObj.chatLog.push([data, Date.now(), 'server']);
      console.log('data', data);
      event.sender.send('serverMessage', reqResObj);
    };
  },

  closeSSE: (event, reqResObj) => {
    this.sse.close();
    reqResObj.connectionStatus = 'closed';
    event.sender.send('serverMessage', reqResObj);
  },
};
