import React from 'react';
import './Updates.css';
import ddImage from './dd.png'; // Update this path
import mdImage from './md.png'; // Update this path

function Updates() {
  const teamMembers = [
    {
      name: 'Developer & Designer',
      name1: 'Mohammad Al Galib',
      role: 'Responsible for development and coding. Creates the visual design for the projects.',
      image: ddImage, // Use imported image
    },
    {
      name: 'Managing Director & Marketing Head',
      name1: 'Yusuf Anam',
      role: 'Oversees company direction and strategy. Responsible for marketing and outreach.',
      image: mdImage, // Use imported image
    },
  ];

  return (
    <div className="updates-container">
      <h1 className="updates-title">Latest Updates</h1>
      <p className="updates-description">
        <h4>Stay tuned, something exciting is coming soon!</h4>
      </p>

      {/* New Feature Section */}
      <div className="new-feature">
        <h2>Update 1 <br></br>Introducing Our Real-Time Forum Chatting System</h2>
        <p>
          We're thrilled to announce the launch of a real-time chatting feature in our forum, allowing users to 
          connect and interact instantly. This system supports live conversations, topic discussions, and helps 
          build a stronger community. Join us and be part of the conversation!
        </p>
      </div>

      {/* Meet the Team Section */}
      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-slider">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.image} alt={member.name} className="team-image" />
              <h3>{member.name}</h3>
              <h4>{member.name1}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Updates;
