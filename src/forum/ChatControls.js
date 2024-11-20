import React, { useState, useRef, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaRegSmile, FaPaperPlane } from 'react-icons/fa';
import './ChatControls.css';

const ChatControls = ({ username, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = [
    '😊', '😂', '🥰', '😍', '🤔', '👍', '❤️', '✨', 
    '🎉', '🔥', '👋', '😅', '🙌', '💪', '🙏', '💯',
    '🌟', '💫', '🎈', '🎨', '💻', '📱', '💡', '⭐'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojis(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const newMessage = {
        text: message.trim(),
        user: username,
        timestamp: serverTimestamp()
      };

      await addDoc(collection(db, 'messages'), newMessage);
      setMessage('');
      setShowEmojis(false);
      onNewMessage && onNewMessage(newMessage);
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-controls-container">
      {showEmojis && (
        <div className="emoji-picker" ref={emojiPickerRef}>
          <div className="emoji-picker-header">
            Quick Reactions
          </div>
          <div className="emoji-grid">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="emoji-button"
                title={`Add ${emoji} emoji`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      <form className="chat-controls" onSubmit={handleSubmit}>
        <button
          type="button"
          className="action-button"
          onClick={() => setShowEmojis(!showEmojis)}
          title="Choose emoji"
        >
          <FaRegSmile />
        </button>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
        </div>
        <button 
          type="submit" 
          className="send-button"
          title="Send message"
          disabled={!message.trim()}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatControls;
