import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import './ChatMessages.css';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query messages ordered by timestamp in descending order to show new chats at the top
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

  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        <p className="no-messages">No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message-item">
              <p>
                <strong>{message.user}:</strong> {message.text} {/* Display username */}
              </p>
              <small>{message.timestamp.toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
