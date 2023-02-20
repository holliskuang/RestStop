import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
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
import Response from '../Response/Response.js';
import Divider from '@mui/material/Divider';
import { useTheme } from '@emotion/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WSRequest() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const lightMode = useSelector((state) => state.light.mode);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  let response = useSelector((state) => state.currentReqRes.response);
  let chatlog = useSelector((state) => state.currentReqRes.gRPCChatLog);
  const theme = useTheme();
  console.log('response', response);
  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    if (!reqState.url.startsWith('http')) {
      toast('🦄 URL Must be HTTP!', {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'light',
      });
      return;
    }
    // Disconnect an existing websocket if it exists and save the reqres to history
    if (response.connectionStatus === true) {
      event.preventDefault();
      api.send('gRPCdisconnect');
      const responseCopy = { ...response };
      responseCopy.connectionStatus = false;
      responseCopy.chatlog = chatlog;
      console.log('responseCopy', responseCopy);
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
    <Box
      sx={{
        width: '70%',
        height: '100%',
        backgroundColor: theme.palette.background.request,
      }}
    >
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row-wrap',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxHeight: '55vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              pt: '8.5%',
            }}
          >
            <Select
              value={reqState.method}
              onChange={(event) => {
                dispatch(setMethod(event.target.value));
              }}
              sx={{ width: '10%' }}
            >
              <MenuItem value="gRPC">gRPC</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="filled"
              placeholder="https://example.com"
              value={reqState.url}
              onChange={(event) => {
                dispatch(setUrl(event.target.value));
              }}
              sx={{ width: '80%' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: '30px',
              width: '90%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'space-around',
                alignItems: 'baseline',
              }}
            >
              <FileUploadSingle />
              <GRPCServiceSelector />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
              }}
            >
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  color: lightMode === 'dark' ? 'white' : 'black',
                  width: '50%',
                  height: '70%',
                }}
                onClick={handleSubmit}
              >
                {reqState.response.connectionStatus == true
                  ? 'Disconnect'
                  : 'Connect'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <GRPCProtoBox />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            height: '45vh',
            overflowY: 'auto',
          }}
        >
          <Response />
        </Box>
      </FormControl>
    </Box>
  );
}
