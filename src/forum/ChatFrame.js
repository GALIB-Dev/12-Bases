import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, limit, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaCog, FaBell, FaCheckDouble, FaArrowDown } from 'react-icons/fa';
import ChatControls from './ChatControls';
import ChatList from './ChatList';
import './ChatFrame.css';

const ChatFrame = ({ username = "Guest" }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChatList, setShowChatList] = useState(false);

  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadCount(0);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
    
    if (!isNearBottom) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

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
    const initializeChat = async () => {
      const isConnected = await checkFirebaseConnection();
      console.log('Firebase connection check result:', isConnected);
      
      if (!isConnected) {
        setError('Unable to connect to Firebase. Please check your internet connection and try again.');
        setLoading(false);
        return;
      }
      
      let unsubscribe;

      try {
        console.log('Attempting to fetch messages from Firestore...');
        const messagesRef = collection(db, 'messages');
        const q = query(
          messagesRef, 
          orderBy('timestamp', 'desc'), 
          limit(50)
        );

        setLoading(true);

        unsubscribe = onSnapshot(q, (snapshot) => {
          console.log('Snapshot received:', snapshot.size, 'documents');
          const messageList = snapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate() || new Date(doc.data().createdAt)
            }))
            .sort((a, b) => a.timestamp - b.timestamp);

          console.log('Fetched messages:', messageList);
          setMessages(messageList);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching messages:', error);
          setError('Failed to load messages. Please refresh.');
          setLoading(false);
        });

      } catch (err) {
        console.error('Setup error:', err);
        setError(err.message);
        setLoading(false);
      }

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    };

    initializeChat();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (now.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return messageDate.toLocaleDateString([], { weekday: 'short' }) + ' ' +
             messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const formatMessage = (message) => {
    const messageText = message.text || "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

    const parts = messageText.split(/([\u{1F300}-\u{1F9FF}]|\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu);
    
    return parts.map((part, index) => {
      if (part.match(emojiRegex)) {
        return (
          <span key={index} className="message-emoji" role="img" aria-label="emoji">
            {part}
          </span>
        );
      }
      
      return part.split(urlRegex).map((text, i) => {
        if (urlRegex.test(text)) {
          return (
            <a 
              key={`${index}-${i}`}
              href={text}
              target="_blank"
              rel="noopener noreferrer"
              className="message-link"
            >
              {text}
            </a>
          );
        }
        return <span key={`${index}-${i}`}>{text}</span>;
      });
    });
  };

  const renderMessage = (message, index) => {
    const isCurrentUser = message.user === username;
    const showDate = index === 0 || 
      messages[index - 1].timestamp.toDateString() !== message.timestamp.toDateString();

    return (
      <React.Fragment key={message.id || index}>
        {showDate && (
          <motion.div 
            className="date-separator"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="date-line"></span>
            <span className="date-text">
              {message.timestamp.toLocaleDateString([], { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="date-line"></span>
          </motion.div>
        )}
        <motion.div
          className={`message-item ${isCurrentUser ? 'sent' : 'received'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="message-content">
            {!isCurrentUser && (
              <div className="message-user">
                <span className="user-avatar">{message.user?.[0]?.toUpperCase() || '?'}</span>
                <span className="user-name">{message.user || "Unknown User"}</span>
              </div>
            )}
            <div className="message-bubble">
              <div className="message-text">
                {formatMessage(message)}
              </div>
              <div className="message-meta">
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
                {isCurrentUser && (
                  <span className="message-status">
                    <FaCheckDouble className="status-icon" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </React.Fragment>
    );
  };

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <motion.div 
      className="chat-frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="chat-container">
        <AnimatePresence>
          {showChatList && (
            <motion.div 
              className="chat-list-wrapper"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <ChatList 
                onUserSelect={(user) => {
                  setSelectedUser(user);
                  setShowChatList(false);
                }}
                selectedUser={selectedUser}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="chat-main">
          <div className="chat-header">
            <div className="chat-header-left">
              <h2>Chat Room</h2>
              <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="chat-header-right">
              <button 
                className={`icon-button ${showSettings ? 'active' : ''}`} 
                onClick={() => setShowSettings(!showSettings)}
              >
                <FaCog />
              </button>
              <button 
                className={`icon-button ${showNotifications ? 'active' : ''}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button 
                className={`icon-button ${showChatList ? 'active' : ''}`}
                onClick={() => setShowChatList(!showChatList)}
              >
                <FaUsers />
              </button>
            </div>
          </div>

          <div className="chat-content">
            <div className="chat-messages" ref={containerRef}>
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading messages...</p>
                </div>
              ) : (
                <div className="message-list">
                  {messages.map(renderMessage)}
                </div>
              )}
            </div>

            {showScrollButton && (
              <button 
                className="scroll-top-button"
                onClick={scrollToTop}
              >
                <FaArrowDown style={{ transform: 'rotate(180deg)' }} />
                {unreadCount > 0 && (
                  <span className="unread-count">{unreadCount}</span>
                )}
              </button>
            )}
          </div>

          <ChatControls 
            username={username}
            onNewMessage={scrollToBottom}
            isOnline={isOnline}
          />

          {!isOnline && (
            <motion.div 
              className="offline-indicator"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              You're offline. Messages will be sent when you reconnect.
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {showChatList && (
            <motion.div 
              className="chat-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatList(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatFrame;
