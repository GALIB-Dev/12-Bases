import React from 'react';
import './ServiceModal.css';

const ServiceModal = ({ service, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="modal-header">
          <h2>{service.title}</h2>
          <div className="modal-icon">{service.icon}</div>
        </div>
        <div className="modal-body">
          <p>Explore our {service.title} service in detail. {service.description}</p>
          <ul>
            <li>Benefit 1 of {service.title}</li>
            <li>Benefit 2 of {service.title}</li>
            <li>More details...</li>
          </ul>
          <button className="contact-btn">Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
