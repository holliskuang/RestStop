const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');
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
  let protoProcessPath;
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

  fs.readFile(filePath, 'utf-8', (err, file) => {
    if (err) {
      console.log(err);
      event.sender.send('serverMessage', {
        error: err,
        message: 'Error reading proto file',
      });
      return;
    } else {
      // Write Contents to file on Backend and return file path
      fs.writeFileSync(
        path.join(process.resourcesPath, `/protoFiles/${randomFileName}.proto`),
        file,
        'utf-8'
      );
      protoProcessPath = path.join(
        process.resourcesPath,
        `/protoFiles/${randomFileName}.proto`
      );
      protoObject.filePath = protoProcessPath;
      createAndDecipherProtoFile(protoObject);
    }
  });

  const createAndDecipherProtoFile = async (protoObject) => {
    // load must use file path  not file contents

    const packageDefinition = protoLoader.loadSync(
      protoObject.filePath,
      options
    );
    const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);

    // assign our descriptor to the protoObject to iterate through available messages in a service
    protoObject.packageObject = packageObject;

    protoObject.serviceHolder = Object.values(packageObject)[0];
    // Service Holder contains 2 Objects, ServiceName and ServiceMethods
    // We can deconstruct these

    for (const [ServiceName, ServiceMethods] of Object.entries(
      protoObject.serviceHolder
    )){
      console.log(ServiceName)
      console.log(ServiceMethods);
    }
  };
};
