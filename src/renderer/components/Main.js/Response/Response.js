import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';
import ResponseCookies from './ResponseCookies';
import ResponseTest from './ResponseTest';
import WSResponse from './WSResponse';
import GRPCResponse from './GRPCResponse';
import SSEResponse from './SSEResponse';
import { useTheme } from '@mui/material/styles';

export default function Response() {
  const [value, setValue] = React.useState('body');
  const reqState = useSelector((state) => state.currentReqRes);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const responseMode = reqState.responseMode;
  const theme = useTheme();
  // If response mode is WS, return WSResponse component
  if (responseMode === 'WS') return <WSResponse />;
  // If response is in GRPC mode, return GRPCResponse component
  if (responseMode === 'gRPC') return <GRPCResponse />;

  // If response is in SSE mode, return SSEResponse component
  if (responseMode === 'SSE') return <SSEResponse />;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        typography: 'body1',
        pr: '2.5%',
        pl: '2.5%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '2%' }}>
        <Typography variant="h3" sx={{ ml: '2.5%', alignText: 'center' }}>
          {' '}
          Response{' '}
        </Typography>
      </Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Body" value="body" />
            <Tab label="Headers" value="headers" />
            <Tab label="Cookies" value="cookies" />
            <Tab label="Tests" value="tests" />
          </TabList>
        </Box>
        <TabPanel value="body">
          <ResponseBody />
        </TabPanel>
        <TabPanel value="headers">
          {responseMode === 'HTTP' ? (
            <ResponseHeaders />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                style={{ width: '35%', height: '60%', marginBottom: '4%' }}
                src="https://res.cloudinary.com/dd97ovnmi/image/upload/v1676516183/restLogo_qwj20k.png"
              />
              Headers are only available in HTTP mode
            </Box>
          )}
        </TabPanel>
        <TabPanel value="cookies">
          {responseMode === 'HTTP' ? (
            <ResponseCookies />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                style={{ width: '35%', height: '60%', marginBottom: '4%' }}
                src="https://res.cloudinary.com/dd97ovnmi/image/upload/v1676516183/restLogo_qwj20k.png"
              />
              Cookies are only available in HTTP mode
            </Box>
          )}
        </TabPanel>
        <TabPanel value="tests">
          {responseMode === 'HTTP' ? (
            <ResponseTest />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                style={{ width: '35%', height: '60%', marginBottom: '4%' }}
                src="https://res.cloudinary.com/dd97ovnmi/image/upload/v1676516183/restLogo_qwj20k.png"
              />
              Tests are only available in HTTP mode
            </Box>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
