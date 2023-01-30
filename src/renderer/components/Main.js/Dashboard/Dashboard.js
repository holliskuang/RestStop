import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import HistoryBlock from './HistoryBlock';

export default function Dashboard() {
  const [value, setValue] = React.useState('collections');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h3"></Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              icon={<FolderOutlinedIcon />}
              label="Collections"
              value="collections"
            />
            <Tab
              icon={<ScheduleSendOutlinedIcon />}
              label="Schedule"
              value="schedule"
            />
            <Tab
              icon={<AccessTimeOutlinedIcon />}
              label="History"
              value="history"
            />
          </TabList>
        </Box>
        <TabPanel value="collections">
          <HistoryBlock />
        </TabPanel>
        <TabPanel value="schedule"></TabPanel>
        <TabPanel value="history"></TabPanel>
      </TabContext>
    </Box>
  );
}
