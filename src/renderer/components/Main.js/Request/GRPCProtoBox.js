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

  let languageExtensionConverter = {
    'application/javascript': javascript(),
  };

  return (
    <Box sx={{ m: '5%' }}>
      <Typography variant="h4"> Service Definition </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          mt: '1%',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <CodeMirror
            extensions={[
              languageExtensionConverter['application/javascript'],
              EditorView.lineWrapping,
            ]}
            placeholder="Import your proto file"
            value={reqState.filedata}
            readOnly={true}
            theme={materialDark}
            height="20vh"
          />
        </Box>
      </Box>
    </Box>
  );
}
