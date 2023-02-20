import React from 'react';
import { useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
import { ipcRenderer } from 'electron';
import { setResponse } from 'renderer/state/currentReqRes';
import { Box, Typography } from '@mui/material';

export default function WSResponse() {
  const api = window.api.ipcRenderer;
  const [message, setMessage] = React.useState('');
  const [chatLogState, setChatLogState] = React.useState([]);
  const reqResObj = useSelector((state) => state.currentReqRes.response);
  const lightMode = useSelector((state) => state.light.mode);
  /* Array that is mapped , following below format: pos, type,text,time */

  let dataFiller = [];
  if (reqResObj.chatLog) {
    dataFiller = reqResObj.chatLog.map((message) => {
      return {
        position: message[2] === 'server' ? 'left' : 'right',
        type: 'text',
        text: message[0],
        date: message[1],
      };
    });
  }

  React.useEffect(() => {
    setChatLogState(dataFiller);
  }, [reqResObj]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        typography: 'body1',
        pr: '2.5%',
        pl: '2.5%',
        overflowY: 'scroll',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={{ m: '1.5%', color: lightMode === 'dark' ? 'white' : 'black' }}
        >
          Response
        </Typography>
      </Box>
      <Box
        sx={{
          m: '1%',
          overflowY: 'auto',
          borderRadius: '10px',
          borderStyle: 'solid',
          borderColor: lightMode === 'dark' ? 'white' : 'black',
          borderWidth: '1px',
          height: '60%',
        }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          dataSource={chatLogState}
          messageBoxStyles={{
            backgroundColor: 'whitesmoke',
            color: 'black',
          }}
          notchStyle={{ fill: 'whitesmoke' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          placeholder="Type here..."
          multiline={true}
          maxHeight={60}
          onChange={() => {
            setMessage(event.target.value);
          }}
        />
        <Button
          text={'Send'}
          onClick={() => {
            console.log('sending object', reqResObj);
            api.send('clientMessage', message, reqResObj);
          }}
          title="Send"
          sx={{ alignSelf: 'flex-end', fontSize: '20px' }}
        />
      </Box>
    </Box>
  );
}
