import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Adjust the path based on the actual location of firebase.js
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Correct import for Firestore's Timestamp class

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Create a query for the "messages" collection, ordered by "timestamp"
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Set up a listener on the "messages" collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert timestamp if necessary
        const timestamp = data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp);
        return { ...data, timestamp };
      });
      setMessages(messageList);
      setLoading(false); // Set loading to false when data is fetched
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading messages...</p>; // Show loading state
  }

  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages yet.</p> // Message when no messages are found
      ) : (
        messages.map((message, index) => (
          <div key={index}>
            <p>
              <strong>{message.user}:</strong> {message.text}
            </p>
            <small>{message.timestamp.toLocaleString()}</small> {/* Format timestamp */}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
