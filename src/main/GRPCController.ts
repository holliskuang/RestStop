import grpcLibrary from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { IpcMain } from 'electron';


// one function that opens GRPC connection and sends the response
export const GRPCController: void(event,reqResObj) => {
    // service // package name // rpc // url // query  
}