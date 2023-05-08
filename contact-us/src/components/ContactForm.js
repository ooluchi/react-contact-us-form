/*
 * Copyright (c) 2023 Your Company Name
 * All rights reserved.
 */
import React, { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate inputs
    let formErrors = {};
    if (!name) {
      formErrors.name = 'Name is required';
    }
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!message) {
      formErrors.message = 'Message is required';
    }

    // If there are errors, set them and stop the submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    // If there are no errors, submit the form
    const data = {
      id: nanoid(),
      name,
      email,
      subject,
      message
    };
    axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', data)
      .then(() => {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch(() => {
        setErrors({ submission: 'There was an error submitting the form. Please try again later.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <div className="success-message">Your inquiry has been submitted successfully.</div>
      )}
      {errors.submission && (
        <div className="error-message">{errors.submission}</div>
      )}
      <div className="form-field">
        <label htmlFor="name">Name *</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        {errors.name && (
          <div className="error-message">{errors.name}</div>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message *</label>
        <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
        {errors.message && (
          <div className="error-message">{errors.message}</div>
        )}
      </div>
      <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>
);
};

export default ContactForm;

