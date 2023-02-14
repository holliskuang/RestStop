const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

// one function that opens GRPC connection and sends the response
export function GRPCController(event: any, reqResObj: any) {
  /* let reqResObj: {
    method: any;
    responseMode: any;
    id: any;
    url: any;
    filePath: any;
    service: any;
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
    'localhost:50051',
    grpcLibrary.credentials.createInsecure()
  );

  if (client) {
    console.log('client created');
    reqResObj.connectionStatus = 'connected';
    event.sender.send('gRPCserverMessage', reqResObj);
  }
  // if Simple RPC
  if (reqResObj.service.type === 'UNARY') {
    // call the method on the client

    //   ipcMain.on('grpcMessage', (event, param) => {
    let call = reqResObj.service.name;

    client[call](
      {
        latitude: '412950425',
        longitude: '-741077389',
      },
      (err, response) => {
        if (err) {
          console.log(err);
          event.sender.send('gRPCserverMessage', err);
        } else {
          // send response to front end to display
          console.log(response);
        }
      }
    );
  }
  //  });
  // }
  // if Server Streaming

  // Instead of passing the method a request and callback, we pass it a request and get a Readable stream object back
  //  with .on('data', callback) and .on('end', callback) methods.
  if (reqResObj.method === 'SERVER_STREAM') {
    /*
  var call = client.listFeatures(rectangle);
  call.on('data', function(feature) {
      console.log('Found feature called "' + feature.name + '" at ' +
          feature.location.latitude/COORD_FACTOR + ', ' +
          feature.location.longitude/COORD_FACTOR);
  });
  call.on('end', function() {
    // The server has finished sending
  });
  call.on('error', function(e) {
    // An error has occurred and the stream has been closed.
  });
  call.on('status', function(status) {
    // process status
  });
  */
  }

  // if Client Streaming we pass the method a callback and get back a Writable
  if (reqResObj.method === 'CLIENT_STREAM') {
    /* var call = client.recordRoute(function(error, stats) {
  if (error) {
    callback(error);
  }
  console.log('Finished trip with', stats.point_count, 'points');
  console.log('Passed', stats.feature_count, 'features');
  console.log('Travelled', stats.distance, 'meters');
  console.log('It took', stats.elapsed_time, 'seconds');
});
function pointSender(lat, lng) {
  return function(callback) {
    console.log('Visiting point ' + lat/COORD_FACTOR + ', ' +
        lng/COORD_FACTOR);
    call.write({
      latitude: lat,
      longitude: lng
    });
    _.delay(callback, _.random(500, 1500));
  };
}
var point_senders = [];
for (var i = 0; i < num_points; i++) {
  var rand_point = feature_list[_.random(0, feature_list.length - 1)];
  point_senders[i] = pointSender(rand_point.location.latitude,
                                 rand_point.location.longitude);
}
async.series(point_senders, function() {
  call.end();
}); */
  }

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
}
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
