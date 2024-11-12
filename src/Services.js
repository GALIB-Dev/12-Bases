import React from 'react';
import './Services.css';
import { FaCode, FaMobileAlt, FaCloud, FaDatabase, FaPaintBrush } from 'react-icons/fa';

const services = [
  { icon: <FaCode />, title: 'Web Development', description: 'High-quality custom websites tailored to your business needs.', available: true },
  { icon: <FaDatabase />, title: 'Database Management', description: 'Reliable and scalable database solutions to keep your data secure and accessible.', available: true },
  { icon: <FaPaintBrush />, title: 'Creative Design', description: 'Unique, visually appealing designs to give your brand a creative edge.', available: true },
  { icon: <FaMobileAlt />, title: 'Mobile Development', description: 'Modern mobile applications for iOS and Android platforms.', available: false },
  { icon: <FaCloud />, title: 'Cloud Solutions', description: 'Scalable and secure cloud infrastructure for your business.', available: false },
];

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Premium Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`service-card ${service.available ? 'available' : 'unavailable'}`} 
            title={!service.available ? 'Currently Unavailable' : ''}
          >
            <div className="icon-container">
              {service.icon}
            </div>
            <h2>{service.title}</h2>
            {!service.available && <p className="unavailable-tag">(Unavailable)</p>}
            <p>{service.description}</p>
            {service.available && <button className="learn-more-btn">Learn More</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
