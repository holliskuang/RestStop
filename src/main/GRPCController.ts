import grpcLibrary from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';

// one function that opens GRPC connection and sends the response
export const GRPCController = (event: any, reqResObj: any) => {
  // service // package name // rpc // url // query
};

// parse through filepath to get proto file
export const parseProtoFile = async (
  event: Electron.IpcMainEvent,
  filePath: string
) => {
  fs.readFile(filePath, 'utf-8', (err, file) => {
    if (err) {
      console.log(err);
      // send error to renderer that proto could not be parsed
      return;
    } else {
      // Write Contents to file on Backend and return file path
      return file;
    }
  });

  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  // load must use file path  not file contents

  protoLoader
    .load(protoData, options)
    .then((packageDefinition) => {
      const packageObject =
        grpcLibrary.loadPackageDefinition(packageDefinition);
    })
    .then((packageObject) => {
      console.log(packageObject);
    });
};
