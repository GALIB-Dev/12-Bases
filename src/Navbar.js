import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import SpinLogo from './Spin.png';
import FrontLogo from './Logo.png';
import { FaHome, FaBullhorn, FaComments, FaEnvelope, FaBolt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/updates', label: 'Updates', icon: <FaBullhorn /> },
    { path: '/ChatLogin', label: 'Forum', icon: <FaComments /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
    { path: '/services', label: 'Services', icon: <FaBolt /> }
  ];

  return (
    <nav>
      <Link to="/" className="logo-container">
        <div className="logo-wrapper">
          <img 
            src={FrontLogo} 
            alt="Back Logo" 
            className="back-logo" 
          />
          <img 
            src={SpinLogo} 
            alt="Spinning Logo" 
            className="logo" 
          />
        </div>
        <div className="brand-text">
          <span className="brand-number">XII</span>
          <span className="brand-name">BASES</span>
        </div>
      </Link>

      {/* Only show menu button on mobile */}
      {isMobile && (
        <button 
          className={`menu-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </button>
      )}

      <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
        {navItems.map(({ path, label, icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu overlay */}
      {isMobile && isOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
