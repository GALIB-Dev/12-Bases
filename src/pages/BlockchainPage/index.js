import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaNetworkWired, 
  FaCubes, 
  FaExchangeAlt, 
  FaPaintBrush,
  FaShieldAlt 
} from 'react-icons/fa';
import './BlockchainPage.css';

const BlockchainPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCubes />,
      title: 'Smart Contracts',
      description: 'Secure, automated contract execution on the blockchain'
    },
    {
      icon: <FaExchangeAlt />,
      title: 'DeFi Solutions',
      description: 'Decentralized finance applications and protocols'
    },
    {
      icon: <FaPaintBrush />,
      title: 'NFT Platforms',
      description: 'Custom NFT marketplaces and token solutions'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Blockchain Security',
      description: 'Advanced security measures and audit solutions'
    }
  ];

  return (
    <motion.div 
      className="blockchain-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="blockchain-hero-section">
        <motion.div 
          className="blockchain-hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="blockchain-hero-title">
            Web3 & Blockchain Solutions
          </h1>
          <p className="blockchain-hero-subtitle">
            Building the future of decentralized technology
          </p>
          <div className="blockchain-hero-icon">
            <FaNetworkWired />
          </div>
        </motion.div>
      </section>

      <section className="blockchain-features-section">
        <motion.div 
          className="section-header"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Our Blockchain Services</h2>
          <p>Comprehensive Web3 development solutions</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="tech-stack-section">
          <h3>Technologies We Use</h3>
          <div className="tech-tags">
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              Ethereum
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              Solidity
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              Web3.js
            </motion.span>
          </div>
        </div>
      </section>

      <div className="blockchain-cta-section">
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/contact')}
        >
          Start Your Project
        </motion.button>
        <motion.button
          className="secondary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/services')}
        >
          Explore Services
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BlockchainPage; 