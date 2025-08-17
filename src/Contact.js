import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaTelegram, 
  FaFacebookMessenger,
  FaDownload,
  FaCopy,
  FaCheck
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [copied, setCopied] = useState(false);

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      text: 'mohammadalgalib71@gmail.com',
      action: 'mailto:mohammadalgalib71@gmail.com',
      actionText: 'Send Email'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      text: '+880 178 590 4899',
      action: 'tel:+8801785904899',
      actionText: 'Call Now'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      text: '+880 178 590 4899',
      action: 'https://wa.me/8801785904899',
      actionText: 'Chat on WhatsApp'
    },
    {
      icon: <FaTelegram />,
      title: 'Telegram',
      text: '@galib_dev',
      action: 'https://t.me/galib_dev',
      actionText: 'Message on Telegram'
    },
    {
      icon: <FaFacebookMessenger />,
      title: 'Messenger',
      text: '12 Bases Technology',
      action: 'https://m.me/12bases',
      actionText: 'Send Message'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      text: 'Joypurhat, Rajshahi, Bangladesh',
      action: '#map',
      actionText: 'View on Map'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/mohammad.al.galib.2024' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/12bases' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/12bases' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com/GALIB-Dev/12-Bases' },
    { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/root_user__4/' }
  ];

  const quickActions = [
    {
      icon: <FaDownload />,
      title: 'Download Resume',
      description: 'Get my latest resume and portfolio',
      action: '/resume.pdf'
    },
    {
      icon: <FaCopy />,
      title: 'Copy Contact Info',
      description: 'Copy all contact details to clipboard',
      action: 'copy'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'View Location',
      description: 'See our office location on Google Maps',
      action: '#map'
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };



  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <motion.div 
        className="tab-navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
          <button
            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
          <button
            className={`tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            Quick Actions
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        className="tab-content"
        key={activeTab}
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'contact' && (
            <motion.div 
              className="contact-tab"
              key="contact"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="contact-grid">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="contact-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-text">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <a 
                      href={item.action} 
                      className="contact-action"
                      target={item.action.startsWith('http') ? '_blank' : '_self'}
                      rel={item.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {item.actionText}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div 
              className="social-tab"
              key="social"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="social-icon">{social.icon}</div>
                    <div className="social-name">{social.name}</div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div 
              className="actions-tab"
              key="actions"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    className="action-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      if (action.action === 'copy') {
                        copyToClipboard('Contact: +880 178 590 4899\nEmail: mohammadalgalib71@gmail.com\nLocation: Joypurhat, Rajshahi, Bangladesh');
                      }
                    }}
                  >
                    <div className="action-icon">{action.icon}</div>
                    <div className="action-content">
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                    <div className="action-arrow">→</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Download Section */}
      <motion.section 
        className="download-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="download-content">
          <h2>Need More Information?</h2>
          <p>Download our company profile and service catalog to learn more about what we offer.</p>
          <motion.button 
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload />
            Download Company Profile
          </motion.button>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="map-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="map-content">
          <h2>Our Location</h2>
          <p>Visit us at our office in Joypurhat, Rajshahi, Bangladesh</p>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193.78561597292233!2d88.97987640873224!3d25.087955315826072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1755455327945!5m2!1sen!2sbd" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="12 Bases Technology Office Location"
            />
          </div>
        </div>
      </motion.section>

      {/* Copy Status */}
      {copied && (
        <motion.div 
          className="copy-status"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <FaCheck />
          Contact info copied to clipboard!
        </motion.div>
      )}
    </div>
  );
};

export default Contact;
