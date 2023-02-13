const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
import fs from 'fs';
import path from 'path';

// one function that opens GRPC connection and sends the response
export const GRPCController = (event: any, reqResObj: any) => {
  // service // package name // rpc // url // query

  // to create client, we need ProtoPath, URL , packageDescriptor

  // on front end, rpc method needs to be identified so we know which method for the client to call

  // to call service we create a stub/client

  /* const client = new routeguide.RouteGuide(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );*/

  // if Simple RPC
  if (reqResObj.method === 'SIMPLE_RPC') {
    /*client.method = (param, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        // send response to front end to display
        console.log(response);
      }
    }*/
  }
  // if Server Streaming

  // Instead of passing the method a request and callback, we pass it a request and get a Readable stream object back
  //  with .on('data', callback) and .on('end', callback) methods.
  if (reqResObj.method === 'SERVER_STREAMING') {
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
  if (reqResObj.method === 'CLIENT_STREAMING') {
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
  if (reqResObj.method === 'BIDIRECTIONAL_STREAMING') {
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
};
//

// parse through filepath to get proto file
export const parseProtoFile = async (
  event: Electron.IpcMainEvent,
  filePath: string
) => {
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

    // Store the services from the current .proto file
    const serviceArr = [];

    for (const [serviceName, serviceDef] of Object.entries(
      protoObject.descriptorDefinition
    )) {
      if (typeof serviceDef === 'function') {
        // here a service is defined.
        const serviceObj = {};
        serviceObj.packageName = protoObject.packageName;
        serviceObj.name = serviceName;
        serviceObj.rpcs = [];
        serviceObj.messages = [];

        for (const [requestName, requestDef] of Object.entries(
          serviceDef.service
        )) {
          const streamingReq = requestDef.requestStream;
          const streamingRes = requestDef.responseStream;

          let stream = 'UNARY';
          if (streamingReq) stream = 'CLIENT STREAM';
          if (streamingRes) stream = 'SERVER STREAM';
          if (streamingReq && streamingRes) stream = 'BIDIRECTIONAL';
          const messageNameReq = requestDef.requestType.type.name;
          const messageNameRes = requestDef.responseType.type.name;
          serviceObj.rpcs.push({
            name: requestName,
            type: stream,
            req: messageNameReq,
            res: messageNameRes,
          });

          // create object with proto info that is formatted for interaction with Swell frontend
          let draftObj;
          requestDef.requestType.type.field.forEach((msgObj) => {
            const mName = msgObj.name;
            // bool will track if the message is a nested type
            let bool = false;
            if (msgObj.type === 'TYPE_MESSAGE') bool = true;
            if (!draftObj) {
              draftObj = {
                name: messageNameReq,
                def: {},
              };
            }
            draftObj.def[mName] = {};
            draftObj.def[mName].type = msgObj.type;
            draftObj.def[mName].nested = bool;
            draftObj.def[mName].dependent = msgObj.typeName;

            // Frontend expects a message object in the following format
            // {
            //   name: messageNameReq,
            //   def: {
            //     [mName]: {
            //       type:msgObj.type,
            //       nested: bool,
            //       dependent: msgObj.typeName}
            //     }
            // }
          });
          serviceObj.messages.push(draftObj);

          // not using the details of the response object (requestDef.responseType) since user will run
          // their own server
        }
        console.log(serviceObj);
        serviceArr.push(serviceObj);
        protoObject.serviceArr = serviceArr;
      }
    }

    // ************************** From Swell OpenSource Repo ********************************

    return protoObject;
  };
  const finalObject = await createAndDecipherProtoFile(protoObject);
  return finalObject;
};
