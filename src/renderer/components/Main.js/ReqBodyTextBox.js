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

export default function ReqBodyTextBox() {
  const reqState = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const value = reqState.reqBody;
  const bodyType = reqState.bodyType;
  // convert plain to xml for codeMirror functionality
  console.log(bodyType);
  const lang = bodyType.substring(bodyType.indexOf('/') + 1);
  return (
    <Box>
      <Typography variant="h5"> Request Body</Typography>
      <Typography> Content Type</Typography>
      <CodeMirror
        extensions={[lang(), EditorView.lineWrapping]}
        placeholder="Enter body here"
        value={value}
        readOnly={false}
        theme={materialDark}
        onChange={(event) => {
          dispatch(setReqBody(event.value));
        }}
      ></CodeMirror>
    </Box>
  );
}
