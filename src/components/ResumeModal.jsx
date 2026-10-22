import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadWithConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Silent fallback
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="modal-container resume-modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="badge badge-emerald modal-category">
              <CheckCircle2 size={13} /> Official Document
            </span>
            <h3 id="resume-modal-title" className="modal-title">
              Seddam Tarun Theja &middot; Resume
            </h3>
            <p className="modal-subtitle">
              B.Tech in CSE (2023–2027) &middot; Python Developer &amp; Data Analytics
            </p>
          </div>

          <div className="modal-header-actions">
            <a
              href={personalInfo.resumePath}
              download={personalInfo.resumeFilename}
              className="btn btn-primary btn-sm"
              onClick={handleDownloadWithConfetti}
            >
              <Download size={16} />
              Download PDF
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={16} />
              Open in Tab
            </a>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Resume Viewer"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Embedded Viewer Body */}
        <div className="resume-modal-body">
          <iframe
            src={`${personalInfo.resumePath}#toolbar=1&navpanes=0`}
            className="resume-pdf-iframe"
            title="Seddam Tarun Theja Official Resume PDF"
          />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="resume-footer-info">
            <FileText size={15} className="text-accent" />
            <span>Format: Single-Page ATS PDF &middot; Filename: <code>{personalInfo.resumeFilename}</code></span>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
