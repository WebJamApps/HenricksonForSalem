/**
 * @file index.tsx
 * @description Main application layout for Mark Henrickson for Salem City Council campaign.
 * Updated with official campaign text & photos from Dropbox (Initial Website content.docx & Images).
 */

import { useState, useEffect } from 'react';

export function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYardSignModalOpen, setIsYardSignModalOpen] = useState(false);

  // Yard sign request form state
  const [propertyType, setPropertyType] = useState<'residential' | 'business'>('residential');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [permission, setPermission] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleYardSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (propertyType === 'business' && !businessName.trim()) {
      setFormError('Please enter your business name.');
      return;
    }

    if (!address.trim()) {
      setFormError('Please enter your physical address.');
      return;
    }

    const lowerAddress = address.toLowerCase();
    if (!lowerAddress.includes('salem')) {
      setFormError('Physical address must be located within the city of Salem, Virginia.');
      return;
    }

    if (!phone.trim()) {
      setFormError('Please enter a contact phone number.');
      return;
    }

    if (!permission) {
      setFormError('Please check the box granting permission to install the sign visible to the street.');
      return;
    }

    const recipients = 'henmark1@aol.com,JRHenrickson@gmail.com';
    const subject = `Yard Sign Request - ${fullName.trim()}`;
    const bodyLines = [
      'Yard Sign Request Details:',
      `Full Name: ${fullName.trim()}`,
      `Property Type: ${propertyType === 'business' ? 'Business' : 'Residential'}`,
      propertyType === 'business' ? `Business Name: ${businessName.trim()}` : null,
      `Physical Address: ${address.trim()}`,
      `Phone Number: ${phone.trim()}`,
      'Permission granted for sign to be installed visible to street: Yes',
    ].filter(Boolean);

    const mailtoUrl = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }
    setFormSubmitted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsYardSignModalOpen(false);
      }
    };
    if (isMenuOpen || isYardSignModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isYardSignModalOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="campaign-container">
      {/* Sticky Navigation Header */}
      <header className="campaign-nav">
        <div className="nav-content">
          <a href="/" className="nav-logo-group" aria-label="Mark Henrickson Home">
            <svg
              className="nav-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="nav-logo-text">MARK HENRICKSON</span>
          </a>
          <nav className="nav-links" aria-label="Desktop navigation">
            <a href="#about" className="nav-link">Meet Mark</a>
            <a href="#why-running" className="nav-link">Why I'm Running</a>
            <a href="#values" className="nav-link">My Values</a>
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#join" className="nav-link">Get Involved</a>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              type="button"
            >
              {theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </nav>

          {/* Hamburger button (visible on mobile only) */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`} id="mobile-menu">
          <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
            <a href="#about" className="mobile-drawer-link" onClick={handleLinkClick}>
              Meet Mark
            </a>
            <a href="#why-running" className="mobile-drawer-link" onClick={handleLinkClick}>
              Why I'm Running
            </a>
            <a href="#values" className="mobile-drawer-link" onClick={handleLinkClick}>
              My Values
            </a>
            <a href="#platform" className="mobile-drawer-link" onClick={handleLinkClick}>
              Platform
            </a>
            <a href="#join" className="mobile-drawer-link" onClick={handleLinkClick}>
              Get Involved
            </a>
            <button
              onClick={toggleTheme}
              className="mobile-theme-toggle-btn"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              type="button"
            >
              {theme === 'light' ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Switch to dark theme</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Switch to light theme</span>
                </>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-tag">SALEM CITY COUNCIL CANDIDATE</div>
            <h1 className="hero-title">
              Mark Henrickson <br />
              <span className="hero-title-accent">for Salem City Council</span>
            </h1>
            <p className="hero-subtitle">
              Building a Stronger Salem Together. Mark is dedicated to practical leadership, 
              thoughtful planning, and common-sense decision-making for our city's future.
            </p>
            <div className="quote-banner">
              <p>
                "Mark has spent a lifetime solving problems, earning trust, and taking responsibility. 
                That's exactly the kind of person we want helping lead Salem."
              </p>
            </div>
            <div className="hero-actions">
              <a href="#join" className="btn-primary" id="hero-btn-join">
                Join the Campaign
              </a>
              <a href="#platform" className="btn-secondary" id="hero-btn-platform">
                Explore the Platform
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-gallery" aria-label="Campaign community engagement gallery">
              {/* Slide 1 */}
              <div
                className={`gallery-slide ${activeSlide === 0 ? 'active' : 'inactive'}`}
                aria-hidden={activeSlide !== 0}
              >
                <img
                  src="/images/mark-henrickson-1.png"
                  alt="Mark Henrickson hero portrait"
                  className="slide-img"
                />
                <div className="slide-overlay">
                  <span className="slide-label">PRACTICAL LEADERSHIP</span>
                  <p className="slide-caption">Solving problems and building relationships in Salem for over 30 years.</p>
                </div>
              </div>

              {/* Slide 2 */}
              <div
                className={`gallery-slide ${activeSlide === 1 ? 'active' : 'inactive'}`}
                aria-hidden={activeSlide !== 1}
              >
                <img
                  src="/images/mark-community-1.png"
                  alt="Mark Henrickson community event"
                  className="slide-img"
                />
                <div className="slide-overlay">
                  <span className="slide-label">COMMUNITY ENGAGEMENT</span>
                  <p className="slide-caption">Listening directly to Salem residents and working together for our future.</p>
                </div>
              </div>

              {/* Slide 3 */}
              <div
                className={`gallery-slide ${activeSlide === 2 ? 'active' : 'inactive'}`}
                aria-hidden={activeSlide !== 2}
              >
                <img
                  src="/images/mark-community-2.png"
                  alt="Mark Henrickson civic service"
                  className="slide-img"
                />
                <div className="slide-overlay">
                  <span className="slide-label">SERVICE ABOVE SELF</span>
                  <p className="slide-caption">Decades of dedicated involvement with Rotary, Planning Commission, and local youth.</p>
                </div>
              </div>

              {/* Manual navigation indicators */}
              <div className="gallery-bullets">
                {[0, 1, 2].map(idx => (
                  <a
                    key={idx}
                    href={`#slide-${idx}`}
                    className={`bullet-dot ${activeSlide === idx ? 'active' : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      setActiveSlide(idx);
                    }}
                    title={`Go to slide ${idx + 1}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span className="sr-only">Go to slide {idx + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Campaign Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section id="welcome" className="bio-section">
          <div className="bio-container">
            <div className="commitment-block">
              <span className="sub-title">WELCOME TO MY CAMPAIGN</span>
              <h2 className="main-heading">A Message from Mark</h2>
              <div className="heading-accent-line"></div>
              
              <div className="bio-narrative">
                <p>
                  Thank you for taking the time to visit my campaign website. I'm honored that you're here 
                  because I believe every election begins with a conversation. Before asking for your vote, 
                  I want you to know who I am, what has shaped my life, and why I have chosen to serve our community.
                </p>
                <p>
                  Salem has been my home for most of my life. It is where I grew up, built my business, and 
                  devoted countless hours to serving alongside friends and neighbors. My commitment to this 
                  community has never been about politics—it has always been about people.
                </p>
                <p>
                  Throughout this website, I hope you'll learn about my background, my values, and my vision 
                  for Salem's future. More importantly, I hope you'll see that my goal is simple: to listen, 
                  to lead with integrity, and to help ensure that Salem remains the community we are all proud to call home.
                </p>
              </div>

              <p className="commitment-signature-text">
                — Mark Henrickson
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Candidate / About Section */}
        <section id="about" className="commitment-platform-section">
          <div className="mid-grid">
            <div className="mid-text-col">
              <div className="bio-block">
                <span className="sub-title">MEET THE CANDIDATE</span>
                <h2 className="main-heading">About Mark Henrickson</h2>
                <div className="heading-accent-line"></div>

                <div className="bio-narrative">
                  <p>
                    Mark Henrickson is a lifelong Salem resident, business owner, builder, and community leader 
                    who has spent more than four decades solving problems, building relationships, and serving 
                    the community he loves.
                  </p>
                  <p>
                    Growing up in Salem, Mark learned the importance of faith, compassion, hard work, and personal 
                    responsibility from his parents. His father devoted his career to caring for children through a 
                    Lutheran children's home, while his mother demonstrated quiet strength through her dedication 
                    to family, faith, and serving others. Those values continue to guide Mark today.
                  </p>
                  <p>
                    After graduating from high school, Mark entered the construction industry, learning the building trade 
                    through hands-on experience before continuing his education. Seeking additional opportunities, he moved 
                    to Dallas, Texas, where he gained valuable leadership experience with respected home builders 
                    before launching his own construction company.
                  </p>
                  <p>
                    Eventually, Salem called him home. Returning to the community that shaped him, Mark built a successful 
                    construction and development business that has served families and businesses throughout the Roanoke Valley 
                    for more than thirty years.
                  </p>
                  <p>
                    His work has never been just about constructing buildings. Every project has required listening carefully, 
                    solving problems creatively, managing budgets responsibly, coordinating with local governments, and earning 
                    the trust of clients. Those same skills are essential to effective public service.
                  </p>
                  <p>
                    Outside of business, Mark has devoted decades to community involvement. He has served through his church, 
                    volunteered as a youth leader, participated in numerous civic organizations, served as President of the Rotary 
                    Club of Salem, and currently serves on the Salem Planning Commission.
                  </p>
                  <p>
                    Whether helping a young family build a home, volunteering as Santa Claus for local children, serving on 
                    community committees, or supporting charitable causes, Mark believes leadership begins with serving others.
                  </p>
                  <p>
                    Today, Mark is seeking to continue that lifetime of service by helping guide Salem's future with practical 
                    leadership, thoughtful planning, and common-sense decision-making.
                  </p>
                </div>
              </div>

              <div className="bio-stats-card">
                <h3 className="stats-heading">Professional & Civic Background</h3>
                <ul className="stats-list">
                  <li>
                    <span className="stats-bullet-icon">🏗️</span>
                    <div>
                      <strong>30+ Years Salem Business Owner</strong>
                      <span>Built a successful construction and development business serving Roanoke Valley families.</span>
                    </div>
                  </li>
                  <li>
                    <span className="stats-bullet-icon">🏛️</span>
                    <div>
                      <strong>Salem Planning Commission</strong>
                      <span>Actively serving to guide city planning and responsible community development.</span>
                    </div>
                  </li>
                  <li>
                    <span className="stats-bullet-icon">🤝</span>
                    <div>
                      <strong>Rotary Club of Salem</strong>
                      <span>Past President, living the motto "Service Above Self".</span>
                    </div>
                  </li>
                  <li>
                    <span className="stats-bullet-icon">🎅</span>
                    <div>
                      <strong>Lifelong Community Volunteer</strong>
                      <span>Youth mentor, church leader, and annual Santa Claus volunteer for local children.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Portrait Photo Column */}
            <div className="mid-portrait-col">
              <div className="portrait-slot-wrapper">
                <div className="portrait-slot">
                  <img
                    src="/images/mark-henrickson-2.png"
                    alt="Mark Henrickson portrait"
                    className="portrait-image"
                  />
                  <div className="portrait-caption">
                    <span className="portrait-name">MARK HENRICKSON</span>
                    <span className="portrait-sub">Candidate for Salem City Council</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why I'm Running Section */}
        <section id="why-running" className="bio-section">
          <div className="bio-container">
            <div className="commitment-block">
              <span className="sub-title">PURPOSE & RESPONSIBILITY</span>
              <h2 className="main-heading">Why I'm Running</h2>
              <div className="heading-accent-line"></div>
              
              <div className="bio-narrative">
                <p>
                  Salem has given me opportunities that have shaped my life, my family, and my career. 
                  I believe that when a community has given you so much, you have a responsibility to give something back.
                </p>
                <p>
                  Throughout my career, I have spent decades solving problems. Every construction project begins with 
                  listening carefully, understanding the challenges, balancing priorities, managing resources, and working 
                  together toward a successful outcome. Those same principles apply to public service.
                </p>
                <p>
                  I am running because I believe Salem deserves leaders who will listen carefully, make thoughtful decisions, 
                  spend taxpayer dollars wisely, and plan responsibly for future generations.
                </p>
                <p>
                  Our city has many strengths: outstanding schools, safe neighborhoods, strong civic pride, dedicated public 
                  servants, and people who genuinely care about one another. My goal is to protect those strengths while 
                  preparing Salem for the opportunities ahead.
                </p>
                <p>
                  I am not running to make promises that cannot be kept. I am running to bring experience, integrity, 
                  practical problem-solving, and a lifetime of service to the work of local government. Together, we can 
                  preserve the character that makes Salem special while building an even stronger future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Values Section */}
        <section id="values" className="values-section">
          <div className="values-container">
            <span className="sub-title">GUIDING PRINCIPLES</span>
            <h2 className="main-heading">My Values</h2>
            <div className="heading-accent-line"></div>
            <p className="join-text-desc">
              Everything I do is guided by a few simple principles that have shaped my life for decades.
            </p>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">⚖️</span>
                  <h3>Integrity</h3>
                </div>
                <p>
                  People deserve leaders whose word can be trusted. Integrity means doing the right thing, 
                  even when no one is watching.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">💡</span>
                  <h3>Common Sense</h3>
                </div>
                <p>
                  Good decisions come from listening carefully, asking thoughtful questions, and focusing on 
                  practical solutions instead of unnecessary conflict.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">🤝</span>
                  <h3>Service</h3>
                </div>
                <p>
                  Leadership is about serving others, not serving yourself. My involvement in Rotary, my church, 
                  the Planning Commission, and community organizations reflects my commitment to giving back.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">🏛️</span>
                  <h3>Fiscal Responsibility</h3>
                </div>
                <p>
                  Every tax dollar represents someone's hard work. Government should manage public resources with 
                  the same care and responsibility that families and businesses use every day.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">💬</span>
                  <h3>Respect</h3>
                </div>
                <p>
                  Every citizen deserves to be heard. Even when opinions differ, respectful conversation leads 
                  to better decisions.
                </p>
              </div>

              <div className="value-card">
                <div className="value-card-header">
                  <span className="value-icon">🔭</span>
                  <h3>Vision</h3>
                </div>
                <p>
                  Leadership requires planning beyond today. Good communities prepare for future generations 
                  while protecting the values that make them special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Building a Career & Serving Salem */}
        <section id="experience" className="commitment-platform-section">
          <div className="bio-container">
            <span className="sub-title">EXPERIENCE & DEDICATION</span>
            <h2 className="main-heading">Building a Career... Building a Community</h2>
            <div className="heading-accent-line"></div>

            <div className="story-grid">
              <div className="story-text">
                <div className="bio-narrative">
                  <p>
                    My career has been about much more than construction. Every project begins with someone's dream. 
                    My job has always been to listen carefully, understand their goals, develop practical solutions, 
                    manage budgets responsibly, and deliver results that stand the test of time.
                  </p>
                  <p>
                    Over the years, I have worked with homeowners, architects, engineers, subcontractors, lenders, 
                    inspectors, and local governments. Construction teaches valuable lessons about leadership: patience, 
                    preparation, accountability, and the importance of making decisions that balance quality, cost, and long-term value.
                  </p>
                  <p>
                    Those experiences have prepared me to approach public service with the same practical mindset: 
                    listen carefully, solve problems thoughtfully, and always keep the community's long-term interests at heart.
                  </p>
                </div>
              </div>

              <div className="story-photo-wrapper">
                <img
                  src="/images/mark-henrickson-3.png"
                  alt="Mark Henrickson in Salem"
                  className="story-photo"
                />
                <div className="story-photo-caption">
                  Mark Henrickson — Dedicated to serving Salem families and businesses.
                </div>
              </div>
            </div>

            {/* Lessons That Shaped Me */}
            <div className="commitment-block" style={{ marginTop: '4rem' }}>
              <span className="sub-title">FOUNDATIONS</span>
              <h2 className="main-heading">Lessons That Shaped Me</h2>
              <div className="heading-accent-line"></div>

              <div className="lessons-grid">
                <div className="lesson-card">
                  <strong>Parents</strong>
                  <span>Taught compassion, humility, faith, and service.</span>
                </div>
                <div className="lesson-card">
                  <strong>Construction</strong>
                  <span>Taught responsibility, planning, and accountability.</span>
                </div>
                <div className="lesson-card">
                  <strong>Church</strong>
                  <span>Taught that leadership begins with serving others.</span>
                </div>
                <div className="lesson-card">
                  <strong>Rotary</strong>
                  <span>Taught the importance of putting "Service Above Self."</span>
                </div>
                <div className="lesson-card">
                  <strong>Volunteering</strong>
                  <span>Reminded that small acts of kindness make the greatest difference.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section className="bio-section" id="platform">
          <div className="bio-container">
            <div className="platform-block">
              <span className="sub-title">THE VISION FOR SALEM</span>
              <h2 className="main-heading">Campaign Platform</h2>
              <div className="heading-accent-line"></div>
              
              <p className="join-text-desc" style={{ marginBottom: '2.5rem' }}>
                Salem is already a wonderful community, but every community must continue preparing for the future. 
                I believe we can preserve the character that makes Salem unique while encouraging thoughtful growth that benefits everyone.
              </p>

              <div className="platform-card-grid">
                <div className="platform-item">
                  <div className="platform-item-icon">🛡️</div>
                  <div className="platform-item-body">
                    <h3>Maintaining Safe Neighborhoods</h3>
                    <p>
                      Supporting our dedicated police and emergency responders to ensure every Salem neighborhood 
                      remains safe, secure, and welcoming for families.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">🎓</div>
                  <div className="platform-item-body">
                    <h3>Supporting Outstanding Public Schools</h3>
                    <p>
                      Investing in quality education, classroom resources, and safe school infrastructure to empower 
                      our students, teachers, and future generations.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">🏡</div>
                  <div className="platform-item-body">
                    <h3>Responsible Growth & Planning</h3>
                    <p>
                      Encouraging responsible residential and business growth that balances community needs while 
                      preserving the unique character of our city.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">🛣️</div>
                  <div className="platform-item-body">
                    <h3>Wise Infrastructure Investments</h3>
                    <p>
                      Investing wisely in essential infrastructure—roads, water, sewer, parks, green spaces, and modern 
                      technology systems built for long-term value.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">💼</div>
                  <div className="platform-item-body">
                    <h3>Supporting Local Businesses</h3>
                    <p>
                      Backing local merchants and small business owners with sensible regulatory frameworks and 
                      fostering a thriving regional economy.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">👨‍👩‍👧</div>
                  <div className="platform-item-body">
                    <h3>Opportunities for Families & Seniors</h3>
                    <p>
                      Expanding recreational opportunities, accessible community programs, and quality services tailored 
                      for young families and senior residents.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">🏙️</div>
                  <div className="platform-item-body">
                    <h3>Vibrant Downtown Destination</h3>
                    <p>
                      Strengthening downtown Salem as a vibrant, attractive hub for local commerce, culture, events, 
                      and community gatherings.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-item-icon">💰</div>
                  <div className="platform-item-body">
                    <h3>Managing Taxpayer Dollars Responsibly</h3>
                    <p>
                      Exercising strict fiscal oversight over city budgets so every tax dollar is managed with transparency, 
                      care, and maximum public benefit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action / Get Involved Section */}
        <section id="join" className="join-section">
          <div className="join-container">
            <span className="sub-title">LOOKING AHEAD</span>
            <h2 className="main-heading">Join the Campaign</h2>
            <div className="heading-accent-line"></div>

            <p className="join-text-lead">
              Want to help? Request a yard sign or get in touch with the campaign below.
            </p>
            <p className="join-text-desc">
              The future of Salem is bright. By working together, listening to one another, and planning 
              responsibly, we can preserve everything we love about Salem while creating new opportunities 
              for future generations. It would be an honor to earn your trust and support.
            </p>

            <div className="join-options-grid">
              <a href="mailto:henmark1@aol.com" className="join-option-card">
                <div className="option-icon">📧</div>
                <h3>Get in Touch</h3>
                <p>Email me directly at Mark Henrickson henmark1@aol.com to share your thoughts, questions, or concerns.</p>
                <span className="option-link-text">Send an Email →</span>
              </a>

              <button
                type="button"
                className="join-option-card join-option-card-btn"
                onClick={() => setIsYardSignModalOpen(true)}
              >
                <div className="option-icon">🏡</div>
                <h3>Request a Yard Sign</h3>
                <p>Sign up to receive one of our campaign lawn signs installed at your Salem residential or business location.</p>
                <span className="option-link-text">Request Sign →</span>
              </button>

              <a href="#platform" className="join-option-card">
                <div className="option-icon">📢</div>
                <h3>Spread the Word</h3>
                <p>Explore our platform, talk to your neighbors, and share our vision for a stronger Salem.</p>
                <span className="option-link-text">Read Our Goals →</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Yard Sign Request Dialog Modal */}
      {isYardSignModalOpen && (
        <div className="modal-backdrop">
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="yard-sign-dialog-title"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsYardSignModalOpen(false)}
              aria-label="Close yard sign request dialog"
            >
              &times;
            </button>
            <div className="yard-sign-form-header">
              <h3 id="yard-sign-dialog-title">Yard Sign Request Form</h3>
              <p>Please provide your contact info and Salem address below to request a campaign sign.</p>
            </div>

            {formSubmitted ? (
              <div className="form-success-msg" role="status">
                <strong>Thank you!</strong> Your yard sign request details have been prepared in your email client.
                If your email client didn't open automatically, you can also email your request to{' '}
                <a href="mailto:henmark1@aol.com">henmark1@aol.com</a> and{' '}
                <a href="mailto:JRHenrickson@gmail.com">JRHenrickson@gmail.com</a>.
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setIsYardSignModalOpen(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form className="yard-sign-form" onSubmit={handleYardSignSubmit} noValidate>
                {formError && (
                  <div className="form-error-msg" role="alert">
                    {formError}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="yard-sign-name">
                    Full <span className="no-wrap-text">Name&nbsp;<span className="required-star">*</span></span>
                  </label>
                  <input
                    id="yard-sign-name"
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    aria-label="Full Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <span className="form-label-title">
                    Property <span className="no-wrap-text">Type&nbsp;<span className="required-star">*</span></span>
                  </span>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="propertyType"
                        value="residential"
                        checked={propertyType === 'residential'}
                        onChange={() => setPropertyType('residential')}
                        aria-label="Residential"
                      />
                      <span>Residential</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="propertyType"
                        value="business"
                        checked={propertyType === 'business'}
                        onChange={() => setPropertyType('business')}
                        aria-label="Business"
                      />
                      <span>Business</span>
                    </label>
                  </div>
                </div>

                {propertyType === 'business' && (
                  <div className="form-group">
                    <label htmlFor="yard-sign-business">
                      Business <span className="no-wrap-text">Name&nbsp;<span className="required-star">*</span></span>
                    </label>
                    <input
                      id="yard-sign-business"
                      type="text"
                      className="form-control"
                      value={businessName}
                      onChange={e => setBusinessName(e.target.value)}
                      placeholder="e.g. Main Street Cafe"
                      aria-label="Business Name"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="yard-sign-address">
                    Physical Address (Must be in Salem, <span className="no-wrap-text">VA)&nbsp;<span className="required-star">*</span></span>
                  </label>
                  <input
                    id="yard-sign-address"
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. 123 College Ave, Salem, VA 24153"
                    aria-label="Physical Address (Must be in Salem, VA)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="yard-sign-phone">
                    Contact Phone <span className="no-wrap-text">Number&nbsp;<span className="required-star">*</span></span>
                  </label>
                  <input
                    id="yard-sign-phone"
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. (540) 555-0199"
                    aria-label="Contact Phone Number"
                    required
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label htmlFor="yard-sign-permission" className="checkbox-label">
                    <input
                      id="yard-sign-permission"
                      type="checkbox"
                      checked={permission}
                      onChange={e => setPermission(e.target.checked)}
                      aria-label="I give permission for the sign to be installed where visible to the street"
                      required
                    />
                    <span>
                      I give permission for the sign to be installed where visible to the{' '}
                      <span className="no-wrap-text">
                        street.&nbsp;<span className="required-star">*</span>
                      </span>
                    </span>
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary form-submit-btn">
                    Submit Yard Sign Request
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsYardSignModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Campaign Footer */}
      <footer className="campaign-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <svg
              className="footer-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <h3>MARK HENRICKSON FOR SALEM</h3>
            <p>Building a stronger, more connected Salem together.</p>
          </div>

          <div className="footer-links-group">
            <h4>Campaign Info</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">Meet Mark</a>
              </li>
              <li>
                <a href="#why-running">Why I'm Running</a>
              </li>
              <li>
                <a href="#values">My Values</a>
              </li>
              <li>
                <a href="#platform">The Platform</a>
              </li>
              <li>
                <a href="#join">Get Involved</a>
              </li>
            </ul>
          </div>

          {/* Follow Our Campaign social media links commented out per issue #35 */}
        </div>

        <div className="footer-disclosure">
          <div className="disclosure-box">
            PAID FOR BY THE COMMITTEE TO ELECT MARK HENRICKSON
          </div>
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Mark Henrickson for Salem. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
