import React from 'react';
import './Services.css'; // Add CSS for Services Page
import { FaCode, FaMobileAlt, FaCloud } from 'react-icons/fa'; // Icons for services

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Premium Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <FaCode className="service-icon" />
          <h2>Web Development</h2>
          <p>High-quality custom websites tailored to your business needs.</p>
        </div>
        <div className="service-card">
          <FaMobileAlt className="service-icon" />
          <h2>Mobile Development</h2>
          <p>Modern mobile applications for iOS and Android platforms.</p>
        </div>
        <div className="service-card">
          <FaCloud className="service-icon" />
          <h2>Cloud Solutions</h2>
          <p>Scalable and secure cloud infrastructure for your business.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
