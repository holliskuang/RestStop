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
} from '../../../state/currentReqRes.js';

export default function GRPC() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const response = useSelector((state) => state.currentReqRes.response);
  useEffect(() => {
    dispatch(setMethod('GRPC'));
    dispatch(setResponseMode('GRPC'));
  }, []);
  const api = window.api.ipcRenderer;

  api.receive('protoFileParsed', (event, data) => {
    console.log(data);
    dispatch(setFileData(data.filedata));
    dispatch(setRpcs(data.rpcs));
  });
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <GRPCRequest />
        <FileUploadSingle />
        <Dashboard />
      </ThemeProvider>
    </Box>
  );
}
