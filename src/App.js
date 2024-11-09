import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
import Updates from './Updates';
import Contact from './Contact';
import Services from './Services';
import Home from './Home';
import Loading from './Loading';
import NotFound from './NotFound';
import ChatLogin from './ChatLogin';
import Rule from './forum/Rule';  // Correct path to Rule.js
import ChatFrame from './forum/ChatFrame'; // Main forum chat component
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Import Firebase configuration
import './forum/firebase';

function App() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Retrieve username from localStorage

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);  // Store username in localStorage
    }
  }, [username]);  // Save to localStorage whenever the username changes

  return (
    <div className="App">
      <Router>
        {loading ? (
          <Loading />  // Show loading screen
        ) : (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/Rule" component={Rule} /> 
              
              <Route
                path="/chatlogin"
                element={<ChatLogin setUsername={setUsername} />} // Pass setUsername to ChatLogin
              />
              <Route
                path="/forum"
                element={<ChatFrame username={username} />} // Pass username to ChatFrame
              />
              <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
