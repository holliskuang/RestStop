import React from 'react';
import { useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
import { ipcRenderer } from 'electron';
import { setResponse } from 'renderer/state/currentReqRes';

export default function WSResponse() {
  const api = window.api.ipcRenderer;
  const [message, setMessage] = React.useState('');
  const [chatLogState, setChatLogState] = React.useState([]);
  const reqResObj = useSelector((state) => state.currentReqRes.response);
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
    <div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={chatLogState}
        messageBoxStyles={{ backgroundColor: 'transparent' }}
        notchStyle={{ fill: 'transparent' }}
      />
      <Input
        placeholder="Type here..."
        multiline={true}
        onChange={() => {
          setMessage(event.target.value);
        }}
      />
      <Button
        text={'Send'}
        onClick={() => {
          console.log('sending object', reqResObj);
          api.send('gRPCclientMessage', message, reqResObj);
        }}
        title="Send"
      />
    </div>
  );
}