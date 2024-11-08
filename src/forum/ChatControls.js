import React, { useState } from 'react';
import { db } from './firebase'; // Ensure correct import for Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ChatControls = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); // For the user’s name

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          user: username,
          timestamp: serverTimestamp(), // Use serverTimestamp for Firestore's server-side timestamp
        });
        setMessage(''); // Clear the message input
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your name"
        required
      />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatControls;
