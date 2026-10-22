import React, { useState } from 'react';
import { Cpu, Sparkles, Info } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function Skills({ isDark }) {
  const [activeTab, setActiveTab] = useState('all');

  const tabList = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages & Query' },
    { id: 'web', label: 'Web & Backend' },
    { id: 'data', label: 'Data Analytics' },
    { id: 'tools', label: 'Tools & Core CS' }
  ];

  const filteredCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            Technical Expertise
          </div>
          <h2 className="section-title">
            Skills &amp; Technologies <br />
            <span className="gradient-text">Applied in Real-World Projects</span>
          </h2>
          <p className="section-description">
            Organized by functional domains. Each skill reflects genuine hands-on implementation across my project builds and virtual internships.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="skills-tabs-container">
          <div className="skills-tabs" role="tablist" aria-label="Skill Categories">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`skill-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Display */}
        <div className="skills-categories-wrapper">
          {filteredCategories.map((category) => (
            <div key={category.id} className="skill-category-block">
              <div className="category-header-wrap">
                <h3 className="category-title">{category.name}</h3>
                <p className="category-desc">{category.description}</p>
              </div>

              <div className="skills-grid">
                {category.skills.map((skill) => (
                  <TiltCard key={skill.name} maxTilt={8} scale={1.02} glare={true}>
                    <div className="skill-card glass-card">
                      <div className="skill-card-top">
                        <div className="skill-info">
                          <h4 className="skill-name">{skill.name}</h4>
                          <span className="skill-level">{skill.level}</span>
                        </div>
                        <span className="badge badge-indigo skill-tag-pill">
                          {skill.tag}
                        </span>
                      </div>

                      <div className="skill-card-divider" />

                      <div className="skill-usecase">
                        <div className="usecase-label">
                          <Info size={13} className="text-accent" />
                          <span>Practical Application</span>
                        </div>
                        <p className="usecase-text">{skill.useCase}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recruiter Note */}
        <div className="skills-footer-note glass-card">
          <div className="note-icon">
            <Sparkles size={20} className="text-accent" />
          </div>
          <div className="note-content">
            <strong>Honest Skill Representation:</strong> Rather than arbitrary percentage bars (e.g. "Python 95%"), each technology is backed by tangible project implementations, database schemas, and data pipelines documented in my GitHub repositories.
          </div>
        </div>
      </div>
    </section>
  );
}
