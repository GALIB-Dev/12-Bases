import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatLogin.css';

const ChatLogin = ({ setUsername }) => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEnterChat = () => {
    if (nickname) {
      setUsername(nickname);  // Set the username in App.js
      localStorage.setItem('username', nickname);  // Store username in localStorage
      navigate('/forum');      // Navigate to chat
    } else {
      alert('Please enter a nickname');
    }
  };

  return (
    <div className="chat-login-container">
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={handleNicknameChange}
      />
      <button onClick={handleEnterChat}>Enter Chat</button>
    </div>
  );
};

export default ChatLogin;
