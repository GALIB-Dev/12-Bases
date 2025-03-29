import React, { useState, useRef, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { FaRegSmile, FaPaperPlane } from 'react-icons/fa';
import './ChatControls.css';

const ChatControls = ({ username, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = [
    '😊', '😂', '🥰', '😍', '🤔', '👍', '❤️', '✨', 
    '🎉', '🔥', '👋', '😅', '🙌', '💪', '🙏', '💯',
    '🌟', '💫', '🎈', '🎨', '💻', '📱', '💡', '⭐'
  ];

  const checkFirebaseConnection = async () => {
    if (!db) {
      console.log('Firebase db is not properly initialized');
      return false;
    }
    
    try {
      const testRef = collection(db, 'test');
      await getDocs(testRef);
      console.log('Connected to Firebase');
      return true;
    } catch (error) {
      console.error('Error connecting to Firebase:', error);
      return false;
    }
  };

  useEffect(() => {
    checkFirebaseConnection();
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojis(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);
      const messagesRef = collection(db, 'messages');
      
      const newMessage = {
        text: message.trim(),
        user: username || 'Anonymous',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      };

      await addDoc(messagesRef, newMessage);
      setMessage('');
      if (onNewMessage) onNewMessage();
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
      setShowEmojis(false);
      inputRef.current?.focus();
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
          onClick={() => setShowEmojis(prev => !prev)}
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
