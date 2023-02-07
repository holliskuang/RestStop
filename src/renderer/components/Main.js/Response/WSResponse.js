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
      >
        <MessageBox
          position="left"
          title="Burhan"
          type="text"
          text="Hi there !"
          date={new Date()}
          replyButton={true}
        />
        <MessageBox
          position="right"
          title="Emre"
          type="meetingLink"
          text="Click to join the meeting"
          date={new Date()}
        />
      </MessageList>
      <Input placeholder="Type here..." multiline={true} />
      <Button text={'Send'} onClick={() => alert('Sending...')} title="Send" />;
    </div>
  );
}
