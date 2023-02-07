import ws from 'ws';


const WebSocket = typeof window === 'undefined' ? ws : window.WebSocket;

export default function WebSocketController(reqResObj, mainWindow): void {

    const ws = new WebSocket(reqResObj.url, reqResObj.headers);
    
    ws.on('open', function open() {
        ws.send('something');
    });
    
    ws.on('message', function incoming(data) {
        console.log(data);
    });

}