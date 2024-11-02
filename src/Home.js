import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's navigation hook
import './Home.css'; // Ensure this CSS file contains necessary styles
import circle from './circle.png'; // Ensure the path is correct
import diamond from './diamond.png'; // Ensure the path is correct
import star from './star.png'; // Ensure the path is correct
import triangle from './triangle.png'; // Ensure the path is correct

const Home = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/explore'); // Navigate to Explore page
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="home">
      {/* Parallax Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to 12 BASES</h1>
          <p className="hero-subtitle">"Serving humanity in pursuit of something greater."</p>
          
          {/* Magic Animation Explore More Button */}
          <div className="Explore-more-section">
            <button className="button" onClick={handleExploreMore}>
              <div className="button__content">
                <span className="button__text">Explore More</span>
                <div className="button__reflection-1"></div>
                <div className="button__reflection-2"></div>
              </div>

              {/* Updated image paths */}
              <img src={star} alt="Star 1" className="button__star-1" />
              <img src={star} alt="Star 2" className="button__star-2" />
              <img src={circle} alt="Circle 1" className="button__circle-1" />
              <img src={circle} alt="Circle 2" className="button__circle-2" />
              <img src={diamond} alt="Diamond" className="button__diamond" />
              <img src={triangle} alt="Triangle" className="button__triangle" />

              <div className="button__shadow"></div>
            </button>
          </div>
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
