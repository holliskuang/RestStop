import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  setMethod,
  setUrl,
  setResponse,
  setResponseMode,
  setFileData,
  setRpcs,
  setService,
  setFilePath,
  setReqBody,
} from '../../../state/currentReqRes.js';
import { Button, TextField } from '@mui/material';
import HeaderBox from './HeaderBox';
import { v4 as uuid } from 'uuid';
import { addReqRes } from 'renderer/state/historyReqRes.js';
import { saveRequestToDB } from '../Dashboard/DashboardController.js';
import { db } from 'renderer/db.js';
import TestBox from './TestBox.js';
import chai from 'chai';
import GRPCProtoBox from './GRPCProtoBox.js';
import GRPCServiceSelector from './GRPCServiceSelector.js';
import FileUploadSingle from '../Widgets/Upload.js';
import GRPCResponse from '../Response/GRPCResponse.js';

export default function WSRequest() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  let response = useSelector((state) => state.currentReqRes.response);
  console.log('response', response);
  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    // Disconnect an existing websocket if it exists and save the reqres to history
    if (response.connectionStatus === true) {
      event.preventDefault();
      api.send('gRPCdisconnect');
      const responseCopy = { ...response };
      responseCopy.connectionStatus = false;
      dispatch(setResponse(responseCopy));
      dispatch(addReqRes(responseCopy));
      saveRequestToDB(responseCopy.id, responseCopy, currentFolder);
    } else {
      // oprn a new websocket
      dispatch(setResponseMode('gRPC'));
      event.preventDefault();
      let reqResObj = {};
      reqResObj.method = reqState.method;
      reqResObj.responseMode = reqState.responseMode;
      reqResObj.id = uuid();
      reqResObj.url = retrieveUrl();
      reqResObj.filePath = reqState.filePath;
      reqResObj.service = reqState.service;
      reqResObj.chatlog = [];
      dispatch(setResponse(reqResObj));
      console.log('reqResObj', reqResObj);
      api.send('grpcConnect', reqResObj);
    }
  }
  // retrieve url from redux
  const retrieveUrl = () => {
    const url = reqState.url;
    return url;
  };
  // retrieve method from redux
  const retrieveMethod = () => {
    const method = reqState.method;
    return method;
  };

  return (
    <div className="request">
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <InputLabel id="restReq">Req</InputLabel>
        <Select
          labelId="restReqlabel"
          id="restReq"
          value={reqState.method}
          label="REST"
          onChange={(event) => {
            dispatch(setMethod(event.target.value));
          }}
        >
          <MenuItem value="gRPC">gRPC</MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          placeholder="wss://example.com"
          value={reqState.url}
          onChange={(event) => {
            dispatch(setUrl(event.target.value));
          }}
        ></TextField>
        <Button
          variant="outlined"
          type="submit"
          sx={{
            color: 'white',
          }}
          onClick={handleSubmit}
        >
          {reqState.response.connectionStatus == true
            ? 'Disconnect'
            : 'Connect'}
        </Button>
        <FileUploadSingle />
        <GRPCServiceSelector />
        <GRPCProtoBox />
        <GRPCResponse />
      </FormControl>
    </div>
  );
}
