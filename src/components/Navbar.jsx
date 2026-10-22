import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Cpu, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Mail, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ArrowRight, 
  ArrowUpRight,
  Download,
  Copy,
  Check,
  Sparkles,
  Zap
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ isDark, setIsDark, onOpenResumeModal, onOpenRecruiterModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Line-by-line navigation directory data
  const navDirectory = [
    {
      index: '01',
      name: 'Home',
      href: '#home',
      subtitle: 'Introduction & Interactive 3D Core',
      icon: Home
    },
    {
      index: '02',
      name: 'About Me',
      href: '#about',
      subtitle: 'Academic Background, Stats & Core Focus',
      icon: User
    },
    {
      index: '03',
      name: 'Technical Skills',
      href: '#skills',
      subtitle: 'Python, SQL, Web Tech & Data Analytics',
      icon: Cpu
    },
    {
      index: '04',
      name: 'Featured Projects',
      href: '#projects',
      subtitle: 'AI Interview Platform, Call Dashboard, Recipe Engine',
      icon: FolderGit2
    },
    {
      index: '05',
      name: 'Practical Experience',
      href: '#experience',
      subtitle: 'Deloitte Data Analytics & EduSkills Virtual Internships',
      icon: Briefcase
    },
    {
      index: '06',
      name: 'Education & Academics',
      href: '#education',
      subtitle: 'B.Tech in CSE (2023–2027) · Intermediate (MPC)',
      icon: GraduationCap
    },
    {
      index: '07',
      name: 'Curriculum Vitae',
      href: '#resume',
      subtitle: 'Official Resume PDF View & Instant Download',
      icon: FileText
    },
    {
      index: '08',
      name: 'Contact & Hire',
      href: '#contact',
      subtitle: 'Direct Recruiter Channels & Message Form',
      icon: Mail
    }
  ];

  // Primary compact links for desktop top bar (uncluttered)
  const compactDesktopLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navDirectory.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when line-by-line drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Monogram & Name */}
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => handleLinkClick(e, '#home')}
            aria-label="Seddam Tarun Theja Portfolio Home"
          >
            <div className="brand-logo-icon">
              <img src={personalInfo.photo} alt={personalInfo.name} className="brand-avatar-img" />
            </div>
            <div className="brand-text">
              <span className="brand-name">Tarun Theja</span>
              <span className="brand-role">
                <span className="live-dot" aria-hidden="true"></span>
                CSE Student &middot; Open to Roles
              </span>
            </div>
          </a>

          {/* Desktop Compact Navigation (Clean & Uncluttered) */}
          <nav className="desktop-compact-nav" aria-label="Quick Navigation">
            <ul className="compact-nav-list">
              {compactDesktopLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`compact-nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.name}
                      {isActive && <span className="active-pill" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Controls */}
          <div className="nav-actions">
            {/* Quick 60s Recruiter Executive Summary */}
            <button
              type="button"
              className="btn btn-outline nav-recruiter-btn"
              onClick={onOpenRecruiterModal}
              aria-label="Open 60-Second Recruiter Executive Summary"
              title="60-Second Recruiter Summary"
            >
              <Zap size={14} className="text-warning animate-pulse" />
              <span>⚡ 60s Summary</span>
            </button>

            {/* Quick Resume View Button */}
            <button
              type="button"
              className="btn btn-secondary nav-resume-btn"
              onClick={onOpenResumeModal}
              aria-label="Open Resume Document"
            >
              <FileText size={15} />
              <span>Resume</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
            </button>

            {/* Line-by-Line Menu Trigger Button (Prominent & Clean) */}
            <button
              type="button"
              className={`line-menu-trigger-btn ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open line-by-line navigation directory"}
              aria-expanded={menuOpen}
            >
              <span className="trigger-label">{menuOpen ? 'Close' : 'Menu'}</span>
              <div className="trigger-icon-box">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
         LINE-BY-LINE NAVIGATION DIRECTORY (Full overlay / slide panel)
         Clean, structured, line by line only - zero clumsiness
      ===================================================================== */}
      {menuOpen && (
        <div 
          className="line-nav-overlay"
          onClick={() => setMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Line by line navigation directory"
        >
          <div 
            className="line-nav-panel glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel Header */}
            <div className="line-nav-panel-header">
              <div className="panel-user-profile">
                <img src={personalInfo.photo} alt={personalInfo.name} className="panel-avatar-img" />
                <div className="panel-header-title-box">
                  <span className="badge badge-indigo">
                    <Sparkles size={13} /> Navigation Directory
                  </span>
                  <h3 className="panel-title">{personalInfo.name}</h3>
                  <p className="panel-sub">Select any section to navigate smoothly</p>
                </div>
              </div>

              <button
                type="button"
                className="panel-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation directory"
              >
                <X size={22} />
              </button>
            </div>

            {/* Line-by-Line Navigation Items List */}
            <div className="line-nav-items-container">
              <ul className="line-nav-list" role="list">
                {navDirectory.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);

                  return (
                    <li key={item.index} className="line-nav-row-wrapper">
                      <a
                        href={item.href}
                        className={`line-nav-row ${isActive ? 'active-row' : ''}`}
                        onClick={(e) => handleLinkClick(e, item.href)}
                      >
                        {/* 1. Monospace Number Index */}
                        <span className="line-item-index" aria-hidden="true">
                          {item.index}
                        </span>

                        {/* 2. Section Icon Pill */}
                        <div className="line-item-icon-pill">
                          <Icon size={18} />
                        </div>

                        {/* 3. Section Title & Subtitle */}
                        <div className="line-item-text">
                          <span className="line-item-title">{item.name}</span>
                          <span className="line-item-subtitle">{item.subtitle}</span>
                        </div>

                        {/* 4. Active Status Indicator */}
                        {isActive && (
                          <div className="line-active-badge">
                            <span className="live-dot" />
                            <span>Current</span>
                          </div>
                        )}

                        {/* 5. Trailing Arrow */}
                        <div className="line-item-arrow" aria-hidden="true">
                          <ArrowRight size={18} />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Line Navigation Footer / Quick Actions */}
            <div className="line-nav-footer">
              <div className="line-nav-footer-actions">
                {/* Resume Download Action */}
                <a
                  href={personalInfo.resumePath}
                  download={personalInfo.resumeFilename}
                  className="btn btn-primary line-footer-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={16} />
                  Download Resume (PDF)
                </a>

                {/* Email Copy Action */}
                <button
                  type="button"
                  className="btn btn-secondary line-footer-btn"
                  onClick={copyEmail}
                >
                  {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Official Email'}</span>
                </button>
              </div>

              {/* Social Channels Line */}
              <div className="line-nav-footer-channels">
                <span className="footer-channels-label">Direct Connect:</span>
                <div className="channels-pill-group">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-pill"
                    title="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-pill"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="channel-pill"
                    title="Email"
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
