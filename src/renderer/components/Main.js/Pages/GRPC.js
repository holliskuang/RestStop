import { ipcRenderer } from 'electron';
import FileUploadSingle from '../Widgets/Upload';

export default function GRPC() {
  const api = window.api.ipcRenderer;

  api.receive('grpcData', (event, data) => {
    console.log(data);
  });
  api.receive('protoFileParsed', (event, data) => {
    console.log(data);
  });
  return (
    <div>
      <FileUploadSingle />
    </div>
  );
}
