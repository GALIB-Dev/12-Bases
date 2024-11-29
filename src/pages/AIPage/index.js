import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaChartLine, FaCode } from 'react-icons/fa';
import './AIPage.css';

const AIPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaBrain />,
      title: 'Machine Learning',
      description: 'Advanced ML algorithms and predictive modeling'
    },
    {
      icon: <FaRobot />,
      title: 'Neural Networks',
      description: 'Deep learning and neural network architectures'
    },
    {
      icon: <FaChartLine />,
      title: 'Deep Learning',
      description: 'Complex pattern recognition and data analysis'
    },
    {
      icon: <FaCode />,
      title: 'Custom Solutions',
      description: 'Tailored AI solutions for your business needs'
    }
  ];

  return (
    <motion.div 
      className="ai-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="ai-hero-section">
        <motion.div 
          className="ai-hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="ai-hero-title">
            Artificial Intelligence Solutions
          </h1>
          <p className="ai-hero-subtitle">
            Transforming businesses with cutting-edge AI technology
          </p>
          <div className="ai-hero-icon">
            <FaBrain size={50} />
          </div>
        </motion.div>
      </section>

      <section className="ai-features-section">
        <motion.div 
          className="section-header"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Our AI Capabilities</h2>
          <p>Comprehensive AI solutions for modern enterprises</p>
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
          <h3>Tech Stack</h3>
          <div className="tech-tags">
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              TensorFlow
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              PyTorch
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              OpenAI
            </motion.span>
          </div>
        </div>
      </section>

      <div className="ai-cta-section">
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/contact')}
        >
          Get Started
        </motion.button>
        <motion.button
          className="secondary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/services')}
        >
          View All Services
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AIPage; 