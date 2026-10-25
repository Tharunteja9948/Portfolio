import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Eye, Check, Copy, Sparkles, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function ResumeSection({ onOpenResumeModal }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 }
      });
    } catch (e) {
      // Fallback
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FileText size={14} />
            Verified Resume
          </div>
          <h2 className="section-title">
            Curriculum Vitae &amp; <br />
            <span className="gradient-text">Professional Credentials</span>
          </h2>
          <p className="section-description">
            Access my complete, unaltered academic and project resume directly. Available for in-browser review or instant PDF download.
          </p>
        </div>

        {/* Main Resume Showcase Card */}
        <div className="resume-showcase glass-card">
          {/* Top Banner / Actions Bar */}
          <div className="resume-top-banner">
            <div className="banner-doc-meta">
              <div className="doc-type-icon">
                <FileText size={28} className="text-accent" />
              </div>
              <div>
                <h3 className="doc-title">{personalInfo.resumeFilename}</h3>
                <p className="doc-subtitle">
                  Updated &amp; Verified &middot; Single-Page ATS Optimized
                </p>
              </div>
            </div>

            <div className="resume-cta-buttons">
              {/* 1. View Resume in Modal */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onOpenResumeModal}
                aria-label="Open Resume in Interactive Viewer"
              >
                <Eye size={17} />
                Preview Full Document
              </button>

              {/* 2. Open in New Tab */}
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label="Open PDF in new browser tab"
              >
                <ExternalLink size={17} />
                Open in Tab
              </a>

              {/* 3. Download Resume PDF */}
              <a
                href={personalInfo.resumePath}
                download={personalInfo.resumeFilename}
                className="btn btn-primary"
                onClick={handleDownload}
                aria-label="Download Seddam Tarun Theja Resume PDF"
              >
                <Download size={17} />
                Download Resume (PDF)
              </a>
            </div>
          </div>

          {/* Interactive Document Preview Container */}
          <div className="resume-preview-container">
            {/* Left side: Live Embedded PDF Viewer */}
            <div className="resume-embed-wrapper">
              <div className="embed-browser-chrome">
                <div className="chrome-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="chrome-address">
                  <span>{personalInfo.resumeFilename}</span>
                </div>
                <div className="chrome-actions">
                  <a
                    href={personalInfo.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chrome-btn"
                    title="Open in new window"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="embed-iframe-frame">
                <iframe
                  src={`${personalInfo.resumePath}#toolbar=0&view=FitH`}
                  className="embedded-pdf"
                  title="Official Resume PDF Preview"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right side: Structured Quick-Scan Summary for Recruiters */}
            <div className="resume-quick-scan">
              <div className="quick-scan-header">
                <span className="badge badge-indigo">Executive Snapshot</span>
                <h4 className="quick-scan-title">Recruiter Quick Facts</h4>
                <p className="quick-scan-desc">
                  Key profile points verified directly from the uploaded resume.
                </p>
              </div>

              <div className="quick-scan-items">
                <div className="scan-item">
                  <div className="scan-item-label">Candidate</div>
                  <div className="scan-item-val font-semibold">{personalInfo.name}</div>
                </div>

                <div className="scan-item">
                  <div className="scan-item-label">Education</div>
                  <div className="scan-item-val">
                    B.Tech CSE (2023–2027) &middot; QIS College of Engg. &amp; Tech &middot; <strong>CGPA 7.33</strong>
                  </div>
                </div>

                <div className="scan-item">
                  <div className="scan-item-label">Career Target</div>
                  <div className="scan-item-val">
                    Python Developer, Full-Stack Web, Data Analytics, Software Engineer
                  </div>
                </div>

                <div className="scan-item">
                  <div className="scan-item-label">Key Core Tech</div>
                  <div className="scan-item-chips">
                    <span className="tech-chip">Python</span>
                    <span className="tech-chip">SQL / MySQL</span>
                    <span className="tech-chip">Data Analytics</span>
                    <span className="tech-chip">RESTful APIs</span>
                    <span className="tech-chip">JavaScript</span>
                    <span className="tech-chip">HTML/CSS</span>
                  </div>
                </div>

                <div className="scan-item">
                  <div className="scan-item-label">Industry Simulations</div>
                  <div className="scan-item-val">
                    CommBank (Software Engg) &middot; Deloitte &middot; TATA Group &middot; EduSkills
                  </div>
                </div>
              </div>

              {/* Quick Copy Contact Bar */}
              <div className="resume-contact-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm copy-btn"
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                >
                  {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm copy-btn"
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                >
                  {copiedPhone ? <Check size={14} className="text-emerald" /> : <Phone size={14} />}
                  <span>{copiedPhone ? 'Phone Copied!' : 'Copy Phone'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
