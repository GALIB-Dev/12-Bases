import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
import Updates from './Updates';
import Contact from './Contact';
import Services from './Services';
import Home from './Home';
import Loading from './Loading';
import NotFound from './NotFound'; // Import the NotFound component
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating loading time

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="App">
      <Router>
        {loading ? (
          <Loading /> // Show loading screen while loading
        ) : (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              
              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;  