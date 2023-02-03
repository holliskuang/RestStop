import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../../NavBar';
import Request from '../Request/Request';
import Dashboard from '../Dashboard/Dashboard';
import { themeSettings } from '../../../themes';
import GQLRequest from '../Request/GQLRequest';

export default function GraphQL() {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar></NavBar>
        <GQLRequest />
        <Dashboard />
      </ThemeProvider>
    </Box>
  );
}
