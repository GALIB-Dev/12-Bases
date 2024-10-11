import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
        className="menu-button" 
        onClick={toggleMenu}
        aria-label="Toggle menu" 
        aria-expanded={isOpen}
      >
        ☰
      </button>
      <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li> {/* Use Link for client-side routing */}
        <li><Link to="/updates">Updates</Link></li>
        <li><Link to="/contact">Contact</Link></li> {/* Consistent casing */}
        <li><Link to="/service">Resources</Link></li> {/* Consistent casing */}
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
