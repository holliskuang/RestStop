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
import WSRequest from '../Request/WSRequest';

export default function WebSocket() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const api = window.api.ipcRenderer;
  const response = useSelector((state) => state.currentReqRes.response);
  useEffect(() => {
    dispatch(setMethod('WS'));
    dispatch(setResponseMode('WS'));
    dispatch(setResponse({}));
  }, []);

  api.receive('serverMessage', (event, arg) => {
    dispatch(setResponse(arg));
  });
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Dashboard />
          <WSRequest />
        </Box>
      </ThemeProvider>
    </Box>
  );
}
