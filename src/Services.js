import React from 'react';
import './Services.css'; // Advanced CSS for Services Page
import { FaCode, FaMobileAlt, FaCloud, FaDatabase, FaPaintBrush } from 'react-icons/fa'; // Icons for services

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Premium Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <FaCode className="service-icon" />
          <h2>Web Development</h2>
          <p>High-quality custom websites tailored to your business needs.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="service-card">
          <FaDatabase className="service-icon" />
          <h2>Database Management</h2>
          <p>Reliable and scalable database solutions to keep your data secure and accessible.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="service-card">
          <FaPaintBrush className="service-icon" />
          <h2>Creative Design</h2>
          <p>Unique, visually appealing designs to give your brand a creative edge.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="service-card">
          <FaMobileAlt className="service-icon" />
          <h2>Mobile Development<h6>(Unavailable)</h6></h2>
          <p>Modern mobile applications for iOS and Android platforms.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="service-card">
          <FaCloud className="service-icon" />
          <h2>Cloud Solutions<h6>(Unavailable)</h6></h2>
          <p>Scalable and secure cloud infrastructure for your business.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Services;
