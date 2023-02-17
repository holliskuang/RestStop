import { ipcRenderer } from 'electron';
import FileUploadSingle from '../Widgets/Upload';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../../NavBar';
import Box from '@mui/material/Box';
import GRPCRequest from '../Request/GRPCRequest';
import Dashboard from '../Dashboard/Dashboard';
import { themeSettings } from '../../../themes';
import { useDispatch } from 'react-redux';
import {
  setMethod,
  setResponseMode,
  setFileData,
  setRpcs,
  setFilePath,
  setResponse,
  setGRPCChatLog,
} from '../../../state/currentReqRes.js';
import gRPCResponse from '../Response/GRPCResponse';
import WSResponse from '../Response/WSResponse';

export default function GRPC() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const response = useSelector((state) => state.currentReqRes.response);
  const chatlog = useSelector((state) => state.currentReqRes.gRPCChatLog);
  console.log('chatlog', chatlog);
  useEffect(() => {
    dispatch(setMethod('gRPC'));
    dispatch(setResponseMode('gRPC'));
  }, []);

  const api = window.api.ipcRenderer;

  api.receive('gRPCserverMessage', (event, message) => {
    let newChatLog = [...chatlog];
    // format message to be string
    newChatLog.push([JSON.stringify(message), new Date(), 'server']);
    dispatch(setGRPCChatLog(newChatLog));
  });

  api.receive('protoFileParsed', (event, data) => {
    dispatch(setFileData(data.filedata));
    dispatch(setRpcs(data.rpcs));
    dispatch(setFilePath(data.filePath));
  });

  api.receive('gRPCConnection', (event, connection) => {
    let newResponse = { ...response };
    newResponse.connectionStatus = connection;
    dispatch(setResponse(newResponse));
  });

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <Box
          sx={{
            mt: '8.5vh',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Dashboard />
          <GRPCRequest />
        </Box>
      </ThemeProvider>
    </Box>
  );
}
