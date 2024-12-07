import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  FaCloud,
  FaArrowRight,
  FaBrain,
  FaNetworkWired
} from 'react-icons/fa';
import './Home.css';

// Modern tech services data
const services = [
  { 
    title: 'AI Development',
    fullTitle: 'Artificial Intelligence Solutions',
    icon: <FaBrain />,
    color: '#72da37',
    bgGradient: 'linear-gradient(135deg, #72da37 0%, #4ca819 100%)',
    description: 'Custom AI & ML solutions for enterprise applications',
    features: ['Machine Learning', 'Neural Networks', 'Deep Learning'],
    techStack: ['TensorFlow', 'PyTorch', 'OpenAI'],
    link: '/aipage'
  },
  { 
    title: 'Blockchain',
    fullTitle: 'Web3 & Blockchain',
    icon: <FaNetworkWired />,
    color: '#72da37',
    bgGradient: 'linear-gradient(135deg, #72da37 0%, #4ca819 100%)',
    description: 'Decentralized applications & smart contracts',
    features: ['Smart Contracts', 'DeFi', 'NFT Platforms'],
    techStack: ['Ethereum', 'Solidity', 'Web3.js'],
    link: '/services/blockchain'
  },
  { 
    title: 'Cloud Native',
    fullTitle: 'Cloud Native Development',
    icon: <FaCloud />,
    color: '#72da37',
    bgGradient: 'linear-gradient(135deg, #72da37 0%, #4ca819 100%)',
    description: 'Modern cloud architecture & DevOps',
    features: ['Microservices', 'Containerization', 'Serverless'],
    techStack: ['Kubernetes', 'Docker', 'AWS'],
    link: '/services/cloud'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div 
        className="progress-bar"
        style={{ scaleX }}
      />
      <motion.div 
        className="home-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="hero-section">
          <motion.div 
            className="hero-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              <motion.span 
                className="hero-text-building"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Building
              </motion.span>{' '}
              <motion.span 
                className="hero-text-the"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                the
              </motion.span>{' '}
              <motion.span 
                className="hero-text-future"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Future
              </motion.span>{' '}
              <motion.span 
                className="hero-text-with"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                with
              </motion.span>{' '}
              <motion.span 
                className="hero-text-technology"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Technology 
              </motion.span>
            </h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className="subtitle-highlight">Innovating</span> Today for{' '}
              <span className="subtitle-highlight">Tomorrow's</span> World
            </motion.p>
            <div className="hero-cta">
              <motion.button
                className="primary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/services')}
              >
                Explore Services
              </motion.button>
              <motion.button
                className="secondary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="services-section">
          <motion.div 
            className="section-header"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Our Solutions</h2>
            <p>Leveraging cutting-edge technology for innovative solutions</p>
          </motion.div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
};

// Separate component for Service Card
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="service-card"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 30px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(service.link)}
      style={{
        '--service-gradient': service.bgGradient
      }}
    >
      <div className="service-icon" style={{ color: service.color }}>
        {service.icon}
      </div>
      <div className="service-content">
        <h3 className="service-title">{service.fullTitle}</h3>
        <p className="service-description">{service.description}</p>
        <div className="service-tech-stack">
          {service.techStack.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      <motion.div 
        className="service-arrow"
        whileHover={{ x: 5 }}
      >
        <FaArrowRight />
      </motion.div>
    </motion.div>
  );
};

export default Home;