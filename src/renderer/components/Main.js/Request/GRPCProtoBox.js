import React from 'react';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { materialDark } from '@uiw/codemirror-theme-material';
import { useSelector, useDispatch } from 'react-redux';
import { setVariables } from '../../../state/currentReqRes';

export default function GRPCProtoBox() {
  const reqState = useSelector((state) => state.currentReqRes);

  const dispatch = useDispatch();

  // convert the body type to the correct language extension
  // Also a hack to get the text/plain content type to work
  let languageExtensionConverter = {
    'application/javascript': javascript(),
  };

  return (
    <Box>
      <Typography variant="h5"> Service Definition </Typography>
      <CodeMirror
        extensions={[
          languageExtensionConverter['application/javascript'],
          EditorView.lineWrapping,
        ]}
        placeholder="Import your proto file"
        value={reqState.filedata}
        readOnly={true}
        theme={materialDark}
        minWidth="100%"
        maxHeight="40px"
      ></CodeMirror>
    </Box>
  );
}
