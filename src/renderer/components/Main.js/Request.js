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
  const reqState = useSelector((state) => state.request);

  async function handleSubmit() {
   
    event.preventDefault();
    const url=retrieveUrl();
    const method=retrieveMethod();
    const headers=JSON.stringify(retrieveHeaders());
    console.log(headers);
  const response = await fetch(retrieveUrl(), {
      method: retrieveMethod(),
    });
    const data = await response.json();
    console.log(data); // JSON data parsed by `data.json()` call
  }

  // retrieve checked headers from redux and return as object
  const retrieveHeaders = () => {  
    const headers = {};
    Object.keys(reqState.headers).forEach((id) => {
      if (reqState.headers[id].checked) {
        headers[reqState.headers[id].key] = reqState.headers[id].value;
      }
    });

    return headers;
  };
  // retrieve url from redux
  const retrieveUrl = () => {
    const url = reqState.url;
    return url;
  };
  // retrieve method from redux
  const retrieveMethod = () => {
    const method = reqState.method;
    return method;
  };

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
          onClick={handleSubmit}
        >
          Submit Request
        </Button>

        <HeaderBox />
      </FormControl>
    </div>
  );
}
