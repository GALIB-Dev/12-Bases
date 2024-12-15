import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaCode, FaBullhorn } from 'react-icons/fa';
import './Updates.css';
import ddImage from './Screenshot_2024-12-15-23-50-13-48_99c04817c0de5652397fc8b56c3b3817.jpg';
import mdImage from './x.png';

const Updates = () => {
  const updates = [
    {
      title: "Real-Time Forum System",
      description: "Introducing our new real-time chatting feature enabling instant community interactions and live discussions.",
      icon: <FaUsers />,
      date: "March 2024"
    },
    {
      title: "AI Integration",
      description: "Implementing advanced AI features to enhance user experience and provide smarter solutions.",
      icon: <FaRocket />,
      date: "Coming Soon"
    }
  ];

  const teamMembers = [
    {
      name: 'Developer & Designer',
      fullName: 'Mohammad Al Galib',
      role: 'Full-stack development and UI/UX design',
      image: ddImage,
      skills: ['React', 'Node.js', 'UI/UX', 'MongoDB'],
      icon: <FaCode />
    },
    {
      name: 'Head Advisor',
      fullName: 'Yusuf Anam',
      role: 'Strategy and Marketing',
      image: mdImage,
      skills: ['Marketing', 'Strategy', 'Business Development'],
      icon: <FaBullhorn />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="updates-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div 
        className="updates-header"
        variants={itemVariants}
      >
        <h1>Latest Updates</h1>
        <p>Innovating for tomorrow, delivering today</p>
      </motion.div>

      {/* Updates Grid */}
      <div className="updates-grid">
        {updates.map((update, index) => (
          <motion.div 
            key={index}
            className="update-card"
            variants={itemVariants}
          >
            <div className="update-icon">
              {update.icon}
            </div>
            <div className="update-content">
              <h3>{update.title}</h3>
              <p>{update.description}</p>
              <span className="update-date">{update.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.div 
        className="team-section"
        variants={itemVariants}
      >
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="team-image-container">
                <img src={member.image} alt={member.fullName} />
              </div>
              <div className="team-info">
                <h3>{member.fullName}</h3>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <div className="team-skills">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="team-icon">
                {member.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Coming Soon Section */}
      <motion.div 
        className="coming-soon"
        variants={itemVariants}
      >
        <h2>Stay Tuned</h2>
        <p>More exciting features and updates coming soon!</p>
      </motion.div>
    </motion.div>
  );
};

export default Updates;
