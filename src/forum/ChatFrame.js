import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, limit, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckDouble, FaArrowDown, FaThumbsUp, FaHeart, FaLaugh, FaAngry, FaSadTear, FaCommentDots } from 'react-icons/fa';
import ChatControls from './ChatControls';
import './ChatFrame.css';

// Animation variants for smoother transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const ChatFrame = ({ username = "Guest" }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showReactionMenu, setShowReactionMenu] = useState(null);

  const reactions = React.useMemo(() => [
    { icon: <FaThumbsUp />, name: 'like', label: 'Like' },
    { icon: <FaHeart />, name: 'love', label: 'Love' },
    { icon: <FaLaugh />, name: 'laugh', label: 'Laugh' },
    { icon: <FaSadTear />, name: 'sad', label: 'Sad' },
    { icon: <FaAngry />, name: 'angry', label: 'Angry' }
  ], []);

  // Progress bar animation for loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [loading]);

  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollTop } = containerRef.current;
    const isNearTop = scrollTop < 100;
    setShowScrollButton(!isNearTop);
    
    if (!isNearTop) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  const checkFirebaseConnection = useCallback(async () => {
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
  }, []);

  const handleReaction = useCallback(async (messageId, reactionName) => {
    try {
      const messageRef = doc(db, 'messages', messageId);
      
      // Check if user already reacted with this reaction
      const message = messages.find(msg => msg.id === messageId);
      const existingReaction = message.reactions?.find(
        r => r.user === username && r.name === reactionName
      );
      
      if (existingReaction) {
        // Remove reaction
        await updateDoc(messageRef, {
          reactions: arrayRemove({
            user: username,
            name: reactionName,
            timestamp: existingReaction.timestamp
          })
        });
      } else {
        // Add reaction
        await updateDoc(messageRef, {
          reactions: arrayUnion({
            user: username,
            name: reactionName,
            timestamp: new Date().toISOString()
          })
        });
      }
      
      setShowReactionMenu(null);
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  }, [messages, username]);

  const simulateTypingIndicator = useCallback(() => {
    // This is a simulation. In a real app, you would use a collection to track typing status
    const randomUserIndex = Math.floor(Math.random() * 3);
    const typingUser = ['Alice', 'Bob', 'Charlie'][randomUserIndex];
    
    if (typingUser !== username && !typingUsers.includes(typingUser)) {
      setTypingUsers(prev => [...prev, typingUser]);
      
      // Clear typing indicator after random time
      setTimeout(() => {
        setTypingUsers(prev => prev.filter(user => user !== typingUser));
      }, 2000 + Math.random() * 3000);
    }
  }, [username, typingUsers]);

  const initializeChat = useCallback(async () => {
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
            timestamp: doc.data().timestamp?.toDate() || new Date(doc.data().createdAt),
            reactions: doc.data().reactions || []
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        console.log('Fetched messages:', messageList);
        
        // Add a slight delay for smoother transition
        setTimeout(() => {
          setMessages(messageList);
          setLoading(false);
        }, 500);
        
        // Occasionally simulate typing
        if (Math.random() > 0.7) {
          simulateTypingIndicator();
        }
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
  }, [checkFirebaseConnection, simulateTypingIndicator]);

  useEffect(() => {
    initializeChat();
    
    // Simulate occasional typing
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        simulateTypingIndicator();
      }
    }, 10000);
    
    return () => clearInterval(typingInterval);
  }, [initializeChat, simulateTypingIndicator]);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
      
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  // Format message text with emojis and links
  const formatMessage = useCallback((message) => {
    if (!message.text) return '';
    
    // Link detection regex
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    
    // Replace links with anchor tags
    const textWithLinks = message.text.replace(linkRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    
    // Create spans with text and links
    return <span dangerouslySetInnerHTML={{ __html: textWithLinks }} />;
  }, []);

  // Format time for message display
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  // Render message reactions
  const renderReactions = useCallback((message) => {
    if (!message.reactions || message.reactions.length === 0) {
      return null;
    }
    
    // Group reactions by type
    const reactionCounts = {};
    message.reactions.forEach(reaction => {
      if (!reactionCounts[reaction.name]) {
        reactionCounts[reaction.name] = {
          count: 0,
          users: []
        };
      }
      reactionCounts[reaction.name].count += 1;
      reactionCounts[reaction.name].users.push(reaction.user);
    });
    
    return (
      <div className="message-reactions">
        {Object.entries(reactionCounts).map(([name, data]) => {
          const reaction = reactions.find(r => r.name === name);
          const userReacted = data.users.includes(username);
          
          return (
            <div 
              key={name} 
              className={`reaction-badge ${userReacted ? 'user-reacted' : ''}`}
              title={`${data.users.join(', ')}`}
            >
              <span className="reaction-icon">{reaction?.icon}</span>
              <span className="reaction-count">{data.count}</span>
            </div>
          );
        })}
      </div>
    );
  }, [reactions, username]);

  const renderMessage = useCallback((message, index) => {
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
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: index * 0.05 // Staggered delay based on index
          }}
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
              {renderReactions(message)}
              <button 
                className="message-reaction-button"
                onClick={() => setShowReactionMenu(showReactionMenu === message.id ? null : message.id)}
                aria-label="Add reaction to message"
                aria-expanded={showReactionMenu === message.id}
              >
                <span aria-hidden="true">😊</span>
              </button>
              
              {showReactionMenu === message.id && (
                <div className="reaction-menu">
                  {reactions.map(reaction => (
                    <button
                      key={reaction.name}
                      className="reaction-button"
                      onClick={() => handleReaction(message.id, reaction.name)}
                      title={reaction.label}
                    >
                      {reaction.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </React.Fragment>
    );
  }, [formatMessage, formatTime, handleReaction, messages, reactions, renderReactions, showReactionMenu, username]);

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
      transition={{ duration: 0.5 }}
    >
      <div className="chat-container">
        <div className="chat-main">
          <div className="chat-content">
            <div 
              className="chat-messages" 
              ref={containerRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    className="loading-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="loading-progress-bar" 
                      initial={{ width: '0%' }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="loading-spinner"></div>
                    <p>Loading messages</p>
                    <motion.div 
                      className="loading-hint"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      <FaCommentDots /> Connecting to chat server...
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="messages"
                    className="message-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {messages.map(renderMessage)}
                    {typingUsers.length > 0 && (
                      <motion.div 
                        className="typing-indicator" 
                        aria-live="polite"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="typing-bubble">
                          <div className="typing-dots" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="typing-text">
                            {typingUsers.length === 1 
                              ? `${typingUsers[0]} is typing...` 
                              : `${typingUsers.length} people are typing...`}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <motion.button 
                className="scroll-top-button"
                onClick={scrollToTop}
                aria-label={`Scroll to top. ${unreadCount > 0 ? `${unreadCount} new messages` : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowDown />
                {unreadCount > 0 && (
                  <span className="unread-count" aria-hidden="true">{unreadCount}</span>
                )}
              </motion.button>
            )}
          </div>

          <ChatControls 
            username={username}
            onNewMessage={scrollToTop}
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
      </div>
    </motion.div>
  );
};

export default ChatFrame;
