import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCode, 
  FaDatabase, 
  FaCheck,
  FaArrowRight,
  FaMobileAlt,
  FaCloud,
  FaRobot
} from 'react-icons/fa';
import './Services.css';

const services = [
  {
    icon: <FaCode />,
    title: 'Web Development',
    description: 'Modern web applications with scalable architecture.',
    features: [
      'Responsive Design',
      'Progressive Web Apps',
      'API Integration',
      'Performance Optimization'
    ],
    techStack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    icon: <FaDatabase />,
    title: 'Data Solutions',
    description: 'Database architecture with analytics capabilities.',
    features: [
      'Data Processing',
      'Analytics Integration',
      'Backup Systems',
      'Data Security'
    ],
    techStack: ['PostgreSQL', 'Python', 'Docker'],
  },
  {
    icon: <FaMobileAlt />,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications with modern UX.',
    features: [
      'iOS & Android Apps',
      'Real-time Updates',
      'Offline Support',
      'Push Notifications'
    ],
    techStack: ['React Native', 'Firebase', 'Swift'],
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment.',
    features: [
      'Cloud Migration',
      'DevOps Setup',
      'Auto-scaling',
      'Monitoring'
    ],
    techStack: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    icon: <FaRobot />,
    title: 'AI Solutions',
    description: 'Custom AI solutions for business automation.',
    features: [
      'Machine Learning',
      'Data Analysis',
      'Process Automation',
      'Predictive Models'
    ],
    techStack: ['TensorFlow', 'Python', 'OpenCV'],
  }
];

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services-page-container">
      <div className="services-search-container">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="services-search-input"
        />
      </div>

      <div className="services-page-grid">
        {filteredServices.map((service, index) => (
          <motion.div
            key={index}
            className="services-page-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="services-page-header">
              <div className="services-page-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
            </div>

            <p className="services-page-description">{service.description}</p>

            <div className="services-page-tech-stack">
              {service.techStack.map(tech => (
                <span key={tech} className="services-page-tech-tag">{tech}</span>
              ))}
            </div>

            <div className="services-page-features">
              {service.features.map((feature, idx) => (
                <div key={idx} className="services-page-feature-item">
                  <FaCheck className="services-page-feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <motion.button
              className="services-page-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/service/${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              Learn More <FaArrowRight />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
