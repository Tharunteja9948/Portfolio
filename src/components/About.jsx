import React from 'react';
import { User, Code2, Database, BarChart3, GraduationCap, CheckCircle2, Sparkles, FolderGit2 } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <User size={14} />
            About My Background
          </div>
          <h2 className="section-title">
            Passionate About Building <br />
            <span className="gradient-text">Practical, Data-Driven Software</span>
          </h2>
          <p className="section-description">
            A grounded overview of my technical education, problem-solving mindset, and hands-on software development experience.
          </p>
        </div>

        {/* Grid: Narrative + Highlight Cards */}
        <div className="about-grid">
          {/* Left Column: Authentic Professional Narrative */}
          <div className="about-narrative glass-card">
            <div className="narrative-header">
              <div className="avatar-photo-chip">
                <img src={personalInfo.photo} alt={personalInfo.name} className="about-avatar-img" />
                <span className="avatar-live-indicator" title="Open to full-time roles" />
              </div>
              <div>
                <h3 className="narrative-name">{personalInfo.name}</h3>
                <p className="narrative-sub">{personalInfo.headline}</p>
              </div>
            </div>

            <div className="narrative-body">
              <p>
                I am a final-year Computer Science & Engineering undergraduate at <strong>QIS College of Engineering and Technology</strong> (Prakasam, Andhra Pradesh). My technical passion lies at the intersection of <strong>Python development, responsive web applications, and exploratory data analytics</strong>.
              </p>
              <p>
                Rather than treating coding as purely theoretical, I focus on turning real requirements into functioning, scalable software. Whether it's architecting an automated mock interview platform with adaptive question routing and hardware checks, building an emergency call forecasting dashboard for Andhra Pradesh districts, or optimizing database queries for instant recipe recommendations, I build with attention to clean code, database integrity, and practical usability.
              </p>
              <p>
                Having completed hands-on virtual job simulations with <strong>Datacom, Commonwealth Bank, Deloitte & TATA Group via Forage</strong> (software review & bug fixing, web engineering, cybersecurity, risk profiling & collections strategy) and <strong>EduSkills</strong> (full-stack web workflows), I have developed a disciplined approach to version control, RESTful APIs, and end-to-end development. I am eager to contribute my skills to a collaborative engineering team as a <strong>Python Developer or Software Engineer</strong>.
              </p>
            </div>

            {/* Core Values / Competency List */}
            <div className="competencies-list">
              <div className="competency-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Clean, maintainable Python programming (OOP &amp; Data Structures)</span>
              </div>
              <div className="competency-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Relational database design &amp; query optimization with SQL</span>
              </div>
              <div className="competency-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Collaborative development via Git, GitHub, and VS Code</span>
              </div>
              <div className="competency-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Data Visualization &amp; Executive Dashboards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metric & Focus Area Cards */}
          <div className="about-highlights-column">
            {/* 4 Quick Stat Cards */}
            <div className="stat-cards-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-card">
                  <div className="stat-value gradient-text">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-subtitle">{stat.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Technical Focus Pillars */}
            <div className="focus-pillars">
              <div className="pillar-card glass-card">
                <div className="pillar-icon bg-indigo">
                  <Code2 size={22} className="text-indigo" />
                </div>
                <div className="pillar-content">
                  <h4 className="pillar-title">Python Developer</h4>
                  <p className="pillar-desc">
                    Designing modular services, RESTful endpoints, data structures, and automation scripts using Python and Django.
                  </p>
                </div>
              </div>

              <div className="pillar-card glass-card">
                <div className="pillar-icon bg-cyan">
                  <BarChart3 size={22} className="text-cyan" />
                </div>
                <div className="pillar-content">
                  <h4 className="pillar-title">Data Analytics</h4>
                  <p className="pillar-desc">
                    Extracting insights through EDA, temporal visualizations, and predictive models that support data-driven decision-making.
                  </p>
                </div>
              </div>

              <div className="pillar-card glass-card">
                <div className="pillar-icon bg-emerald">
                  <Database size={22} className="text-emerald" />
                </div>
                <div className="pillar-content">
                  <h4 className="pillar-title">Databases &amp; SQL</h4>
                  <p className="pillar-desc">
                    Structuring relational MySQL databases, writing multi-table queries, and connecting backends to responsive web clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
