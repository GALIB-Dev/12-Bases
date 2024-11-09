import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import './ChatMessages.css';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp);
        return { ...data, timestamp };
      });
      setMessages(messageList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="loading">Loading messages...</p>;
  }

  // Function to format the message text and make URLs clickable
  const formatMessage = (message) => {
    const messageText = message.text || ""; // Ensure we have a string, even if undefined
    
    // Regular expression to detect URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Replace URLs with anchor tags
    return messageText.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  };

  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        <p className="no-messages">No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message-item">
              <p>
                <strong>{message.user || "Unknown User"}:</strong>{" "}
                {formatMessage(message)}
              </p>
              <small>{message.timestamp?.toLocaleString() || "No timestamp available"}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
