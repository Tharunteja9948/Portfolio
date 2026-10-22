import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileText, Mail, Sparkles, MapPin, Code2, Database, Zap } from 'lucide-react';
import HeroCanvas3D from './HeroCanvas3D';
import { personalInfo } from '../data/portfolioData';

const rotatingTitles = [
  "Python Developer",
  "Data Analyst",
  "Software Engineer",
  "B.Tech CSE Student (QIS College · 2023–2027)"
];

export default function Hero({ isDark, onOpenResumeModal, onOpenRecruiterModal }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // 3D Spatial Tilt Physics on Photo Frame
  const circleRef = useRef(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, opacity: 0 });
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [shockwaves, setShockwaves] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [isPhotoPulsing, setIsPhotoPulsing] = useState(false);
  const sparkThrottleRef = useRef(0);

  const handlePhotoMouseMove = (e) => {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setPhotoTilt({
      x: rotX,
      y: rotY,
      glareX,
      glareY,
      opacity: 0.4
    });

    // Spawn magnetic trailing sparks every 4 movements
    sparkThrottleRef.current += 1;
    if (sparkThrottleRef.current % 4 === 0) {
      const colors = ['#6366f1', '#06b6d4', '#818cf8', '#38bdf8', '#a78bfa'];
      const newSpark = {
        id: Math.random(),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 35,
        dy: (Math.random() - 0.5) * 35
      };
      setSparks(prev => [...prev.slice(-16), newSpark]);
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== newSpark.id));
      }, 700);
    }
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ x: 0, y: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  const handlePhotoClick = (e) => {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Trigger 3D crystal speed burst
    setSpinTrigger(prev => prev + 1);

    // 2. Play tactile pulse
    setIsPhotoPulsing(true);
    setTimeout(() => setIsPhotoPulsing(false), 350);

    // 3. Create Shockwave Ring
    const newWave = { id: Date.now() + Math.random(), x, y };
    setShockwaves(prev => [...prev.slice(-2), newWave]);
    setTimeout(() => {
      setShockwaves(prev => prev.filter(w => w.id !== newWave.id));
    }, 850);

    // 4. Burst of 14 radial sparks
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#38bdf8'];
    const burstSparks = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const speed = 40 + Math.random() * 50;
      return {
        id: Math.random(),
        x,
        y,
        size: 5 + Math.random() * 5,
        color: colors[i % colors.length],
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
      };
    });
    setSparks(prev => [...prev.slice(-10), ...burstSparks]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !burstSparks.some(b => b.id === s.id)));
    }, 800);
  };

  useEffect(() => {
    const currentTitle = rotatingTitles[titleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setTypingSpeed(75);

        if (displayText.length + 1 === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        setTypingSpeed(35);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
          setTypingSpeed(350);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, typingSpeed]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-glow" aria-hidden="true">
        <div className="glow-sphere glow-1"></div>
        <div className="glow-sphere glow-2"></div>
      </div>

      <div className="container hero-container">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          {/* Availability Pill & Recruiter 60s Trigger */}
          <div className="hero-badge-wrap">
            <span className="badge badge-emerald hero-badge">
              <span className="live-indicator-dot" aria-hidden="true"></span>
              {personalInfo.status}
            </span>
            <button
              type="button"
              className="badge badge-warning hero-recruiter-pill"
              onClick={onOpenRecruiterModal}
              title="Open 60-Second Recruiter Briefing"
            >
              <Zap size={13} className="fill-current animate-pulse" />
              <span>⚡ Recruiter 60s Summary</span>
            </button>
            <span className="hero-location-text">
              <MapPin size={13} /> {personalInfo.location}
            </span>
          </div>

          {/* Main Title & Dynamic Rotating Sub-headline */}
          <h1 className="hero-title">
            Hi, I'm <br />
            <span className="gradient-text hero-name">{personalInfo.name}</span>
          </h1>

          <div className="hero-rotating-wrap" aria-live="polite">
            <span className="rotating-arrow" aria-hidden="true">➔</span>
            <h2 className="rotating-typed-text gradient-text">{displayText}</h2>
            <span className="typewriter-cursor" aria-hidden="true">|</span>
          </div>

          {/* Natural Introductory Paragraph */}
          <p className="hero-bio">
            {personalInfo.bio}
          </p>

          {/* Tech Interest Chips */}
          <div className="hero-tech-chips" aria-label="Core Technical Interests">
            {personalInfo.technicalInterests.map((interest) => (
              <span key={interest} className="tech-chip">
                {interest}
              </span>
            ))}
          </div>

          {/* 3 Explicit Hero Action Buttons */}
          <div className="hero-actions">
            {/* 1. Explore My Projects */}
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              Explore My Projects
              <ArrowRight size={18} />
            </a>

            {/* 2. View Resume */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenResumeModal}
              aria-label="View and Download Resume PDF"
            >
              <FileText size={18} className="text-accent" />
              View Resume
            </button>

            {/* 3. Contact Me */}
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <Mail size={18} />
              Contact Me
            </a>
          </div>

          {/* Recruiter Quick Fact */}
          <div className="hero-footer-callout">
            <div className="callout-dot"></div>
            <span>
              B.Tech in CSE (2023–2027) &middot; Ready for Full-Time &amp; Internship Engagements
            </span>
          </div>
        </div>

        {/* Right Column: Circular Portrait & Interactive 3D Showcase */}
        <div className="hero-visual">
          <div 
            ref={circleRef}
            className="hero-circle-showcase"
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            onClick={handlePhotoClick}
            style={{ perspective: '1100px' }}
            title="Click portrait to trigger 3D energy pulse & spin boost"
          >
            {/* Background Interactive 3D Canvas with Speed Burst Support */}
            <div className="hero-3d-backdrop" aria-hidden="true">
              <HeroCanvas3D isDark={isDark} spinTrigger={spinTrigger} />
            </div>

            {/* Glowing Gradient Ring with Synchronized 3D Tilt */}
            <div 
              className="hero-circle-ring" 
              style={{
                transform: `rotateX(${(photoTilt.x * 0.7).toFixed(2)}deg) rotateY(${(photoTilt.y * 0.7).toFixed(2)}deg)`,
                transition: photoTilt.opacity === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.08s ease-out'
              }}
              aria-hidden="true" 
            />

            {/* Expanding Click Shockwave Rings */}
            {shockwaves.map((wave) => (
              <div 
                key={wave.id} 
                className="hero-shockwave-ring" 
                style={{ left: `${wave.x}px`, top: `${wave.y}px` }}
                aria-hidden="true" 
              />
            ))}

            {/* Magnetic Sparks and Energy Particles */}
            {sparks.map((spark) => (
              <div 
                key={spark.id} 
                className="hero-magnetic-spark"
                style={{
                  left: `${spark.x}px`,
                  top: `${spark.y}px`,
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  backgroundColor: spark.color,
                  boxShadow: `0 0 12px ${spark.color}`,
                  transform: `translate(${spark.dx}px, ${spark.dy}px)`
                }}
                aria-hidden="true" 
              />
            ))}

            {/* Circle Portrait Frame with 3D Tilt, Glare, and Pulse */}
            <div 
              className={`hero-circle-frame ${isPhotoPulsing ? 'photo-pulsing' : ''}`}
              style={{
                transform: `rotateX(${photoTilt.x.toFixed(2)}deg) rotateY(${photoTilt.y.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
                transition: photoTilt.opacity === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.08s ease-out'
              }}
            >
              <img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="hero-circle-img"
                loading="eager"
              />
              <div 
                className="hero-photo-glare"
                style={{
                  background: `radial-gradient(circle at ${photoTilt.glareX}% ${photoTilt.glareY}%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 65%)`,
                  opacity: photoTilt.opacity
                }}
                aria-hidden="true"
              />
            </div>

            {/* Clean Status Badge below the circle with Parallax Depth */}
            <div 
              className="hero-circle-badge"
              style={{
                transform: `translateX(-50%) rotateX(${(photoTilt.x * 0.4).toFixed(2)}deg) rotateY(${(photoTilt.y * 0.4).toFixed(2)}deg) translateZ(35px)`,
                transition: photoTilt.opacity === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.08s ease-out'
              }}
            >
              <span className="live-dot" />
              <span>Available &middot; CSE 2023–2027</span>
            </div>

            {/* Micro Interaction Hint */}
            <div className="hero-interactive-hint">
              <Sparkles size={12} className="text-accent animate-pulse" />
              <span>Tap to pulse &middot; Hover for 3D physics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
