import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import './ChatList.css';

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    // Set up a query to get all messages
    const q = query(collection(db, 'messages'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Extract unique usernames from messages
        const uniqueUsers = [
          ...new Set(snapshot.docs.map((doc) => doc.data().user)),
        ];
        setUsers(uniqueUsers);
        setLoading(false); // Set loading to false when data is loaded
      },
      (err) => {
        console.error('Error fetching user list:', err);
        setError('Could not load users'); // Set error message
        setLoading(false);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading users...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>; // Display error message
  }

  return (
    <div className="chat-list">
      {users.length === 0 ? (
        <p className="no-users-text">No users available</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index} className="user-item">{user}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
