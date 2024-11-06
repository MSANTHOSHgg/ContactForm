import React, { useState } from 'react';
import './ContactForm.css';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sendimg from '../assets/send.png'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!formData.message) formErrors.message = 'Message is required';

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post('http://localhost:3001/contactform', formData);

        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Slide,
        });

        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } catch (error) {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Slide,
        });
      }
    } else {
      setErrors(formErrors);
    }
  };

  function copyToClipboard() {
    const phoneNumber = document.getElementById("phoneNumber").innerText;
    navigator.clipboard.writeText(phoneNumber)
      toast.success("Phone number copied");
  }

  return (
    <div className="contact-form">
      <h1>Contact Us</h1>
      <p>We would love to hear from you! Please fill out the form below to get in touch.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='ex: contact@gmail.com'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder='Describe here...'
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" className='submitbtn'><img src={sendimg} alt='' className='sendicon' />Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Our Contact Information</h3>
        <ul>
          <li id='phoneNumber' onClick={copyToClipboard}>Phone: +91 8778676679 <p id='copyMessage' style={{display:"None"}}>copied</p></li>
          {/* <li>Email: contact@form.com</li> */}
          <li><a href="mailto:contact@gmail.com" id="emailLink">Email: contact@gmail.com</a></li>
          <li>Address: 123 Gourmet Street, Food City, India</li>
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactUs;
