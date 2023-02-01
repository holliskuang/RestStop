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
import { useSelector, useDispatch } from 'react-redux';
import HistoryBlock from './HistoryBlock';
import TimeBlock from './TimeBlock';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Select,
  unstable_composeClasses,
} from '@mui/material';
import {
  deleteCurrentFolder,
  getRequestsFromDB,
  deleteRequestsFromFolder,
} from './DashboardController';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db';
import { useEffect } from 'react';
import FormDialog from './FormDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import FolderSelect from './FolderSelect';
import { getFoldersFromDB } from './DashboardController';
import { setFolder } from '../../../state/currentReqRes';

export default function Dashboard() {
  const [value, setValue] = React.useState('collections');
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const allReqRes = useSelector((state) => state.historyReqRes);
  let currentFolder = useSelector((state) => state.currentReqRes.folder);
  const allHistory = useLiveQuery(async () => {
    return await db.history.toArray();
  });
  console.log('allHistory', allHistory);

  // get all folders and requests from db, filter requests by current folder
  const allRequests = useLiveQuery(async () => {
    return await db.collections.toArray();
  });

  if (!allRequests || !allHistory) {
    return <div>Loading...</div>;
  } else {
    // wait for allRequests to be populated, then filter by current folder
    const requests = allRequests.filter(
      (request) => request.folder === currentFolder
    );
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
            <FolderSelect />
            <Card sx={{ display: 'flex', bgcolor: 'transparent' }}>
              <FormDialog action="add">Add Folder</FormDialog>
              <Button
                variant="outlined"
                startIcon={<BackspaceOutlinedIcon />}
                onClick={() => {
                  db.collections.where('folder').equals(currentFolder).delete();
                }}
              >
                Clear Folder
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  db.collections.where('folder').equals(currentFolder).delete();
                  db.folder.where('name').equals(currentFolder).delete();
                  const folders = getFoldersFromDB();
                  if (folders.length > 0) {
                    dispatch(setFolder(folders[0]));
                  } else {
                    dispatch(setFolder(''));
                  }
                }}
              >
                Remove Folder
              </Button>
            </Card>

            {requests.map((request) => {
              return <HistoryBlock key={request.id} reqResInfo={request} />;
            })}
          </TabPanel>
          <TabPanel value="schedule"></TabPanel>
          <TabPanel value="history">
            {allHistory.map((request) => {
              return (
                <TimeBlock
                  key={request.id}
                  reqResInfo={request}
                  time={request.created_at}
                />
              );
            })}
          </TabPanel>
        </TabContext>
      </Box>
    );
  }
}
