import React, { useState } from 'react';
import { db } from './firebase'; // Import Firebase configuration
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ChatControls.css';  // Ensure the CSS file is imported

const ChatControls = ({ username }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        // Send message with username and timestamp
        await addDoc(collection(db, 'messages'), {
          user: username,         // Store username with message
          text: message,
          timestamp: serverTimestamp(),  // Server-side timestamp from Firestore
        });
        setMessage(''); // Clear the message input after sending
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <form className="chat-controls" onSubmit={sendMessage}>
      <div className="chat-controls-container">
        <a className='rules-text'href='*'> ~~Respect the rules!~~
        </a>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Articulate your ideas"
          required
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i> {/* FontAwesome send icon */}
        </button>
      </div>
    </form>
  );
};

export default ChatControls;
