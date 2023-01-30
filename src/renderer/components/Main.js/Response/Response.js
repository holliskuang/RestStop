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

export default function Response() {
  const [value, setValue] = React.useState('body');
  const reqState = useSelector((state) => state.currentReqRes);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h3">
        Status:{reqState.response.responseStatus}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="body" />
            <Tab label="Item Two" value="headers" />
            <Tab label="Item Three" value="cookies" />
          </TabList>
        </Box>
        <TabPanel value="body">
          <ResponseBody />
        </TabPanel>
        <TabPanel value="headers">
          <ResponseHeaders />
        </TabPanel>
        <TabPanel value="cookies">
          <ResponseCookies />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
