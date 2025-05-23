import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=w0hz
-----END PGP PUBLIC KEY BLOCK-----
`;

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

        <div className="footer-section pgp-section">
          <h3>PGP Public Key</h3>
          <pre className="pgp-key-plain">{pgpKey}</pre>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} 12 Bases Technology Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;