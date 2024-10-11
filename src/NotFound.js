// src/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Add custom styling for the advanced 404 page

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="overlay">
        <h1 className="animated-text">404</h1>
        <p className="animated-subtext">কাজ ⚒️ চলতিছে !</p>
        <Link to="/" className="home-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
