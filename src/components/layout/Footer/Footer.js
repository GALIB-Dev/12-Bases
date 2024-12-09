import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>12 Bases Technology Ltd.</h3>
          <p>Joypurhat, Rajshahi, Bangladesh</p>
          <p>Phone: <a href="tel:+8801785904899">+880 178 590 4899</a></p>
          <p>Email: <a href="mailto:mohammadalgalib71@gmail.com">mohammadalgalib71@gmail.com</a></p>
        </div>

        <div className="footer-section">
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/updates">Updates</Link></li>
            
           
            <li>
              <div className="footer-links">
                <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                <a href="/contact">Contact</a>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <div className="social-links">
            <a href="https://facebook.com/12bases" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/12bases" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/12bases" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/12bases" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://instagram.com/12bases" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} 12 Bases Technology Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;