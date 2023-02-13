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
} from '../../../state/currentReqRes.js';
import { Button, TextField } from '@mui/material';
import HeaderBox from './HeaderBox';
import { v4 as uuid } from 'uuid';
import ReqBodyTextBox from './ReqBodyTextBox';
import ReqBodyTextBoxSelector from './ReqBodyTextBoxSelector';
import Response from '../Response/Response';
import { addReqRes } from 'renderer/state/historyReqRes.js';
import { saveRequestToDB } from '../Dashboard/DashboardController.js';
import { db } from 'renderer/db.js';
import TestBox from './TestBox.js';
import chai from 'chai';
import GraphQL from '../Pages/GraphQL.js';
import GQLVariableBox from './GQLVariableBox.js';
import WSResponse from '../Response/WSResponse.js';
import GRPCProtoBox from './GRPCProtoBox.js';
import GRPCServiceSelector from './GRPCServiceSelector.js';

export default function WSRequest() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  let response = useSelector((state) => state.currentReqRes.response);
  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    // IF URL NOT WS, THROW ERROR AND RETURN
    if (!reqState.url.startsWith('ws')) {
      alert('URL must be WS');
      return;
    }
    // Disconnect an existing websocket if it exists and save the reqres to history
    if (response.connectionStatus === 'open') {
      api.send('closeWebSocket', response);
      const responseCopy = { ...response };
      responseCopy.connectionStatus = 'closed';
      dispatch(setResponse(responseCopy));
      dispatch(addReqRes(responseCopy));
      saveRequestToDB(responseCopy.id, responseCopy, currentFolder);
    } else {
      // oprn a new websocket
      dispatch(setResponseMode('WS'));
      event.preventDefault();
      let reqResObj = {};
      reqResObj.method = reqState.method;
      reqResObj.responseMode = reqState.responseMode;
      reqResObj.id = uuid();
      reqResObj.url = retrieveUrl();
      dispatch(setResponse(reqResObj));
      api.send('openWebSocket', reqResObj);
      // console.log('reqAndRes', reqAndRes);
    }
  }
  console.log('METHOD', reqState.method);
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

  /// handle change in text box update redux
  const textBoxHandleChange = (event) => {
    dispatch(setReqBody(event.target.value));
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
          <MenuItem value="WS">gRPC</MenuItem>
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
          {reqState.response.connectionStatus == 'open'
            ? 'Disconnect'
            : 'Connect'}
        </Button>
        <GRPCServiceSelector />
        <GRPCProtoBox />
        <Response />
      </FormControl>
    </div>
  );
}
