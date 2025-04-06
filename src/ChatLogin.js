import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatLogin.css';

const ChatLogin = ({ setUsername }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEnterChat = () => {
    if (!nickname) {
      setError('Please enter a nickname');
      return;
    }
    if (password !== 'GTA25') {
      setError('Incorrect password');
      return;
    }
    setUsername(nickname);
    localStorage.setItem('username', nickname);
    navigate('/forum');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEnterChat();
  };

  return (
    <div className="chat-login-wrapper">
      <div className="chat-login-container">
        <h2>Enter Chat Room</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={handleNicknameChange}
            autoComplete="username"
            aria-label="Nickname"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            aria-label="Password"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Enter Chat</button>
        </form>

        <div className="room-rules">
          <h3>Room Rules</h3>
          <ul>
            <li>Be respectful to all members</li>
            <li>No spamming or advertising</li>
            <li>Keep language clean and appropriate</li>
            <li>Stay on topic and avoid off-topic discussions</li>
            <li>Report any abusive behavior to moderators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatLogin;
