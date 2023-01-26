import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  setMethod,
  setUrl,
} from 'C:/Users/Hollis/Desktop/RestStop/src/renderer/state/requestSlice.js';
import { Button, TextField } from '@mui/material';
import { setUrl } from 'C:/Users/Hollis/Desktop/RestStop/src/renderer/state/requestSlice.js';
import { transcode } from 'buffer';
import HeaderBox from './HeaderBox';


export default function Request() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const reqState = useSelector((state) => state.request);

  return (
    <div className="request">
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <InputLabel id="restReq">Req</InputLabel>
        <Select
          labelId="restReqlabel"
          id="restReq"
          value={reqState.method}
          label="REST"
          onChange={(event) => {
            dispatch(setMethod(event.target.value));
          }}
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
          <MenuItem value="PATCH">PATCH</MenuItem>
          <MenuItem value="DELETE">DELETE</MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          placeholder="https://example.com"
          value={reqState.url}
          onChange={(event) => {
            dispatch(setUrl(event.target.value));
          }}
        ></TextField>
        <Button
          variant="outlined"
          type="submit"
          sx={{
            color: 'white',
          }}
        >
          Submit Request
        </Button>

        <HeaderBox/>
      </FormControl>
    </div>
  );
}
