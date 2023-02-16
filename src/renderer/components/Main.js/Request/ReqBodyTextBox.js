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
import { setBody } from 'renderer/state/currentReqRes';
import ReqBodyTextBoxSelector from './ReqBodyTextBoxSelector';

// This is the component that renders the request body text box
// Utilize  the CodeMirror component to render the text box

export default function ReqBodyTextBox() {
  const reqState = useSelector((state) => state.currentReqRes);

  const dispatch = useDispatch();
  let value = reqState.body;
  let bodyType = reqState.bodyType;

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
    <Box
      sx={{
        m: '5%',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h4" sx={{ alignSelf: 'center', mr:'20px' }}>
          Request Body
        </Typography>
        <ReqBodyTextBoxSelector />
      </Box>
      <Box sx={{ width: '100%' }}>
        <CodeMirror
          extensions={[
            languageExtensionConverter[bodyType],
            EditorView.lineWrapping,
          ]}
          placeholder="Enter body here"
          value={reqState.body}
          readOnly={false}
          theme={materialDark}
          height="20vh"
          // onChange event handler is used to update the state of the request body
          onChange={(editor, data, value) => {
            dispatch(setBody(editor.toString()));
          }}
        />
      </Box>
    </Box>
  );
}
