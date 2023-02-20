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
import { Button, TextField, Box } from '@mui/material';
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
import Divider from '@mui/material/Divider';
import { useTheme } from '@emotion/react';

export default function WSRequest() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const lightMode = useSelector((state) => state.light.mode);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  const theme = useTheme();
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
      // open a new websocket
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
            alignItems: 'center',
            justifyContent: 'center',
            pt: '8.5%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Select
              value={reqState.method}
              onChange={(event) => {
                dispatch(setMethod(event.target.value));
              }}
              sx={{ width: '10%' }}
            >
              <MenuItem value="WS">WS</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="filled"
              placeholder="wss://example.com"
              value={reqState.url}
              onChange={(event) => {
                dispatch(setUrl(event.target.value));
              }}
              sx={{ width: '80%' }}
            />
          </Box>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              color: lightMode === 'dark' ? 'white' : 'black',
              mt: '20px',
            }}
            onClick={handleSubmit}
          >
            {reqState.response.connectionStatus == 'open'
              ? 'Disconnect'
              : 'Connect'}
          </Button>
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
