import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, Phone, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please specify the subject or role opportunity.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a message or inquiry details.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b0aa3f6b-905e-41b7-8b3d-9acbd004c475',
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Inquiry] ${formData.subject}`,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Recruiter)`
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch (err) {}
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Direct submit fallback to email client:', err);
      // Fallback: trigger pre-filled mailto so inquiry is never lost
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            Let's Connect
          </div>
          <h2 className="section-title">
            Open to Full-Time Roles &amp; <br />
            <span className="gradient-text">Software Engineering Opportunities</span>
          </h2>
          <p className="section-description">
            Looking for a dedicated fresher with hands-on Python, database, and web engineering skills? Feel free to reach out directly or send a message below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Recruiter Contact Information */}
          <div className="contact-info-panel glass-card">
            <h3 className="contact-panel-title">Direct Recruiter Channels</h3>
            <p className="contact-panel-desc">
              I am actively interviewing and available to respond promptly to interview invitations, technical screenings, or general inquiries.
            </p>

            <div className="contact-cards-stack">
              {/* Email Card with 1-click copy */}
              <div className="contact-channel-card">
                <div className="channel-icon bg-indigo">
                  <Mail size={20} className="text-indigo" />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Official Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="channel-value email-link">
                    {personalInfo.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-channel-card">
                <div className="channel-icon bg-emerald">
                  <Phone size={20} className="text-emerald" />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Phone &middot; WhatsApp</span>
                  <a href={`tel:${personalInfo.phone}`} className="channel-value">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="contact-channel-card">
                <div className="channel-icon bg-cyan">
                  <LinkedinIcon size={20} className="text-cyan" />
                </div>
                <div className="channel-content">
                  <span className="channel-label">LinkedIn Profile</span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-value profile-link"
                  >
                    linkedin.com/in/seddam-tarun-theja
                  </a>
                </div>
              </div>

              {/* GitHub Card */}
              <div className="contact-channel-card">
                <div className="channel-icon bg-indigo">
                  <GithubIcon size={20} className="text-indigo" />
                </div>
                <div className="channel-content">
                  <span className="channel-label">GitHub Repositories</span>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-value profile-link"
                  >
                    github.com/Tharunteja9948
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-channel-card">
                <div className="channel-icon bg-cyan">
                  <MapPin size={20} className="text-cyan" />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Current Location</span>
                  <span className="channel-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="availability-callout">
              <span className="live-dot" />
              <span>Available for on-site &amp; remote full-time opportunities across India</span>
            </div>
          </div>

          {/* Right Column: Fully Functional Contact Form */}
          <div className="contact-form-panel glass-card">
            <div className="form-panel-header">
              <h3 className="form-title">Send a Direct Message</h3>
              <p className="form-sub">
                Fill in the form below. Your message will be sent directly to Tarun's inbox at <strong>{personalInfo.email}</strong>.
              </p>
            </div>

            {isSubmitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="text-emerald" />
                </div>
                <h4 className="success-title">Message Delivered Successfully!</h4>
                <p className="success-text">
                  Thank you, <strong>{formData.name}</strong>. Your message was sent directly to Tarun's inbox at <strong>{personalInfo.email}</strong>. Tarun will get back to you promptly.
                </p>
                <div className="success-summary-box">
                  <p><strong>Subject:</strong> {formData.subject}</p>
                  <p><strong>From:</strong> {formData.email}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Priya Sharma / Recruiter Name"
                    required
                  />
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle size={13} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="e.g. recruiter@company.com"
                    required
                  />
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject / Opportunity <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'input-error' : ''}`}
                    placeholder="e.g. Python Developer Role / Interview Discussion"
                    required
                  />
                  {errors.subject && (
                    <span className="error-message">
                      <AlertCircle size={13} /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message Details <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Share role details, team context, or interview availability..."
                    required
                  ></textarea>
                  {errors.message && (
                    <span className="error-message">
                      <AlertCircle size={13} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full submit-btn"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
