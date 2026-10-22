import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Code, Layers, Sparkles, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="badge badge-indigo modal-category">{project.category}</span>
            <h3 id="modal-title" className="modal-title">{project.title}</h3>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Tech stack badges */}
              <div className="modal-tech-bar">
                <span className="tech-bar-label">Technologies Used:</span>
                <div className="tech-bar-chips">
                  {project.technologies.map(t => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="modal-problem-solution-grid">
                <div className="modal-section-box problem-box">
                  <h4 className="modal-box-title">
                    <AlertCircle size={16} className="text-warning" />
                    Problem &amp; Context
                  </h4>
                  <p>{project.problem}</p>
                </div>

                <div className="modal-section-box solution-box">
                  <h4 className="modal-box-title">
                    <Sparkles size={16} className="text-accent" />
                    Implemented Solution
                  </h4>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Implemented Key Features */}
              <div className="modal-features-section">
                <h4 className="modal-section-heading">
                  <Layers size={18} className="text-accent" />
                  Key Implemented Capabilities
                </h4>
                <div className="modal-features-list">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="modal-feature-item">
                      <CheckCircle size={18} className="text-emerald feature-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarun's Contribution */}
              <div className="modal-contribution-section">
                <h4 className="modal-section-heading">
                  <Code size={18} className="text-accent" />
                  Engineering Contribution
                </h4>
                <div className="modal-contribution-card">
                  <p>{project.contribution}</p>
                </div>
              </div>

              {/* Project Highlights */}
              {project.highlights && (
                <div className="modal-highlights-wrap">
                  {project.highlights.map(h => (
                    <span key={h} className="badge badge-cyan modal-highlight-badge">
                      {h}
                    </span>
                  ))}
                </div>
              )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <div className="modal-footer-status">
            <span className="live-dot" />
            Verified repository on Tarun's GitHub
          </div>
          <div className="modal-footer-btns">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Close Window
            </button>
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-sm"
              >
                <GithubIcon size={16} />
                Explore Source Code
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
