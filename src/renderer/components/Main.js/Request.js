import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Request() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setResponse('');
    fetch(url, {
      method,
      headers: headers
        .split('\n')
        .filter((line) => line.trim() !== '')
        .reduce((headers, line) => {
          const [key, value] = line.split(':');
          return {
            ...headers,
            [key.trim()]: value.trim(),
          };
        }, {}),
      body,
    });
  };
  return (
    <div className="request">
      <FormControl fullWidth>
        <InputLabel id="restReq">GET</InputLabel>
        <Select
          labelId="restReqlabel"
          id="restReq"
          value={useSelector((state) => state.request.method)}
          label="REST"
          onChange={dispatch(setMethod(value))}
        >
          <MenuItem value={GET}>GET</MenuItem>
          <MenuItem value={POST}>POST</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
