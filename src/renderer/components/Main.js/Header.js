import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Header(props) {
  // if checked==true , retrieve key value

  return (
    <Box>
      <Checkbox onChange={(event)=> {props.handleCheck(props.id,event)}}></Checkbox>
      <TextField
        variant="standard"
        label="Key"
        value={props.headerKey}
        onChange={(event) => {
          props.onChangeKey(props.id, event);
        }}
      ></TextField>
      <TextField
        variant="standard"
        label="Value"
        value={props.value}
        onChange={(event) => {
          props.onChangeValue(props.id, event);
        }}
      ></TextField>
      <IconButton
        onClick={() => {
          props.delete(props.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
