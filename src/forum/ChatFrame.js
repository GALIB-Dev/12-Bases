import React from 'react';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';
import ChatControls from './ChatControls';
import './ChatFrame.css';  // Import CSS for styling

const ChatFrame = () => {
  return (
    <div className="chat-frame">
      <ChatList />
      <ChatMessages />
      <ChatControls />
    </div>
  );
};

export default ChatFrame;
