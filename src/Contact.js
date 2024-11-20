import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaComment, 
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    });

    const [selectedMethod, setSelectedMethod] = useState('email');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

        try {
            const response = await fetch('https://formspree.io/f/xovqaewd', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({
                    submitted: true,
                    submitting: false,
                    info: { error: false, msg: 'Message sent successfully!' }
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => {
                    setStatus(prevStatus => ({ ...prevStatus, submitted: false }));
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            setStatus({
                submitted: false,
                submitting: false,
                info: { error: true, msg: 'An error occurred. Please try again later.' }
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.div 
            className="contact-container"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>We'd love to hear from you. Please fill out this form.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <FaMapMarkerAlt />
                        <h3>Our Location</h3>
                        <p>Dhaka, Bangladesh</p>
                    </div>
                    <div className="info-card">
                        <FaClock />
                        <h3>Business Hours</h3>
                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                    <div className="info-card">
                        <FaGlobe />
                        <h3>Online Support</h3>
                        <p>24/7 Available</p>
                    </div>
                </div>

                <motion.form 
                    onSubmit={handleSubmit}
                    className="contact-form"
                >
                    <div className="form-group">
                        <div className="input-icon">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-method-toggle">
                        <button
                            type="button"
                            className={`method-btn ${selectedMethod === 'email' ? 'active' : ''}`}
                            onClick={() => handleMethodChange('email')}
                        >
                            <FaEnvelope /> Email
                        </button>
                        <button
                            type="button"
                            className={`method-btn ${selectedMethod === 'phone' ? 'active' : ''}`}
                            onClick={() => handleMethodChange('phone')}
                        >
                            <FaPhone /> Phone
                        </button>
                    </div>

                    {selectedMethod === 'email' ? (
                        <div className="form-group">
                            <div className="input-icon">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                                title="Please enter a valid Gmail address"
                                required
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <div className="input-icon">
                                <FaPhone />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$"
                                title="Please enter a valid Bangladeshi phone number"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <div className="input-icon">
                            <FaComment />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <motion.button
                        type="submit"
                        className="submit-btn"
                        disabled={status.submitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {status.submitting ? (
                            'Sending...'
                        ) : (
                            <>
                                <FaPaperPlane /> Send Message
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>

            <AnimatePresence>
                {status.info.msg && (
                    <motion.div
                        className={`alert ${status.info.error ? 'error' : 'success'}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        {status.info.error ? (
                            <span className="alert-icon">❌</span>
                        ) : (
                            <FaCheckCircle className="alert-icon" />
                        )}
                        {status.info.msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Contact;
