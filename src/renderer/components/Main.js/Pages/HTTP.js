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
import { setResponseMode, setResponse } from '../../../state/currentReqRes.js';
import { width } from '@mui/system';


export default function HTTP() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMethod('GET'));
    dispatch(setResponseMode('HTTP'));
    dispatch(setResponse({}));
  }, []);


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
          <Request />
        </Box>
      </ThemeProvider>
    </Box>
  );
}
