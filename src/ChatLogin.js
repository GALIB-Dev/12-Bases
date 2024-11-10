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
      navigate('/forum');      // Navigate to the chat room
    } else {
      alert('Please enter a nickname');
    }
  };

  return (
    <div className="chat-login-wrapper">
      <div className="chat-login-container">
        <h2>Enter Chat Room</h2>
        <input
          type="text"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <button onClick={handleEnterChat}>Enter Chat</button>

        {/* Room Rules Section */}
        <div className="room-rules">
          <h3>Room Rules</h3>
          <ul>
            <li>Be respectful to all members.</li>
            <li>No spamming or advertising.</li>
            <li>Keep language clean and appropriate.</li>
            <li>Stay on topic and avoid off-topic discussions.</li>
            <li>Report any abusive behavior to moderators.</li>
          </ul>
          <p>By entering, you agree to follow these rules for a positive and enjoyable chat experience.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatLogin;
