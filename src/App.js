import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';  // Added Outlet for nested routes
import NavBar from './Navbar';
import Updates from './Updates';
import Contact from './Contact';
import Services from './Services';
import Home from './Home';
import Loading from './Loading';
import NotFound from './NotFound';
import ChatLogin from './ChatLogin'; 
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Firebase import (ensure firebase is correctly configured)
import './forum/firebase'; 

// Forum Components
import ChatFrame from './forum/ChatFrame';
import ChatControls from './forum/ChatControls';
import ChatMessages from './forum/ChatMessages';
import ChatList from './forum/ChatList';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              <Route path="/chatlogin" element={<ChatLogin />} />

              {/* Forum Page Routes */}
              <Route path="/forum" element={<ChatFrame />}>
                <Route path="controls" element={<ChatControls />} />
                <Route path="messages" element={<ChatMessages />} />
                <Route path="chatlist" element={<ChatList />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
