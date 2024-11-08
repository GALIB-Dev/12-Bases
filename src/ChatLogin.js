import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './ChatLogin.css';

const ChatLogin = () => {
  const [nickname, setNickname] = useState('');
  const userCount = 11;  // Static user count
  const navigate = useNavigate();  // Initialize navigate

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEnterChat = () => {
    if (nickname) {
      console.log(`Nickname: ${nickname}`);
      navigate('/forum');  // Navigate to the main chat page
    } else {
      alert('Please enter a nickname');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEnterChat();
    }
  };

  return (
    <div className="chat-login-container">
      <div className="welcome-text">
        Welcome to the 12-basis chat! Try /rules or /help, and send suggestions or report issues.
      </div>
      <div className="login-box">
        <img src="your-image.jpg" alt="Chat Background" className="background-image" />
        <div className="card">
          <input
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={handleNicknameChange}
            onKeyDown={handleKeyDown} // Trigger Enter key event
          />
          <button onClick={handleEnterChat}>Enter Chat</button>
        </div>
        <div className="user-count">Users in room: {userCount}</div>
        <div className="rules">Please follow the rules.</div>
        <div className="note">"Stay respectful and enjoy!"</div>
        <div className="link"><a href="/report">Report issues</a></div>
      </div>
    </div>
  );
};

export default ChatLogin;
