import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import checkPageStatus from "../utils/functions"

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      //Here it is 👇🏻
      checkPageStatus(data.text, data.name)

      setMessages([...messages, data])
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
