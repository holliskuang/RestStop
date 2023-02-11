import grpcLibrary from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { IpcMain } from 'electron';


// one function that opens GRPC connection and sends the response
export const GRPCController: void(event: any,reqResObj: any) => {
    // service // package name // rpc // url // query  
}

// parse through filepath to get proto file
export const parseProtoFile = (event: Electron.IpcMainEvent,filePath: string | string[]) => {
    const packageDefinition = protoLoader.loadSync(filePath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const protoDescriptor = grpcLibrary.loadPackageDefinition(packageDefinition);
    return protoDescriptor;
};