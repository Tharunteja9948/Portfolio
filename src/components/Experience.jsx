import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Sparkles, Building2, Eye, ExternalLink, Download, X, ShieldCheck, Layers } from 'lucide-react';
import { internships, jobSimulations, experience } from '../data/portfolioData';

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'internship' | 'simulation'
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const filteredItems = activeFilter === 'all'
    ? experience
    : activeFilter === 'internship'
    ? internships
    : jobSimulations;

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            Practical Experience
          </div>
          <h2 className="section-title">
            Virtual Internships &amp; <br />
            <span className="gradient-text">Industry Job Simulations</span>
          </h2>
          <p className="section-description">
            Structured full-stack engineering internships and enterprise consulting job simulations. Each experience is backed by official verified completion certificates and credential IDs.
          </p>

          {/* Filter Pills for Internships vs Job Simulations */}
          <div className="experience-filter-bar">
            <button
              type="button"
              className={`filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Experience ({experience.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${activeFilter === 'internship' ? 'active' : ''}`}
              onClick={() => setActiveFilter('internship')}
            >
              💼 Virtual Internships ({internships.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${activeFilter === 'simulation' ? 'active' : ''}`}
              onClick={() => setActiveFilter('simulation')}
            >
              🏢 Job Simulations ({jobSimulations.length})
            </button>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="experience-timeline">
          {filteredItems.map((item, idx) => (
            <div key={item.id || idx} className="timeline-item">
              {/* Timeline Marker */}
              <div className="timeline-marker">
                <div className="marker-dot">
                  <div className="marker-inner"></div>
                </div>
                {idx < filteredItems.length - 1 && <div className="marker-line"></div>}
              </div>

              {/* Timeline Card */}
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div className="timeline-title-wrap">
                    <div className="experience-badges-row">
                      <span className={`badge ${item.category === 'internship' ? 'badge-indigo' : 'badge-cyan'} timeline-type-badge`}>
                        {item.type}
                      </span>
                      <span className="badge badge-emerald">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="experience-role">{item.role}</h3>
                    
                    <div className="experience-company-wrap">
                      <Building2 size={16} className="text-accent" />
                      <span className="experience-company">{item.company}</span>
                      {item.supportedBy && (
                        <span className="experience-sub-org">({item.supportedBy})</span>
                      )}
                    </div>
                  </div>

                  <div className="timeline-meta">
                    <div className="meta-pill">
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>
                    <div className="meta-pill">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview Card */}
                {item.certificateImage && (
                  <div 
                    className="experience-cert-thumbnail-wrap"
                    onClick={() => setSelectedCert(item)}
                    title="Click to view verified completion certificate"
                  >
                    <img 
                      src={item.certificateImage} 
                      alt={`${item.role} Certificate for Seddam Tarun Theja`}
                      className="experience-cert-thumb-img"
                      loading="lazy"
                    />
                    <div className="experience-cert-thumb-overlay">
                      <span className="cert-preview-btn">
                        <Eye size={14} />
                        Inspect Verified Certificate
                      </span>
                    </div>
                  </div>
                )}

                <p className="experience-summary">{item.summary}</p>

                {/* Key Achievements / Bullet Points */}
                <div className="experience-bullets">
                  {item.bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="bullet-item">
                      <CheckCircle2 size={17} className="bullet-icon text-emerald" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Learned Badges */}
                <div className="experience-skills-learned">
                  <span className="skills-learned-label">Competencies Practiced:</span>
                  <div className="skills-learned-chips">
                    {item.skillsLearned.map((skill, sIdx) => (
                      <span key={sIdx} className="tech-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate Action Footer */}
                {item.certificatePdf && (
                  <div className="experience-card-footer">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedCert(item)}
                      aria-label={`View certificate for ${item.role}`}
                    >
                      <Eye size={14} />
                      <span>View Certificate</span>
                    </button>

                    <a
                      href={item.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      aria-label={`Open verified PDF for ${item.role} in new tab`}
                      title="Open Official PDF"
                    >
                      <span>Open PDF</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Clarification Box */}
        <div className="experience-clarification-note glass-card">
          <div className="clarification-icon">
            <Award size={20} className="text-accent" />
          </div>
          <p className="clarification-text">
            <strong>Professional Transparency:</strong> The experiences above represent structured virtual internships (accredited through AICTE &amp; EduSkills) and industry job simulations (via Forage with Datacom, Commonwealth Bank, Deloitte &amp; Tata Group). All 6 credentials are documented with verifiable certificate codes and institutional sign-offs.
          </p>
        </div>
      </div>

      {/* Credential Details Inspection Modal */}
      {selectedCert && (
        <div 
          className="modal-backdrop" 
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="modal-container cert-inspect-modal glass-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px' }}
          >
            <div className="modal-header">
              <div className="modal-header-info">
                <span className={`badge ${selectedCert.category === 'internship' ? 'badge-indigo' : 'badge-cyan'}`}>
                  {selectedCert.type}
                </span>
                <h3 className="modal-title">{selectedCert.role}</h3>
                <p className="modal-subtitle">
                  {selectedCert.company} &middot; {selectedCert.period}
                </p>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body cert-inspect-body">
              {/* Actual Certificate Document Image */}
              <div className="cert-document-frame">
                <img 
                  src={selectedCert.certificateImage} 
                  alt={`${selectedCert.role} Certificate`}
                  className="cert-modal-full-image"
                />
              </div>

              {/* Verified Details Metadata */}
              <div className="cert-meta-grid">
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Recipient</span>
                  <span className="cert-meta-val font-semibold">Seddam Tarun Theja</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Organization</span>
                  <span className="cert-meta-val font-semibold">{selectedCert.company}</span>
                </div>
                {selectedCert.certificateId && (
                  <div className="cert-meta-item">
                    <span className="cert-meta-label">Credential Verification ID</span>
                    <span className="cert-meta-val">{selectedCert.certificateId}</span>
                  </div>
                )}
                {selectedCert.studentId && (
                  <div className="cert-meta-item">
                    <span className="cert-meta-label">Student ID</span>
                    <span className="cert-meta-val">{selectedCert.studentId}</span>
                  </div>
                )}
                {selectedCert.userVerificationCode && (
                  <div className="cert-meta-item">
                    <span className="cert-meta-label">User Verification Code</span>
                    <span className="cert-meta-val">{selectedCert.userVerificationCode}</span>
                  </div>
                )}
                {selectedCert.grade && (
                  <div className="cert-meta-item">
                    <span className="cert-meta-label">Evaluation Grade</span>
                    <span className="cert-meta-val font-semibold text-emerald">{selectedCert.grade}</span>
                  </div>
                )}
                {selectedCert.signatory && (
                  <div className="cert-meta-item">
                    <span className="cert-meta-label">Signatory</span>
                    <span className="cert-meta-val">{selectedCert.signatory}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer cert-inspect-footer">
              <div className="cert-footer-status">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Verified Official Credential Document</span>
              </div>
              <div className="cert-footer-actions">
                <a 
                  href={selectedCert.certificatePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <ExternalLink size={14} />
                  <span>Open in Tab</span>
                </a>
                <a 
                  href={selectedCert.certificatePdf}
                  download
                  className="btn btn-primary btn-sm"
                >
                  <Download size={14} />
                  <span>Download Verified PDF</span>
                </a>
                <button 
                  type="button" 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSelectedCert(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
