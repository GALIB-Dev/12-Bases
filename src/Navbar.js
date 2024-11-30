import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaBullhorn, 
  FaComments, 
  FaEnvelope, 
  FaBolt
} from 'react-icons/fa';
import './Navbar.css';
import SpinLogo from './Spin.png';
import FrontLogo from './Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/updates', label: 'Updates', icon: <FaBullhorn /> },
    { path: '/ChatLogin', label: 'Forum', icon: <FaComments /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
    { path: '/services', label: 'Services', icon: <FaBolt /> }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link to="/" className="logo-container">
        <motion.div 
          className="logo-wrapper"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src={FrontLogo} 
            alt="Back Logo" 
            className="back-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img 
            src={SpinLogo} 
            alt="Spinning Logo" 
            className="logo"
            animate={{ 
              rotate: 360,
              transition: {
                rotate: {
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity
                }
              }
            }}
          />
        </motion.div>
        <div className="brand-text">
          <motion.span 
            className="brand-number"
            whileHover={{ scale: 1.1 }}
          >
            XII
          </motion.span>
          <motion.span className="brand-divider">|</motion.span>
          <motion.span 
            className="brand-name"
            whileHover={{ scale: 1.1 }}
          >
            BASES
          </motion.span>
        </div>
      </Link>

      {isMobile && (
        <motion.button 
          className={`menu-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <motion.span 
            className="bar bar1"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="bar bar2"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="bar bar3"
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.ul
            className={`menu-items ${isOpen ? 'open' : ''}`}
            initial={isMobile ? { x: "100%" } : false}
            animate={isMobile ? { x: 0 } : false}
            exit={isMobile ? { x: "100%" } : false}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {navItems.map(({ path, label, icon }, index) => (
              <motion.li
                key={path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={path}
                  className={location.pathname === path ? 'active' : ''}
                >
                  <span className="nav-icon">
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
