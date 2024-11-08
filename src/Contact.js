import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://formspree.io/f/xovqaewd', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Message sent successfully!');
            window.location.reload(); // Reload the page after successful form submission
            } else {
            alert('Error sending message.');
        }
    };

    return (
        <>
            <div className='title'>
                <h3>Please don't hesitate to contact our team for any assistance or inquiries.</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form_title'>
                    <h1>Contact Us</h1>
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Your Email or Phone Number"
                    value={formData.contact}
                    onChange={handleChange}
                    pattern="^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$|^[a-zA-Z0-9._%+-]+@gmail\.com$"
                    title="Please enter a valid Bangladeshi phone number (e.g., +8801XXXXXXXXX or 01XXXXXXXXX) or a Gmail address"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </>
    );
};

export default Contact;
