import React from 'react';
import { useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
import { Box, Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import { setResponse } from 'renderer/state/currentReqRes';
import { useDispatch } from 'react-redux';
import { setGRPCChatLog } from 'renderer/state/currentReqRes';

export default function GRPCResponse() {
  const api = window.api.ipcRenderer;
  const [message, setMessage] = React.useState('');
  const [chatLogState, setChatLogState] = React.useState([]);
  const reqResObj = useSelector((state) => state.currentReqRes.response);
  const dispatch = useDispatch();
  const chatLog = useSelector((state) => state.currentReqRes.gRPCChatLog);
  const service = useSelector((state) => state.currentReqRes.service);
  const lightMode = useSelector((state) => state.light.mode);
  console.log('service', service);
  /* Array that is mapped , following below format: pos, type,text,time */

  let dataFiller = [];

  dataFiller = chatLog.map((message) => {
    return {
      position: message[2] === 'server' ? 'left' : 'right',
      type: 'text',
      text: message[0],
      date: message[1],
    };
  });

  React.useEffect(() => {
    setChatLogState(dataFiller);
  }, [chatLog]);

  return (
    // div with max Height of 200px

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
          sx={{
            mt: '2.5%',
            ml: '2.5%',
            color: lightMode === 'dark' ? 'white' : 'black',
          }}
        >
          Response
        </Typography>
      </Box>
      <Box
        sx={{
          m: '1%',
          overflowY: 'auto',
          borderStyle: 'solid',
          borderColor: lightMode === 'dark' ? 'white' : 'black',
          borderWidth: '1px',
          height: '60%',
          borderRadius: '10px',
        }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={chatLogState}
          messageBoxStyles={{
            backgroundColor: 'whitesmoke',
            color: 'black',
          }}
          notchStyle={{ fill: 'whitesmoke' }}
        />
      </Box>

      <Input
        placeholder="Type here..."
        multiline={true}
        maxHeight={60}
        value={message}
        onChange={() => {
          setMessage(event.target.value);
        }}
      />
      {/* Button that appears for client Streaming Methods to end the stream*/}
      {(service.type === 'CLIENT STREAM' ||
        service.type === 'BIDIRECTIONAL') && (
        <Button
          text={'End Stream'}
          onClick={() => {
            api.send('gRPCEndStreaming');
          }}
          title="End Stream"
        />
      )}
      <Button
        text={'Send'}
        onClick={() => {
          let newChatLog = [...chatLog];
          newChatLog.push([message, new Date(), 'client']);
          dispatch(setGRPCChatLog(newChatLog));
          try {
            api.send('grpcClientMessage', service, JSON.parse(message));
            console.log('grpc Called');
          } catch (e) {
            api.send('grpcClientMessage', service, message);
          }
        }}
        title="Send"
      />
    </Box>
  );
}
