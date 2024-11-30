import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';
import './ChatList.css';

const ChatList = ({ onUserSelect, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userMap = new Map();
        
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.user && !userMap.has(data.user)) {
            userMap.set(data.user, {
              name: data.user,
              lastMessage: data.text,
              timestamp: data.timestamp?.toDate() || new Date(data.createdAt),
              isOnline: true
            });
          }
        });

        const userList = Array.from(userMap.values())
          .sort((a, b) => b.timestamp - a.timestamp);

        setUsers(userList);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Setup error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="chat-list-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="chat-list-header">
        <h3>Active Users</h3>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="chat-list-loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="chat-list-error">
          <p>{error}</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="chat-list">
            {filteredUsers.length === 0 ? (
              <p className="no-users-text">No users found</p>
            ) : (
              <motion.ul className="user-list">
                {filteredUsers.map((user) => (
                  <motion.li
                    key={user.name}
                    className={`user-item ${selectedUser === user.name ? 'selected' : ''}`}
                    onClick={() => onUserSelect(user.name)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="user-avatar">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="user-info">
                      <div className="user-name">
                        {user.name}
                        <span className={`status-dot ${user.isOnline ? 'online' : 'offline'}`}>
                          <FaCircle />
                        </span>
                      </div>
                      <div className="last-message">{user.lastMessage}</div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default ChatList;
