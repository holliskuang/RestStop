import grpcLibrary from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// one function that opens GRPC connection and sends the response
export const GRPCController = (event: any, reqResObj: any) => {
  // service // package name // rpc // url // query
};

// parse through filepath to get proto file
export const parseProtoFile = async (
  event: Electron.IpcMainEvent,
  filePath: string | string[]
) => {


    
  let protoFileName = filePath;
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  protoLoader
    .load(protoFileName, options)
    .then((packageDefinition) => {
      const packageObject =
        grpcLibrary.loadPackageDefinition(packageDefinition);
    })
    .then((packageObject) => {
      console.log(packageObject);
    });
};
