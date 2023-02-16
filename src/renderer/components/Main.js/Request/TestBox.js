import React from 'react';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { materialDark } from '@uiw/codemirror-theme-material';
import { useSelector, useDispatch } from 'react-redux';
import { setTest } from '../../../state/currentReqRes';

export default function TestBox() {
  const reqState = useSelector((state) => state.currentReqRes);

  const dispatch = useDispatch();

  // convert the body type to the correct language extension
  // Also a hack to get the text/plain content type to work
  let languageExtensionConverter = {
    'application/javascript': javascript(),
  };

  return (
    <Box sx={{m:'5%'}}>
      <Typography variant='h4'sx={{
        mb:'10px'
      }}> Test Suite </Typography>
      <CodeMirror
        extensions={[
          languageExtensionConverter['application/javascript'],
          EditorView.lineWrapping,
        ]}
        value={reqState.test}
        readOnly={false}
        theme={materialDark}
        width="100%"
        height='10vh'
        // onChange event handler is used to update the state of the request body
        onChange={(editor, data, value) => {
          dispatch(setTest(editor.toString()));
        }}
      ></CodeMirror>
    </Box>
  );
}
