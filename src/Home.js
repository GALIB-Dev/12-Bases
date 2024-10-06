import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's navigation hook
import './Home.css'; // Ensure this CSS file contains necessary styles

const Home = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    // Navigate to Services page
    navigate('/services');
  };

  const handleContactUs = () => {
    // Navigate to Contact page
    navigate('/contact');
  };

  return (
    <div className="home">
      {/* Parallax Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to 12 BASES</h1>
          <p className="hero-subtitle">"Serving humanity in pursuit of something greater."</p>
          <button className="btn hero-btn" onClick={handleExploreMore}>
            Explore More
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Take Action?</h2>
        <p>Join us on our journey to make the world a better place.</p>
        <button className="btn cta-btn" onClick={handleContactUs}>
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Home;
