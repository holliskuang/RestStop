import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
export default function Header(props) {
  return (
    <Box>
      <Checkbox 
      onChange={(event)=> {props.handleCheck(props.id,event)}}></Checkbox>
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
