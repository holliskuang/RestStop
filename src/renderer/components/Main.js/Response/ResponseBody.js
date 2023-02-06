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
import { setResponse } from 'renderer/state/currentReqRes';

// This is the component that renders the request body text box
// Utilize  the CodeMirror component to render the text box

export default function ResponseBody() {
  const reqState = useSelector((state) => state.currentReqRes);
  const dispatch = useDispatch();
  let value = reqState.response.responseBody;
  let bodyType = reqState.bodyType;
  let api = window.api.ipcRenderer;

  // listen for response from subscription
  api.sub(function (evt, message) {
    console.log(message);

    // update the body whenever a subscription response is received whether it is an update or an error

    dispatch(setResponse({ ...reqState.response, responseBody: `${message}` }));
    
  });

  //if graphql mode is on, convert the JSON body to a string
  if (typeof reqState.responseMode != 'object') {
    value = JSON.stringify(value, null, 2);
  }

  // convert the body type to the correct language extension
  // Also a hack to get the text/plain content type to work
  let languageExtensionConverter = {
    'application/xml': xml(),
    'text/html': html(),
    'application/json': json(),
    'application/javascript': javascript(),
    'text/plain': xml(),
  };

  return (
    <Box>
      <Typography variant="h5"> Response Body</Typography>
      <CodeMirror
        extensions={[
          languageExtensionConverter[bodyType],
          EditorView.lineWrapping,
        ]}
        value={value}
        readOnly={true}
        theme={materialDark}
        maxHeight="300px"
      ></CodeMirror>
    </Box>
  );
}
