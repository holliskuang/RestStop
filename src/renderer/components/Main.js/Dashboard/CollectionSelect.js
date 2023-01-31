import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { setFolder } from '../../../state/currentFolder.js';
import getFoldersFromDB from './DashboardController.js';

export default function CollectionSelect() {
  const currentFolder = useSelector((state) => state.currentFolder.folder);
  const dispatch = useDispatch();
  return(
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Collection</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentFolder}
        onChange={(e) => {dispatch(setFolder(e.target.value))}}
      >
      {getFoldersFromDB().map((folder) => {return(<MenuItem value={folder}>{folder}</MenuItem>)})}
   
      </Select>
    </FormControl>
  </Box>;
  );
}
