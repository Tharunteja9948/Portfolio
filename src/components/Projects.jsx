import React, { useState, useRef } from 'react';
import { FolderGit2, ExternalLink, ArrowRight, Sparkles, Mic, BarChart2, Utensils, MessageSquare, Terminal, Play } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';
import ProjectDetailModal from './ProjectDetailModal';
import TiltCard from './TiltCard';

// 3D Tilt Card Component
function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Get project preview icon / visual badge
  const renderVisualBadge = () => {
    switch (project.id) {
      case 'ai-interview-platform':
        return (
          <div className="project-preview-mock interview-mock">
            <div className="mock-top-bar">
              <span className="mock-dot red"></span>
              <span className="mock-dot yellow"></span>
              <span className="mock-dot green"></span>
              <span className="mock-badge">MIC READY &middot; CAMERA ACTIVE</span>
            </div>
            <div className="mock-center-visual">
              <div className="audio-wave-bars">
                <span className="bar b1"></span>
                <span className="bar b2"></span>
                <span className="bar b3"></span>
                <span className="bar b4"></span>
                <span className="bar b5"></span>
              </div>
              <p className="mock-prompt-text">"Explain Python Memory Management &amp; Garbage Collection"</p>
            </div>
            <div className="mock-bottom-tags">
              <span>8 Rubric Scoring</span>
              <span>11 Career Tracks</span>
              <span>Tab Anti-Cheat</span>
            </div>
          </div>
        );
      case 'ai-call-dashboard':
        return (
          <div className="project-preview-mock analytics-mock">
            <div className="mock-top-bar">
              <span className="mock-dot red"></span>
              <span className="mock-dot yellow"></span>
              <span className="mock-dot green"></span>
              <span className="mock-badge">ANDHRA PRADESH CALL LOGS</span>
            </div>
            <div className="mock-chart-visual">
              <div className="chart-bar-group">
                <div className="chart-bar h-60"><span>Visakhapatnam</span></div>
                <div className="chart-bar h-85 highlight"><span>Vijayawada</span></div>
                <div className="chart-bar h-45"><span>Guntur</span></div>
                <div className="chart-bar h-70"><span>Prakasam</span></div>
                <div className="chart-bar h-50"><span>Tirupati</span></div>
              </div>
            </div>
            <div className="mock-bottom-tags">
              <span>Time-Series ML</span>
              <span>Incident Classification</span>
              <span>Resource Allocation</span>
            </div>
          </div>
        );
      case 'leftover-food-recipe-generator':
        return (
          <div className="project-preview-mock recipe-mock">
            <div className="mock-top-bar">
              <span className="mock-dot red"></span>
              <span className="mock-dot yellow"></span>
              <span className="mock-dot green"></span>
              <span className="mock-badge">INGREDIENT MATCHING ENGINE</span>
            </div>
            <div className="recipe-ingredient-chips">
              <span className="ing-chip active">🍅 Tomatoes</span>
              <span className="ing-chip active">🧄 Garlic</span>
              <span className="ing-chip active">🍚 Rice</span>
              <span className="ing-chip active">🧅 Onion</span>
            </div>
            <div className="recipe-result-preview">
              <span className="recipe-title-text">⚡ Instant Recipe Generated: Tomato Herb Pilaf</span>
            </div>
            <div className="mock-bottom-tags">
              <span>Optimized Queries</span>
              <span>Zero Waste</span>
              <span>Step-by-Step Cooking</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`project-card glass-card ${isHovered ? 'tilt-active' : ''}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Visual Mockup Preview */}
      <div className="project-card-visual" onClick={() => onSelect(project)}>
        {renderVisualBadge()}
        <div className="project-visual-overlay">
          <span className="preview-overlay-btn">
            Click to View Technical Details
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="project-card-body">
        <div className="project-card-header">
          <span className="badge badge-indigo project-category-badge">
            {project.category}
          </span>
          <h3 className="project-title" onClick={() => onSelect(project)}>
            {project.title}
          </h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        <p className="project-summary">{project.summary}</p>

        {/* Tech Tag Pills */}
        <div className="project-tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-chip">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-chip text-muted">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Actions Bar */}
        <div className="project-card-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm github-repo-btn"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <GithubIcon size={15} />
              <span>GitHub Repo</span>
              <ExternalLink size={13} />
            </a>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onSelect(project, 'overview')}
            aria-label={`View technical details for ${project.title}`}
          >
            <span>Project Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalConfig, setModalConfig] = useState(null); // { project }

  const filterOptions = ['All', 'Python & AI', 'Data Analytics', 'Web Development'];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.categoryTags.includes(selectedFilter) || p.category === selectedFilter);

  const handleOpenModal = (project) => {
    setModalConfig({ project });
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            Featured Software Projects
          </div>
          <h2 className="section-title">
            Engineered Systems &amp; <br />
            <span className="gradient-text">Practical Applications</span>
          </h2>
          <p className="section-description">
            Documented software projects hosted on GitHub, focused on practical problem-solving, clean architecture, database integration, and analytical modeling.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filter-bar">
          <div className="filter-pills" role="tablist" aria-label="Filter projects">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                role="tab"
                aria-selected={selectedFilter === opt}
                className={`filter-pill-btn ${selectedFilter === opt ? 'active' : ''}`}
                onClick={() => setSelectedFilter(opt)}
              >
                {opt}
                <span className="filter-count">
                  {opt === 'All'
                    ? projects.length
                    : projects.filter(p => p.categoryTags.includes(opt) || p.category === opt).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} maxTilt={5} scale={1.01} glare={true} className="project-tilt-wrapper">
              <ProjectCard
                project={project}
                onSelect={handleOpenModal}
              />
            </TiltCard>
          ))}
        </div>

        {/* Recruiter Verified Repos Banner */}
        <div className="projects-recruiter-banner glass-card">
          <div className="banner-left">
            <GithubIcon size={24} className="text-accent" />
            <div>
              <h4 className="banner-heading">Verified Source Code on GitHub</h4>
              <p className="banner-text">
                Every project listed above has an accessible repository with commit histories, schemas, and source code.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/Tharunteja9948"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit GitHub Profile
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Project Detail & Simulator Modal */}
      {modalConfig && (
        <ProjectDetailModal
          project={modalConfig.project}
          initialTab={modalConfig.tab}
          onClose={() => setModalConfig(null)}
        />
      )}
    </section>
  );
}
