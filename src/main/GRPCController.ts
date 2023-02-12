const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
import { current } from '@reduxjs/toolkit';
import fs from 'fs';
import path from 'path';

// one function that opens GRPC connection and sends the response
export const GRPCController = (event: any, reqResObj: any) => {
  // service // package name // rpc // url // query
};

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
        serviceArr.push(serviceObj);
        protoObject.serviceArr = serviceArr;
      }
    }

    // ************************** From Swell OpenSource Repo ********************************
    console.log(protoObject);
    return protoObject;
  };
  const finalObject = await createAndDecipherProtoFile(protoObject);
  return finalObject;
};
