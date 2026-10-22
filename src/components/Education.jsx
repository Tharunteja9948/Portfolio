import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle } from 'lucide-react';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} />
            Academic Foundations
          </div>
          <h2 className="section-title">
            Education &amp; <br />
            <span className="gradient-text">Academic Qualifications</span>
          </h2>
          <p className="section-description">
            A consistent academic journey marked by disciplined problem solving, strong quantitative fundamentals, and formal Computer Science training.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="education-grid">
          {education.map((item, idx) => (
            <div key={idx} className="education-card glass-card">
              <div className="education-card-top">
                <div className="edu-icon-wrap">
                  <GraduationCap size={24} className="text-accent" />
                </div>
                <div className="edu-score-badge">
                  <Award size={15} className="text-emerald" />
                  <span>{item.score}</span>
                </div>
              </div>

              <div className="education-card-body">
                <span className="edu-period">
                  <Calendar size={13} />
                  {item.period}
                </span>

                <h3 className="edu-degree">{item.degree}</h3>
                
                <h4 className="edu-institution">{item.institution}</h4>
                
                <p className="edu-location">
                  <MapPin size={13} />
                  {item.location}
                </p>

                <p className="edu-details">{item.details}</p>
              </div>

              <div className="education-card-footer">
                <span className="score-label">{item.scoreLabel}:</span>
                <span className="score-value">{item.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
