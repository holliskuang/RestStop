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
  setResponse,
  setResponseMode,
} from '../../../state/currentReqRes.js';
import { Button, TextField } from '@mui/material';
import HeaderBox from './HeaderBox';
import { v4 as uuid } from 'uuid';
import ReqBodyTextBox from './ReqBodyTextBox';
import ReqBodyTextBoxSelector from './ReqBodyTextBoxSelector';
import Response from '../Response/Response';
import { addReqRes } from 'renderer/state/historyReqRes.js';
import { saveRequestToDB } from '../Dashboard/DashboardController.js';
import { db } from 'renderer/db.js';
import TestBox from './TestBox.js';
import chai from 'chai';
import GraphQL from '../Pages/GraphQL.js';
import GQLVariableBox from './GQLVariableBox.js';

export default function Request() {
  const dispatch = useDispatch();
  const reqState = useSelector((state) => state.currentReqRes);
  const api = window.api.ipcRenderer;
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  let assert = chai.assert;

  // Send Object to Main Process, Object gets sent back to Render, back and forth
  async function handleSubmit() {
    dispatch(setResponseMode('GraphQL'));
    console.log('reqState', reqState.responseMode);
    event.preventDefault();
    let reqResObj = {};
    reqResObj.responseMode = reqState.responseMode;
    reqResObj.id = uuid();
    reqResObj.url = retrieveUrl();
    reqResObj.method = retrieveMethod();
    reqResObj.headers = retrieveHeaders();
    reqResObj.body = retrieveBody();
    reqResObj.test = reqState.test;
    reqResObj.variables = retrieveVariables();
    const reqAndRes = await api.invoke('gql', reqResObj);
    dispatch(setResponse(reqAndRes));
    dispatch(addReqRes(reqAndRes));
    saveRequestToDB(reqAndRes.id, reqAndRes, currentFolder);
    console.log(reqAndRes);
    console.log(reqState.responseMode);
  }

  // retrieve variables from redux
  const retrieveVariables = () => {
    const variables = reqState.variables;
    let variablesObj = {};
    if (variables === '') {
      return variablesObj;
    }
    try {
      variablesObj = JSON.parse(variables);
    } catch (e) {
      alert('Invalid JSON');
    }
    return variablesObj;
  };
  // retrieve body from redux
  const retrieveBody = () => {
    const body = reqState.body;
    return body;
  };
  // retrieve checked headers from redux and return as object
  const retrieveHeaders = () => {
    const headers = {};

    Object.keys(reqState.headers).forEach((id) => {
      if (reqState.headers[id].checked && reqState.headers[id].key !== '') {
        headers[reqState.headers[id].key] = reqState.headers[id].value;
      }
    });

    // Determine Context Type Header based on body type
    headers['Content-Type'] = 'application/json'

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

  /// handle change in text box update redux
  const textBoxHandleChange = (event) => {
    dispatch(setReqBody(event.target.value));
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
          <MenuItem value="QUERY">QUERY</MenuItem>
          <MenuItem value="MUTATION">MUTATION</MenuItem>
          <MenuItem value="SUBSCRIPTION">SUBSCRIPTION</MenuItem>
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
        <GQLVariableBox />
        <>
          <ReqBodyTextBox
            onChange={textBoxHandleChange}
            value={reqState.reqBody}
          />
        </>

        <Response></Response>
      </FormControl>
    </div>
  );
}
