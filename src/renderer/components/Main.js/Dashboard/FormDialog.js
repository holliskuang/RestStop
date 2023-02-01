import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { addFolderToDB } from './DashboardController';
import { v4 as uuid } from 'uuid';
import { db } from 'renderer/db';

export default function FormDialog(props) {
  // Action influences the dialog and the button text
  let action = props.action;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function handleClose(input) {
    setOpen(false);
    if (input === 'add') {
      // Add folder to database
      addFolderToDB(value);
    }
    setValue('');
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
        New Folder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name the Folder you would like to add to your collections.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('cancel')}>Cancel</Button>
          <Button onClick={() => handleClose('add')}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
