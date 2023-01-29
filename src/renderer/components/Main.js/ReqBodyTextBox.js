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


// This is the component that renders the request body text box
// Utilize  the CodeMirror component to render the text box

export default function ReqBodyTextBox() {
  const reqState = useSelector((state) => state.request);
  const dispatch = useDispatch();
  let value = reqState.body;
  let bodyType = reqState.bodyType;

  // This is a hack to get the xml language extension to work
  if (bodyType === 'plain') {
    bodyType = 'xml';
  }

  // convert the body type to the correct language extension
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
        value={reqState.body}
        readOnly={false}
        theme={materialDark}
        // onChange event handler is used to update the state of the request body
        onChange={(editor, data, value) => {
          dispatch(setBody(editor.toString()));
        }}
      ></CodeMirror>
    </Box>
  );
}
