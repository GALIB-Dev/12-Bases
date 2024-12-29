import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaWhatsapp,
  FaTelegram,
  FaFacebookMessenger
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import ErrorBoundary from './components/ErrorBoundary';
import './Contact.css';

// Initialize EmailJS with try-catch
try {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'Utx6EQgPn2N9vF9tL');
} catch (error) {
    console.error('EmailJS initialization error:', error);
}

const ContactForm = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            title: 'Location',
            details: 'Joypurhat-5900, Bangladesh',
            color: '#72da37'
        },
        {
            icon: <FaClock />,
            title: 'Business Hours',
            details: '9:00 AM - 6:00 PM',
            color: '#4ca819'
        },
        {
            icon: <FaGlobe />,
            title: 'Online Support',
            details: '24/7 Available',
            color: '#72da37'
        }
    ];

    const socialContacts = [
        {
            icon: <FaWhatsapp />,
            platform: 'WhatsApp',
            link: 'https://wa.me/+8801785904899',
            color: '#25D366'
        },
        {
            icon: <FaTelegram />,
            platform: 'Telegram',
            link: 'https://t.me/twelvebases',
            color: '#0088cc'
        },
        {
            icon: <FaFacebookMessenger />,
            platform: 'Messenger',
            link: 'https://m.me/12bases',
            color: '#006AFF'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, submitting: true, error: null });

        if (!navigator.onLine) {
            setStatus({
                submitting: false,
                submitted: false,
                error: 'No internet connection. Please check your network.'
            });
            return;
        }

        try {
            const result = await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_wbxl9af',
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_29wz06v',
                form.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'Utx6EQgPn2N9vF9tL'
            );

            if (result.text === 'OK') {
                setStatus({ submitting: false, submitted: true, error: null });
                setFormData({ name: '', contact: '', subject: '', message: '' });
                setTimeout(() => setStatus(prev => ({ ...prev, submitted: false })), 3000);
            } else {
                throw new Error('Server response was not OK');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({
                submitting: false,
                submitted: false,
                error: error.text || 'Failed to send message. Please try again later.'
            });
        }
    };

    return (
        <motion.div 
            className="contact-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="contact-header">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    We're here to help and answer any question you might have
                </motion.p>
            </div>

            <div className="contact-content">
                <div className="contact-left">
                    {/* Contact Information Cards */}
                    <div className="info-cards">
                        {contactInfo.map((info, index) => (
                            <motion.div 
                                key={index}
                                className="info-card"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 * index }}
                            >
                                <div className="info-icon" style={{ color: info.color }}>
                                    {info.icon}
                                </div>
                                <h3>{info.title}</h3>
                                <p>{info.details}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Contact Options */}
                    <div className="social-contacts">
                        {socialContacts.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                className="social-contact-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ '--hover-color': social.color }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {social.icon}
                                <span>{social.platform}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="contact-right">
                    <motion.form 
                        ref={form}
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="form-group">
                            <div className="input-icon">
                                <FaUser />
                            </div>
                            <input
                                type="text"
                                name="from_name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                name="reply_to"
                                placeholder="Your Email"
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FaPaperPlane />
                            </div>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required
                            ></textarea>
                        </div>

                        <input type="text" name="_gotcha" style={{ display: 'none' }} />

                        <motion.button
                            type="submit"
                            className="submit-btn"
                            disabled={status.submitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status.submitting ? 'Sending...' : (
                                <>
                                    <FaPaperPlane /> Send Message
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>

            <AnimatePresence>
                {(status.submitted || status.error) && (
                    <motion.div
                        className={`alert ${status.error ? 'error' : 'success'}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        {status.error ? (
                            <>❌ {status.error}</>
                        ) : (
                            <><FaCheckCircle /> Message sent successfully!</>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Wrap the component with ErrorBoundary
const Contact = () => (
    <ErrorBoundary>
        <ContactForm />
    </ErrorBoundary>
);

export default Contact;
