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
import HeaderBox from './HeaderBox';
import { v4 as uuid } from 'uuid';
import ReqBodyTextBox from './ReqBodyTextBox';
import ReqBodyTextBoxSelector from './ReqBodyTextBoxSelector';

export default function Request() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.request);
  const api = window.api.ipcRenderer;

  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    event.preventDefault();
    let reqResObj = {};
    reqResObj.id = uuid();
    reqResObj.url = retrieveUrl();
    reqResObj.method = retrieveMethod();
    reqResObj.headers = retrieveHeaders();
    const hi = await api.invoke('fetch', reqResObj);
    console.log(hi);
  }

  // retrieve checked headers from redux and return as object
  const retrieveHeaders = () => {
    const headers = {};
    Object.keys(reqState.headers).forEach((id) => {
      if (reqState.headers[id].checked) {
        headers[reqState.headers[id].key] = reqState.headers[id].value;
      }
    });
    headers['Content-Type'] = 'application/json';
    return JSON.stringify(headers);
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

  /// handle change in text box update redux
  const textBoxHandleChange = (event) => {
    dispatch(setReqBody(event.target.value));
  }

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
        <ReqBodyTextBoxSelector/>
        <ReqBodyTextBox 
          onChange={textBoxHandleChange}
        
          value={reqState.reqBody}
        />
      </FormControl>
    </div>
  );
}
