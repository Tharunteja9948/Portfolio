import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ResumeSection from './components/ResumeSection';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import RecruiterModal from './components/RecruiterModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false; // Default to Light theme as explicitly requested
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="portfolio-app-root">
      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        onOpenResumeModal={() => setIsResumeModalOpen(true)} 
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero 
          isDark={isDark} 
          onOpenResumeModal={() => setIsResumeModalOpen(true)} 
          onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
        />
        <About />
        <Skills isDark={isDark} />
        <Projects />
        <ResumeSection 
          onOpenResumeModal={() => setIsResumeModalOpen(true)} 
        />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Full Resume Viewer Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />

      {/* Recruiter 60-Second Executive Summary Modal */}
      <RecruiterModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    </div>
  );
}
