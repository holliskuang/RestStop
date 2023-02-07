import React from 'react';
import { useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';

export default function WSResponse() {
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
      <Input placeholder="Type here..." multiline={true} />
      <Button text={'Send'} onClick={() => alert('Sending...')} title="Send" />;
    </div>
  );
}