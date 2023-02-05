import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../../NavBar';
import Request from '../Request/Request';
import Dashboard from '../Dashboard/Dashboard';
import { themeSettings } from '../../../themes';
import { useDispatch } from 'react-redux';
import { setMethod } from '../../../state/currentReqRes.js';
import { useEffect } from 'react';
import { setResponseMode } from '../../../state/currentReqRes.js';


export default function HTTP() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMethod('GET'));
    dispatch(setResponseMode('HTTP'));
   
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <Request></Request>
        
        <Dashboard />
      </ThemeProvider>
    </Box>
  );
}
