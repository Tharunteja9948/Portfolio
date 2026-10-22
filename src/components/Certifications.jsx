import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, CheckCircle2, Bookmark, ExternalLink, X, Download, Eye, FileText } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Certifications() {
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

  const coursework = [
    { title: "Data Structures & Algorithms (DSA)", desc: "Complexity analysis, arrays, stacks, trees, sorting & algorithmic optimization." },
    { title: "Object-Oriented Programming (OOP)", desc: "Class architecture, inheritance, polymorphism, encapsulation, and modular design." },
    { title: "Relational Database Management (RDBMS)", desc: "MySQL schema design, normalization, joins, indexing, and ACID transaction safety." }
  ];

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            Verified Credentials
          </div>
          <h2 className="section-title">
            Certifications &amp; <br />
            <span className="gradient-text">Verified Qualifications</span>
          </h2>
          <p className="section-description">
            Recognized industry credentials issued by NPTEL (IIT Roorkee), Microsoft, and Reliance Foundation. Each certificate is backed by the official verified document with roll number and score.
          </p>
        </div>

        {/* Certifications Grid with 3D TiltCards */}
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <TiltCard 
              key={cert.id} 
              maxTilt={6} 
              scale={1.02} 
              glare={true}
              className="cert-tilt-item"
            >
              <div className="cert-card glass-card">
                {/* Certificate Preview Image */}
                <div 
                  className="cert-card-preview-wrap"
                  onClick={() => setSelectedCert(cert)}
                  title="Click to inspect verified certificate"
                >
                  <img 
                    src={cert.certificateImage} 
                    alt={`${cert.title} Certificate for Seddam Tarun Theja`}
                    className="cert-preview-img"
                    loading="lazy"
                  />
                  <div className="cert-preview-overlay">
                    <span className="cert-preview-btn">
                      <Eye size={14} />
                      Click to Inspect
                    </span>
                  </div>
                </div>

                <div className="cert-card-top">
                  <span className="badge badge-indigo">{cert.category}</span>
                  <span className="badge badge-cyan">{cert.badge}</span>
                </div>

                <div className="cert-card-body">
                  <span className="cert-period">{cert.period}</span>
                  <h3 className="cert-title" onClick={() => setSelectedCert(cert)}>{cert.title}</h3>
                  <h4 className="cert-issuer">{cert.issuer}</h4>
                  <p className="cert-desc">{cert.description}</p>
                  
                  {cert.credentialId && (
                    <div className="cert-id-tag">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="cert-card-footer">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedCert(cert)}
                    aria-label={`View certificate document for ${cert.title}`}
                  >
                    <Eye size={14} />
                    <span>View Certificate</span>
                  </button>

                  <a
                    href={cert.certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    aria-label={`Open verified PDF for ${cert.title} in new tab`}
                    title="Open Official PDF"
                  >
                    <span>Open PDF</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Core Computer Science Coursework Grid */}
        <div className="coursework-block glass-card">
          <div className="coursework-header">
            <div className="coursework-title-wrap">
              <Bookmark size={20} className="text-accent" />
              <h3 className="coursework-heading">Core Computer Science Coursework</h3>
            </div>
            <span className="badge badge-cyan">Curriculum Foundations</span>
          </div>

          <div className="coursework-grid">
            {coursework.map((course, idx) => (
              <div key={idx} className="coursework-item">
                <h4 className="course-title">{course.title}</h4>
                <p className="course-desc">{course.desc}</p>
              </div>
            ))}
          </div>
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
                <span className="badge badge-indigo">{selectedCert.category}</span>
                <h3 className="modal-title">{selectedCert.title}</h3>
                <p className="modal-subtitle">Issued by <strong>{selectedCert.issuer}</strong> &middot; {selectedCert.period}</p>
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
                  alt={`${selectedCert.title} Certificate`}
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
                  <span className="cert-meta-label">Verification ID</span>
                  <span className="cert-meta-val">{selectedCert.credentialId}</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Consolidated Score / Hours</span>
                  <span className="cert-meta-val font-semibold text-emerald">{selectedCert.score}</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Credits / Scope</span>
                  <span className="cert-meta-val">{selectedCert.credits}</span>
                </div>
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
