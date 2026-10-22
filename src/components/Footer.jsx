import React from 'react';
import { ArrowUp, Mail, Heart, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenResumeModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-footer">
      <div className="container footer-container">
        {/* Top Footer Row */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo-icon">
              <span className="brand-monogram">ST</span>
            </div>
            <div className="footer-brand-info">
              <span className="footer-brand-name">{personalInfo.name}</span>
              <span className="footer-brand-sub">{personalInfo.headline}</span>
            </div>
          </div>

          <div className="footer-social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-social-btn"
              aria-label="Send Email"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <button
              type="button"
              className="footer-social-btn"
              onClick={onOpenResumeModal}
              aria-label="View Resume PDF"
              title="View Resume PDF"
            >
              <FileText size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Footer Row */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All verified portfolio details sourced from official curriculum vitae.
          </p>

          <div className="footer-actions">
            <span className="footer-status-pill">
              <span className="live-dot" />
              Open for Placement &amp; Job Offers
            </span>

            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
