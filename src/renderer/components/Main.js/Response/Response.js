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

export default function Response() {
  const [value, setValue] = React.useState('body');
  const reqState = useSelector((state) => state.currentReqRes);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const responseMode = reqState.responseMode;
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h3">
        Status:{reqState.response.responseStatus}
      </Typography>
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
            'Headers are only available in HTTP mode'
          )}
        </TabPanel>
        <TabPanel value="cookies">
          {responseMode === 'HTTP' ? (
            <ResponseCookies />
          ) : (
            'Cookies are only available in HTTP mode'
          )}
        </TabPanel>
        <TabPanel value="tests">
          {responseMode === 'HTTP' ? (
            <ResponseTest />
          ) : (
            'Tests are only available in HTTP mode'
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
