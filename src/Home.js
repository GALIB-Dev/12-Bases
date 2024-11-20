import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaDatabase, 
  FaServer, 
  FaCloud,
  FaChartLine,
  FaCode,
  FaLock,
  FaFireAlt,
  FaComments,
  FaMobile,
  FaArrowRight
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const services = [
    { 
      title: 'Web Development',
      icon: <FaCode />,
      color: '#1E88E5',
      description: 'Custom websites and web applications',
      link: '/services/web'
    },
    { 
      title: 'Mobile Apps',
      icon: <FaMobile />,
      color: '#43A047',
      description: 'iOS and Android app development',
      link: '/services/mobile'
    },
    { 
      title: 'Cloud Services',
      icon: <FaCloud />,
      color: '#E53935',
      description: 'Scalable cloud solutions',
      link: '/services/cloud'
    },
    { 
      title: 'API Integration',
      icon: <FaServer />,
      color: '#FB8C00',
      description: 'Third-party API integration',
      link: '/services/api'
    },
    { 
      title: 'Database Design',
      icon: <FaDatabase />,
      color: '#6741D9',
      description: 'Efficient database architecture',
      link: '/services/database'
    },
    { 
      title: 'Security',
      icon: <FaLock />,
      color: '#0EA5E9',
      description: 'Advanced security solutions',
      link: '/services/security'
    }
  ];

  const recentProjects = [
    {
      name: 'E-Commerce Platform',
      status: 'Active',
      lastDeployed: '2 hours ago',
      type: 'Web App'
    },
    {
      name: 'Mobile Banking App',
      status: 'Development',
      lastDeployed: '1 day ago',
      type: 'Mobile App'
    },
    // Add more projects as needed
  ];

  return (
    <motion.div 
      className="dashboard-container"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Welcome Section */}
      <section className="welcome-section">
        <motion.div className="welcome-content" variants={itemVariants}>
          <div className="welcome-header">
            <h1>Welcome to 12 Bases</h1>
            <motion.button
              className="forum-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/ChatLogin')}
            >
              <FaComments /> Forum
            </motion.button>
          </div>
          <p className="welcome-subtitle">Join our community and explore the world of development</p>
        </motion.div>
      </section>

      {/* Services Showcase */}
      <section className="services-showcase">
        <motion.div className="section-header" variants={itemVariants}>
          <h2>Our Services</h2>
          <p>Comprehensive solutions for your development needs</p>
        </motion.div>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(service.link)}
            >
              <div className="service-icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.div 
                className="service-arrow"
                whileHover={{ x: 5 }}
              >
                <FaArrowRight />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="recent-projects">
        <motion.h2 variants={itemVariants}>Recent Projects</motion.h2>
        <div className="projects-list">
          {recentProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
              }}
            >
              <div className="project-icon">
                <FaFireAlt />
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <div className="project-meta">
                  <span className={`status ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                  <span className="type">{project.type}</span>
                </div>
                <p className="last-deployed">Last deployed: {project.lastDeployed}</p>
              </div>
              <FaChartLine className="stats-icon" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <motion.h2 variants={itemVariants}>Resources</motion.h2>
        <div className="resources-grid">
          {[
            { icon: <FaCode />, title: 'Documentation', description: 'Learn how to integrate and build' },
            { icon: <FaLock />, title: 'Security', description: 'Best practices and guidelines' },
            { icon: <FaServer />, title: 'API Reference', description: 'Detailed API documentation' }
          ].map((resource, index) => (
            <motion.div
              key={index}
              className="resource-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {resource.icon}
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Call to Action Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-content"
          variants={itemVariants}
        >
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of developers building amazing projects</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/Contact')}
            >
              Join Community
            </motion.button>
            <motion.button
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/documentation')}
            >
              Learn More
            </motion.button>
          </div>
          <div className="cta-stats">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Projects</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;