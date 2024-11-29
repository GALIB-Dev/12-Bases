import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCloud, 
  FaDocker, 
  FaCubes, 
  FaServer,
  FaNetworkWired 
} from 'react-icons/fa';
import './CloudPage.css';

const CloudPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCubes />,
      title: 'Microservices',
      description: 'Scalable, maintainable microservices architecture'
    },
    {
      icon: <FaDocker />,
      title: 'Containerization',
      description: 'Docker containers and orchestration solutions'
    },
    {
      icon: <FaServer />,
      title: 'Serverless',
      description: 'Event-driven serverless applications'
    },
    {
      icon: <FaNetworkWired />,
      title: 'DevOps',
      description: 'Automated CI/CD pipelines and infrastructure'
    }
  ];

  return (
    <motion.div 
      className="cloud-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="cloud-hero-section">
        <motion.div 
          className="cloud-hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="cloud-hero-title">
            Cloud Native Development
          </h1>
          <p className="cloud-hero-subtitle">
            Building scalable, resilient cloud infrastructure for modern applications
          </p>
          <div className="cloud-hero-icon">
            <FaCloud />
          </div>
        </motion.div>
      </section>

      <section className="cloud-features-section">
        <motion.div 
          className="section-header"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Cloud Solutions</h2>
          <p>Modern cloud architecture and DevOps practices</p>
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
              Kubernetes
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              Docker
            </motion.span>
            <motion.span 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
            >
              AWS
            </motion.span>
          </div>
        </div>

        <div className="cloud-benefits">
          <h3>Why Cloud Native?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>Scalability</h4>
              <p>Automatically scale resources based on demand</p>
            </div>
            <div className="benefit-item">
              <h4>Reliability</h4>
              <p>Built-in redundancy and fault tolerance</p>
            </div>
            <div className="benefit-item">
              <h4>Cost-Effective</h4>
              <p>Pay only for the resources you use</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cloud-cta-section">
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

export default CloudPage; 