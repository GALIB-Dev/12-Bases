import React, { useState, useRef, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { FaRegSmile, FaPaperPlane, FaPaperclip, FaRegImage, FaRegKeyboard } from 'react-icons/fa';
import './ChatControls.css';
import EmojiPicker from './EmojiPicker';
import { useNotifications } from './Notifications';

const ChatControls = ({ username, onNewMessage, isOnline }) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { notifySuccess, notifyError, notifyInfo } = useNotifications();

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
  
  // Simulating typing indicator - in a real app, you'd use a collection for this
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      
      // Simulate notifying other users that this user is typing
      console.log(`${username} is typing...`);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing indicator after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      console.log(`${username} stopped typing`);
    }, 2000);
  };

  useEffect(() => {
    checkFirebaseConnection();
    
    // Focus input field on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      // Clear typing timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending || !isOnline) return;

    try {
      setIsSending(true);
      const messagesRef = collection(db, 'messages');
      
      const newMessage = {
        text: message.trim(),
        user: username || 'Anonymous',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        reactions: []
      };

      await addDoc(messagesRef, newMessage);
      setMessage('');
      setIsTyping(false);
      notifySuccess('Message sent successfully!');
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (onNewMessage) onNewMessage();
      
      // Provide haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      notifyError('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
      setShowEmojis(false);
      setShowExtras(false);
      inputRef.current?.focus();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    handleTyping();
    setShowEmojis(false);
    inputRef.current?.focus();
  };
  
  const handleImageUpload = () => {
    notifyInfo('Image upload is not implemented in this demo');
    setShowExtras(false);
  };
  
  const handleAttachmentUpload = () => {
    notifyInfo('File upload is not implemented in this demo');
    setShowExtras(false);
  };
  
  const handleKeyDown = (e) => {
    // Send on Enter (but not with Shift+Enter which creates a new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-controls-container">
      {showEmojis && (
        <EmojiPicker 
          onSelectEmoji={handleEmojiSelect} 
          onClose={() => setShowEmojis(false)} 
        />
      )}
      
      {showExtras && (
        <div className="extras-menu">
          <button 
            className="extras-button" 
            onClick={handleImageUpload}
            title="Upload image"
          >
            <FaRegImage />
            <span>Image</span>
          </button>
          <button 
            className="extras-button" 
            onClick={handleAttachmentUpload}
            title="Attach file"
          >
            <FaPaperclip />
            <span>File</span>
          </button>
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
        
        <button
          type="button"
          className="action-button extras-toggle"
          onClick={() => setShowExtras(prev => !prev)}
          title="Add attachment"
        >
          <FaPaperclip />
        </button>
        
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyDown}
            placeholder={isOnline ? "Type a message..." : "You are offline"}
            className="chat-input"
            disabled={!isOnline}
          />
          {isTyping && (
            <span className="typing-status">
              <FaRegKeyboard /> 
            </span>
          )}
        </div>
        <button 
          type="submit" 
          className={`send-button ${!isOnline || !message.trim() ? 'disabled' : ''}`}
          title="Send message"
          disabled={!message.trim() || !isOnline || isSending}
        >
          {isSending ? <span className="send-spinner"></span> : <FaPaperPlane />}
        </button>
      </form>
      
      {message.length > 0 && (
        <div className="character-count" style={{ opacity: message.length > 500 ? 1 : 0.5 }}>
          {message.length}/1000
        </div>
      )}
    </div>
  );
};

export default ChatControls;
