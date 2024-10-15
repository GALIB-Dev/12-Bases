// Resources.js
import React from 'react';
import './Resources.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelopeOpen, faLock, faUser, faTrash, faFileCode, faBagShopping, faDesktop } from '@fortawesome/free-solid-svg-icons';

const Resources = () => {
  const resources = [
    { icon: faHouse, color: '#ff2971', link: '#' },
    { icon: faEnvelopeOpen, color: '#fee800', link: '#' },
    { icon: faLock, color: '#04fc43', link: '#' },
    { icon: faUser, color: '#fe00f1', link: '#' },
    { icon: faTrash, color: '#00b0fe', link: '#' },
    { icon: faFileCode, color: '#fea600', link: '#' },
    { icon: faBagShopping, color: '#a529ff', link: '#' },
    { icon: faDesktop, color: '#01bdab', link: '#' },
  ];

  return (
    <div className="resources">
      <h1>Resources</h1>
      <ul className="menu">
        <div className="menuToggle">
          <i className="fa-solid fa-plus"></i>
        </div>
        {resources.map((resource, index) => (
          <li key={index} style={{ '--i': index, '--clr': resource.color }}>
            <a href={resource.link}>
              <FontAwesomeIcon icon={resource.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
