import { setFolder } from '../../../state/currentReqRes';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getFoldersFromDB } from './DashboardController';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db';

export default function FolderSelect() {
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  const folders = useLiveQuery(async () => {
    return await db.folder.toArray();
  });
  console.log(folders);
  if (folders != undefined) {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Current Folder</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Current Folder"
          onClick={(e) => {
            setFolder(e.target.value);
          }}
          value={currentFolder}
        >
          {folders.map((folder) => {
            return (
              <MenuItem key={folder.id} value={folder.name}>
                {folder.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}
