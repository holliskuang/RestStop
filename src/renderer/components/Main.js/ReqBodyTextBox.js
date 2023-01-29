import React from 'react';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';
import { materialDark } from '@uiw/codemirror-theme-material';
import { useSelector, useDispatch } from 'react-redux';
import { setBody } from 'renderer/state/requestSlice';

export default function ReqBodyTextBox() {
  const reqState = useSelector((state) => state.request);
  const dispatch = useDispatch();
  let value = reqState.reqBody;
  let bodyType = reqState.bodyType;
  if (bodyType === 'plain') {
    bodyType = 'xml';
  }
  let languageExtensionConverter = {
    xml: xml(),
    html: html(),
    json: json(),
    javascript: javascript(),
  };
  return (
    <Box>
      <Typography variant="h5"> Request Body</Typography>
      <Typography> Content Type</Typography>
      <CodeMirror
        extensions={[
          languageExtensionConverter[bodyType],
          EditorView.lineWrapping,
        ]}
        placeholder="Enter body here"
        value={value}
        readOnly={false}
        theme={materialDark}
        onChange={(event) => {
          dispatch(setBody(event.value));
        }}
      ></CodeMirror>
    </Box>
  );
}
