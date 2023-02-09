import React from 'react';
import { useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
import { ipcRenderer } from 'electron';

export default function WSResponse() {
  const api = window.api.ipcRenderer;
  const [message, setMessage] = React.useState('');
  /* Array that is mapped , following below format: pos, type,text,time */

  return (
    <div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={[
          {
            position: 'left',
            type: 'text',
            text: 'Hi, how are you?',
            date: new Date(),
          },
          {
            position: 'right',
            type: 'text',
            text: 'good',
            date: new Date(),
          },
        ]}
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
          console.log(message);
          api.send('clientMessage', message);
        }}
        title="Send"
      />
    </div>
  );
}
