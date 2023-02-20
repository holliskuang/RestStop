import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
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
import Response from '../Response/Response';
import Divider from '@mui/material/Divider';
import { useTheme } from '@emotion/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SSERequest() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  const lightMode = useSelector((state) => state.light.mode);
  const theme=useTheme();
  let response = useSelector((state) => state.currentReqRes.response);
  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    /// If URL not HTTP, throw error and return
    if (!reqState.url.startsWith('http')) {
      toast('🦄 URL Must be HTTP!', {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'light',
      });
      return;
    }
    // Disconnect an existing SSE if it exists and save the reqres to history
    if (response.connectionStatus === 'open') {
      api.send('closeSSE', response);
      const responseCopy = { ...response };
      responseCopy.connectionStatus = 'closed';
      dispatch(setResponse(responseCopy));
      dispatch(addReqRes(responseCopy));
      saveRequestToDB(responseCopy.id, responseCopy, currentFolder);
    } else {
      event.preventDefault();
      dispatch(setResponseMode('SSE'));
      let reqResObj = {};
      reqResObj.responseMode = reqState.responseMode;
      reqResObj.id = uuid();
      reqResObj.url = retrieveUrl();
      reqResObj.method = retrieveMethod();
      reqResObj.headers = retrieveHeaders();
      api.send('openSSE', reqResObj);
      console.log(reqResObj);
    }
  }

  // retrieve body from redux
  // retrieve checked headers from redux and return as object
  const retrieveHeaders = () => {
    const headers = {};

    Object.keys(reqState.headers).forEach((id) => {
      if (reqState.headers[id].checked && reqState.headers[id].key !== '') {
        headers[reqState.headers[id].key] = reqState.headers[id].value;
      }
    });

    // Determine Context Type Header based on body type
    headers['Content-Type'] = reqState.bodyType;

    return headers;
  };

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
            height: '55vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
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
              sx={{
                width: '10%',
              }}
            >
              <MenuItem value="SSE">SSE</MenuItem>
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
              sx={{
                width: '80%',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: '3%',
              justifyContent: 'space-around',
            }}
          >
            <HeaderBox />
            <Button
              variant="outlined"
              type="submit"
              sx={{
                color: lightMode === 'dark' ? 'white' : 'black',
                width: '30%',
                alignSelf: 'center',
              }}
              onClick={handleSubmit}
            >
              {response.connectionStatus === 'open' ? 'Disconnect' : 'Connect'}
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            height: '45vh',
            overflowY: 'scroll',
          }}
        >
          <Response />
        </Box>
      </FormControl>
    </Box>
  );
}
