import { ChangeEvent, useState } from 'react';
import React from 'react';
import fs from 'fs';
import { Box, Button, Input, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function FileUploadSingle() {
  const api = window.api.ipcRenderer;
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    // if file does not end with  a .proto it is not a proto file, return
    if (e.target.files[0]) {
      if (!e.target.files || !e.target.files[0].name.endsWith('.proto')) {
        alert('Please upload a .proto file');
      } else setFile(e.target.files[0]);
    }
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row ',
        justifyContent: 'space-around',
        width: '60%',
      }}
    >
      <Input type="file" onChange={handleFileChange} />

      <Button
        variant="filledTonal"
        endIcon={<CloudUploadOutlinedIcon fontSize="large" />}
        onClick={handleUploadClick}
        sx={{ height: '70px', width: '100px' }}
        style={{ fontSize: '15px' }}
      >
        Upload
      </Button>
    </Box>
  );
}

export default FileUploadSingle;
