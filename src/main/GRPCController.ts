const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

// one function that opens GRPC connection and sends the response
export const GRPCController = {
  client: null,
  openGRPCConnection: (event, reqResObj) => {
    // remove all listeners for this event
    ipcMain.removeAllListeners('grpcMessage');
    ipcMain.removeAllListeners('gRPCdisconnect');
    /* let reqResObj: {
    method: any;
    responseMode: any;
    id: any;
    url: any;
    filePath: any;
    service: any;
    chatlog: any;
  }*/

    // to create client, we need ProtoPath, URL , packageDescriptor

    // on front end, rpc method needs to be identified so we know which method for the client to call
    console.log(reqResObj);
    // to call service we create a stub/client
    let packageDefinition = protoLoader.loadSync(reqResObj.filePath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    let routeguide =
      grpcLibrary.loadPackageDefinition(packageDefinition).routeguide;

    // create a client with the service url
    let client = new routeguide.RouteGuide(
      reqResObj.url.toString(),
      grpcLibrary.credentials.createInsecure()
    );

    GRPCController.client = client;

    // close connection if already open
    ipcMain.on('gRPCdisconnect', (event) => {
      event.sender.send('gRPCConnection', false);
      event.sender.send('gRPCserverMessage', 'Disconnected from server');
      client.close();
    });
    if (client) {
      console.log('client created');
      event.sender.send('gRPCConnection', true);
      event.sender.send('gRPCserverMessage', 'Connected to server');
    }
  },

  // if Simple RPC
  UnaryCall: (event, service, param) => {
    let client = GRPCController.client;
    //  if (reqResObj.service.type === 'UNARY') {
    // call the method on the client

    let method = service.name;

    client[method](param, (err, response) => {
      if (err) {
        console.log(err.message);
        event.sender.send('gRPCserverMessage', err.message);
      } else {
        // send response to front end to display
        console.log(response);
        event.sender.send('gRPCserverMessage', response);
      }
    });
  },
  // if Server Streaming

  ServerStreamCall: (event, service, param) => {
    // Instead of passing the method a request and callback, we pass it a request and get a Readable stream object back
    //  with .on('data', callback) and .on('end', callback) methods.

    let client = GRPCController.client;
    let method = service.name;
    var call = client[method](param);
    console.log('inside server stream call', call);
    call.on('data', function (data) {
      // process data
      console.log(data);
      event.sender.send('gRPCserverMessage', data);
    });
    call.on('end', function () {
      // The server has finished sending
      event.sender.send('gRPCserverMessage', 'Stream End');
    });
    call.on('error', function (e) {
      // An error has occurred and the stream has been closed.
      event.sender.send('gRPCserverMessage', e.message);
    });
  },

  ClientStreamCall: (event, service, param) => {
    // if Client Streaming we pass the method a callback and get back a Writable

    let client = GRPCController.client;
    let method = service.name;
    var call = client[method](function (error, data) {
      if (error) {
        event.sender.send('gRPCserverMessage', error.message);
      } else {
        event.sender.send('gRPCserverMessage', data);
      }
    });
    call.write(
      param
    );
    ipcMain.on('gRPCEndStreaming', (event) => {
      call.end();
    });
  },

  bidirectional: (event, reqResObj) => {
    // bidirectional streaming
    // Finally, let’s look at our bidirectional streaming RPC routeChat().
    //In this case, we just pass a context to the method and get back a Duplex stream object,
    //which we can use to both write and read messages.
    if (reqResObj.method === 'BIDIRECTIONAL') {
      /*var call = client.routeChat();
  call.on('data', function(note) {
    console.log('Got message "' + note.message + '" at ' +
        note.location.latitude/COORD_FACTOR + ', ' +
        note.location.longitude/COORD_FACTOR);
  }
 call.write({
    location: {
      latitude: 0,
      longitude: 0
    },
 })
 call.on('end', function() {});
 call.end();
 */
    }
  },
};
//

// parse through filepath to get proto file
export const parseProtoFile = async (
  event: Electron.IpcMainEvent,
  filePath: string
) => {
  let parsedData = {};
  let protoObject: any = {};
  let randomFileName = Math.random().toString(36).substring(7);
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  // Create file path for proto contents on the backend that will allow us to load the proto file
  if (!fs.existsSync(path.join(process.resourcesPath, '/protoFiles/'))) {
    fs.mkdirSync(path.join(process.resourcesPath, '/protoFiles/'));
  }

  const filedata = fs.readFileSync(filePath, 'utf-8');
  // data to be displayed on front end
  protoObject.filedata = filedata;
  fs.writeFileSync(
    path.join(process.resourcesPath, `/protoFiles/${randomFileName}.proto`),
    filedata,
    'utf-8'
  );
  protoObject.filePath = path.join(
    process.resourcesPath,
    `/protoFiles/${randomFileName}.proto`
  );
  const createAndDecipherProtoFile = async (protoObject) => {
    // load must use file path  not file contents

    const packageDefinition = protoLoader.loadSync(
      protoObject.filePath,
      options
    );
    const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);

    // assign our descriptor to the protoObject to iterate through available messages in a service
    protoObject.descriptor = packageObject;

    // Service Holder contains 2 Objects, ServiceName and ServiceMethods
    // We can deconstruct these

    // ************************** From Swell OpenSource Repo ********************************
    const findNestedService = (obj) => {
      if (Object.values(obj).length > 1) return obj; // otherwise...
      return findNestedService(Object.values(obj)[0]);
    };
    // invoke the function to add our rpc data onto our protoObject object
    protoObject.descriptorDefinition = findNestedService(
      protoObject.descriptor
    );

    // iterate through our descriptorDefinition object to find our services

    for (const [serviceName, serviceDef] of Object.entries(
      protoObject.descriptorDefinition
    )) {
      if (typeof serviceDef === 'function') {
        // here a service is defined.
        const serviceObj = {};

        serviceObj.rpcs = [];

        for (const [requestName, requestDef] of Object.entries(
          serviceDef.service
        )) {
          const streamingReq = requestDef.requestStream;
          const streamingRes = requestDef.responseStream;

          let stream = 'UNARY';
          if (streamingReq) stream = 'CLIENT STREAM';
          if (streamingRes) stream = 'SERVER STREAM';
          if (streamingReq && streamingRes) stream = 'BIDIRECTIONAL';

          serviceObj.rpcs.push({
            name: requestName,
            type: stream,
          });
        }
        parsedData.rpcs = serviceObj.rpcs;
        parsedData.filedata = filedata;
        parsedData.filePath = path.join(
          path.join(
            process.resourcesPath,
            `/protoFiles/${randomFileName}.proto`
          )
        );
        event.sender.send('protoFileParsed', parsedData);
      }
    }

    // ************************** From Swell OpenSource Repo ********************************

    return protoObject;
  };
  const finalObject = await createAndDecipherProtoFile(protoObject);
  // console.log('finalObject', finalObject);
};
