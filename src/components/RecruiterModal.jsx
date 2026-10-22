import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  FileText, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  FolderGit2, 
  Code2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, projects, experience, stats } from '../data/portfolioData';

export default function RecruiterModal({ isOpen, onClose, onOpenResumeModal }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const triggerConfetti = () => {
    try {
      const colors = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b'];
      for (let i = 0; i < 40; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti-particle';
        conf.style.left = `${Math.random() * 100}vw`;
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = `${1.2 + Math.random() * 1.5}s`;
        conf.style.width = `${6 + Math.random() * 8}px`;
        conf.style.height = `${6 + Math.random() * 8}px`;
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 2500);
      }
    } catch {
      // fallback safe
    }
  };

  const handleDownloadResume = () => {
    triggerConfetti();
    const link = document.createElement('a');
    link.href = personalInfo.resumePdf;
    link.download = 'Seddam_Tarun_Theja_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="modal-backdrop recruiter-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-modal-title"
    >
      <div 
        className="modal-container recruiter-modal-card glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="recruiter-modal-header">
          <div className="recruiter-brand-wrap">
            <span className="badge badge-warning recruiter-lightning-badge">
              <Zap size={14} className="fill-current" />
              Recruiter 60-Second Executive Summary
            </span>
            <h3 id="recruiter-modal-title" className="recruiter-candidate-name">
              {personalInfo.name}
            </h3>
            <p className="recruiter-candidate-roles">
              Target Roles: <span className="highlight-pill">Python Developer</span> &middot; <span className="highlight-pill">Data Analyst</span> &middot; <span className="highlight-pill">Software Engineer</span>
            </p>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close summary modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="recruiter-modal-body">
          {/* Quick Availability & Location Strip */}
          <div className="recruiter-status-banner">
            <div className="status-item">
              <span className="live-dot" aria-hidden="true" />
              <span><strong>Status:</strong> Immediate / Fresher Joining</span>
            </div>
            <div className="status-item">
              <MapPin size={14} className="text-accent" />
              <span><strong>Location:</strong> Andhra Pradesh &middot; Open to Relocation &amp; Remote</span>
            </div>
            <div className="status-item">
              <GraduationCap size={14} className="text-indigo" />
              <span><strong>Degree:</strong> B.Tech CSE (2023–2027) &middot; 7.33 CGPA</span>
            </div>
          </div>

          {/* 1-Click Fast Action Buttons */}
          <div className="recruiter-action-grid">
            <button 
              type="button" 
              className="btn btn-primary recruiter-btn-cta"
              onClick={handleDownloadResume}
            >
              <FileText size={17} />
              <span>Download Resume PDF</span>
            </button>

            <a 
              href={`mailto:${personalInfo.email}?subject=Interview%20Opportunity%20-%20Seddam%20Tarun%20Theja`}
              className="btn btn-secondary recruiter-btn-cta"
            >
              <Mail size={17} className="text-accent" />
              <span>Email Candidate</span>
            </a>

            <button 
              type="button" 
              className="btn btn-ghost recruiter-copy-btn"
              onClick={copyEmail}
              title="Copy Email Address"
            >
              {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
            </button>

            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="recruiter-social-link"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={17} />
              <span>LinkedIn</span>
            </a>

            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="recruiter-social-link"
              title="GitHub Profile"
            >
              <GithubIcon size={17} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Core Projects 1-Line Overview */}
          <div className="recruiter-section-box">
            <h4 className="recruiter-box-heading">
              <FolderGit2 size={16} className="text-accent" />
              Top 3 Production Projects at a Glance
            </h4>
            <div className="recruiter-projects-list">
              {projects.map((p, idx) => (
                <div key={p.id} className="recruiter-proj-item">
                  <div className="proj-item-header">
                    <span className="proj-num">0{idx + 1}</span>
                    <strong className="proj-name">{p.title}</strong>
                    <span className="badge badge-indigo">{p.category}</span>
                  </div>
                  <p className="proj-summary-text">{p.summary}</p>
                  <div className="proj-tech-tags">
                    {p.technologies.slice(0, 4).map(t => (
                      <span key={t} className="recruiter-mini-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Core Competencies Grid */}
          <div className="recruiter-dual-grid">
            {/* Practical Experience */}
            <div className="recruiter-section-box">
              <h4 className="recruiter-box-heading">
                <Award size={16} className="text-accent" />
                Internships &amp; Job Simulations
              </h4>
              <div className="recruiter-exp-list">
                {experience.map((exp, idx) => (
                  <div key={idx} className="recruiter-exp-item">
                    <div className="exp-top">
                      <strong className="exp-company">{exp.company}</strong>
                      <span className="exp-date">{exp.period}</span>
                    </div>
                    <p className="exp-role-title">{exp.role}</p>
                    <p className="exp-snippet">{exp.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="recruiter-section-box">
              <h4 className="recruiter-box-heading">
                <Code2 size={16} className="text-accent" />
                Verified Technical Stack
              </h4>
              <div className="recruiter-skills-groups">
                <div className="skill-group-line">
                  <span className="skill-group-lbl">Languages:</span>
                  <div className="skill-pills-row">
                    <span className="skill-pill-highlight">Python (OOP &amp; Data Structures)</span>
                    <span className="skill-pill-highlight">SQL (MySQL)</span>
                    <span className="skill-pill-highlight">JavaScript</span>
                  </div>
                </div>
                <div className="skill-group-line">
                  <span className="skill-group-lbl">Web &amp; Backend:</span>
                  <div className="skill-pills-row">
                    <span>Django</span>
                    <span>RESTful APIs</span>
                    <span>HTML5 / CSS3</span>
                    <span>Responsive UI</span>
                  </div>
                </div>
                <div className="skill-group-line">
                  <span className="skill-group-lbl">Data Analytics:</span>
                  <div className="skill-pills-row">
                    <span>Exploratory Data Analysis (EDA)</span>
                    <span>Predictive Time-Series Forecasting</span>
                    <span>Data Profiling</span>
                  </div>
                </div>
                <div className="skill-group-line">
                  <span className="skill-group-lbl">Tools:</span>
                  <div className="skill-pills-row">
                    <span>Git &amp; GitHub</span>
                    <span>VS Code</span>
                    <span>Jupyter Notebook</span>
                    <span>MySQL Workbench</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="recruiter-modal-footer">
          <span className="recruiter-footer-note">
            Candidate is actively available for technical interviews and hiring assessments.
          </span>
          <div className="recruiter-footer-btns">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                onOpenResumeModal();
              }}
            >
              <FileText size={15} />
              <span>Inspect Full Resume</span>
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleDownloadResume}
            >
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
