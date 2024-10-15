import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists
import SpinLogo from './Spin.png'; // Import the spinning logo
import FrontLogo from './Logo.png'; // Import the back logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={FrontLogo} alt="Back Logo" className="back-logo" /> {/* Back logo */}
        <img src={SpinLogo} alt="Spinning Logo" className="logo" /> {/* Front logo */}
        <p>
          <span style={{ color: 'red' }}> <b>Ⅻ</b></span> 𝘽𝘼𝙎𝙀𝙎
       </p>

      </div>
      <button 
        className={`menu-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu" 
        aria-expanded={isOpen}
      >
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </button>
      <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/updates">Updates</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
