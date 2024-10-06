import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '', // Change 'email' to 'contact' to represent either email or phone
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
        } else {
            alert('Error sending message.');
        }
    };

    return (
        <><div className='title'>
            <h3>Please don't hesitate to contact our team for any assistance or inquiries. </h3>
        </div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required />
            <input
                type="text"
                name="contact"
                placeholder="Your Email or Phone Number"
                value={formData.contact}
                onChange={handleChange}
                pattern="^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,14}\s*,?$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$"
                title="Please enter a valid email address or phone number"
                required />
            <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>
            <button type="submit">Send</button>
        </form></>
    );
};

export default Contact;
