import { ChangeEvent, useState } from 'react';
import React from 'react';
import fs from 'fs';

function FileUploadSingle() {
  const api = window.api.ipcRenderer;
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    // if file does not end with  a .proto it is not a proto file, return
    if (!e.target.files || !e.target.files[0].name.endsWith('.proto')) {
      alert('Please upload a .proto file');
      return;
    }

    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    api.send('grpcFileUpload', file.path);

    // Uploading the file using the fetch API to the server
    /*fetch(', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
      */
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUploadSingle;
