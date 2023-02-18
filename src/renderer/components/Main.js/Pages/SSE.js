import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../../NavBar';
import Request from '../Request/Request';
import Dashboard from '../Dashboard/Dashboard';
import { themeSettings } from '../../../themes';
import GQLRequest from '../Request/GQLRequest';
import { useDispatch } from 'react-redux';
import {
  setMethod,
  setResponseMode,
  setResponse,
} from '../../../state/currentReqRes.js';
import { ipcRenderer } from 'electron';
import SSERequest from '../Request/SSERequest';

export default function SSE() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const api = window.api.ipcRenderer;
  const response = useSelector((state) => state.currentReqRes.response);
  useEffect(() => {
    dispatch(setMethod('SSE'));
    dispatch(setResponseMode('SSE'));
  }, []);

  api.receive('SSEserverMessage', (event, arg) => {
    dispatch(setResponse(arg));
  });
  console.log('response', response);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <Box
          sx={{
     
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Dashboard />
          <SSERequest />
        </Box>
      </ThemeProvider>
    </Box>
  );
}
