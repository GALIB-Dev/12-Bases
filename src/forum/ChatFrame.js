import React from 'react';
import ChatMessages from './ChatMessages';
import ChatControls from './ChatControls';
import './ChatFrame.css';

const ChatFrame = ({ username = "Guest" }) => { // Default username as "Guest"
  return (
    <div className="chat-frame">
      <ChatControls username={username} /> {/* Pass username to ChatControls */}
      <div className="chat-content">
        <div className="chat-right">
          <ChatMessages /> {/* Display messages for selected user */}
        </div>
      </div>
    </div>
  );
};

export default ChatFrame;
