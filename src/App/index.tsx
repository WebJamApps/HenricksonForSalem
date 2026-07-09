/**
 * @file index.tsx
 * @description Main application layout for Mark Henrickson for Salem City Council campaign.
 */

import { useState, useEffect, useRef } from 'react';

export function App() {
  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayTimerRef = useRef<any>(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
      caption: 'A Fresh Voice for Salem',
      description: 'Mark Henrickson is committed to bringing open, proactive, and transparent leadership to Salem\'s Ward 1.',
    },
    {
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Supporting Small Businesses',
      description: 'Promoting simplified regulatory frameworks and a welcoming environment for Salem\'s local merchants.',
    },
    {
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Investing in Our Public Spaces',
      description: 'Prioritizing safety, maintenance, and green spaces in our local parks and community areas.',
    },
    {
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
      caption: 'Civic Accessibility',
      description: 'Keeping doors open with regular town halls, prompt responses, and active resident feedback loops.',
    },
  ];

  useEffect(() => {
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [slides.length]);

  const handlePrev = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handleDotClick = (index: number) => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setCurrentSlide(index);
  };

  return (
    <div className="campaign-container">
      {/* Translucent Navigation Header */}
      <header className="campaign-nav">
        <div className="nav-content">
          <a href="/" className="nav-logo-group" aria-label="Mark Henrickson Home">
            <svg
              className="nav-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              />
            </svg>
            <span className="nav-logo-text">MARK HENRICKSON</span>
          </a>
          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#video" className="nav-link">Video</a>
            <a href="#join" className="nav-btn-link">Get Involved</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-red"></div>
        <div className="hero-glow-blue"></div>
        <div className="hero-content">
          <div className="hero-tag">SALEM CITY COUNCIL • WARD 1</div>
          <h1 className="hero-title">
            Mark Henrickson <br />
            <span className="gradient-text">for Salem City Council</span>
          </h1>
          <p className="hero-subtitle">
            A fresh voice, a stronger community, and a better Salem.
            Committed to sensible development, robust public spaces,
            and transparent, responsive civic leadership.
          </p>
          <div className="hero-actions">
            <a href="#join" className="btn-primary" id="hero-btn-join">Join the Campaign</a>
            <a href="#platform" className="btn-secondary" id="hero-btn-platform">Explore the Platform</a>
          </div>
        </div>
      </section>

      {/* Main Campaign Sections */}
      <main className="main-content">
        
        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <span className="section-subtitle">MEET THE CANDIDATE</span>
            <h2 className="section-title">About Mark Henrickson</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-narrative">
              <p>
                Salem is more than just where I live — it’s where my family is
                growing, where our neighbors support one another, and where our
                children are learning to build the future. I have spent my
                career solving complex problems, listening to diverse
                viewpoints, and finding common ground to get things done.
              </p>
              <p>
                As your Salem City Council representative, my priority will be
                to serve as an active, approachable, and transparent voice for
                all residents of Ward 1. I believe that local government works
                best when it works with and for the people.
              </p>
              <blockquote className="patriotic-quote">
                "True representation starts with active listening. Together, we
                can build a city that honors its heritage while looking
                confidently toward the future."
              </blockquote>
            </div>
            
            <div className="values-card">
              <h3 className="values-title">Our Campaign Core Values</h3>
              <ul className="values-list">
                <li className="value-item">
                  <div className="value-icon">🤝</div>
                  <div>
                    <strong>Civic Accessibility:</strong> Regular town halls, prompt responses, and open doors.
                  </div>
                </li>
                <li className="value-item">
                  <div className="value-icon">🏗️</div>
                  <div>
                    <strong>Sensible Growth:</strong> Housing and commercial spaces that meet our needs while preserving neighborhood character.
                  </div>
                </li>
                <li className="value-item">
                  <div className="value-icon">🛡️</div>
                  <div>
                    <strong>Community Resilience:</strong> Investing in critical infrastructure, safe neighborhoods, and well-maintained public parks.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Campaign Slideshow Section */}
        <section id="gallery" className="gallery-section">
          <div className="section-header">
            <span className="section-subtitle">CAMPAIGN HIGHLIGHTS</span>
            <h2 className="section-title">On the Campaign Trail</h2>
            <div className="section-divider"></div>
          </div>

          <div 
            className="carousel-container"
            role="region"
            aria-roledescription="carousel"
            aria-label="Campaign highlights photo gallery"
          >
            <div className="carousel-slide-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  aria-hidden={index !== currentSlide}
                  style={{
                    opacity: index === currentSlide ? 1 : 0,
                    zIndex: index === currentSlide ? 2 : 1,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.caption}
                    className="carousel-img"
                  />
                  <div className="carousel-caption">
                    <h3 className="carousel-caption-title">{slide.caption}</h3>
                    <p className="carousel-caption-desc">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Left and Right Nav Buttons */}
            <button
              onClick={handlePrev}
              className="carousel-btn prev"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="carousel-btn next"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Carousel Dots indicators */}
            <div className="carousel-dots" role="tablist" aria-label="Slideshow navigation dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section id="platform" className="platform-section">
          <div className="section-header">
            <span className="section-subtitle">THE VISION FOR SALEM</span>
            <h2 className="section-title">Campaign Platform</h2>
            <div className="section-divider"></div>
          </div>

          <div className="platform-grid">
            {/* Pillar 1 */}
            <div className="platform-card" id="platform-pillar-1">
              <div className="platform-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="platform-svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="platform-card-title">Sustainable Housing & Planning</h3>
              <p className="platform-card-desc">
                Promote balanced zoning policies that encourage affordable and
                middle-density housing, ensuring Salem remains welcoming and
                accessible to families and seniors alike.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="platform-card" id="platform-pillar-2">
              <div className="platform-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="platform-svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="platform-card-title">Public Safety & Community Trust</h3>
              <p className="platform-card-desc">
                Support community-oriented policing initiatives, emergency
                services, and mental health resources to guarantee safe, secure
                neighborhoods and strong community bonds.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="platform-card" id="platform-pillar-3">
              <div className="platform-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="platform-svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 18l-2-1-2 1V5l2 1 2-1 2 1 2-1v13l-2-1z" />
                  <line x1="12" y1="5" x2="12" y2="17" />
                </svg>
              </div>
              <h3 className="platform-card-title">Infrastructure Renewal</h3>
              <p className="platform-card-desc">
                Prioritize localized investments in street repairs, safe
                sidewalks, protected cycling paths, and comprehensive public
                transport, building transit options fit for the 21st century.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="platform-card" id="platform-pillar-4">
              <div className="platform-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="platform-svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="platform-card-title">Fiscal Transparency & Business</h3>
              <p className="platform-card-desc">
                Advocate for strict fiscal oversight of city budgets and support
                Salem's local merchants and small business owners with
                simplified, sensible regulatory frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Campaign Video Section */}
        <section id="video" className="video-section">
          <div className="section-header">
            <span className="section-subtitle">MEET THE CANDIDATE</span>
            <h2 className="section-title">Campaign Video</h2>
            <div className="section-divider"></div>
          </div>
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                className="campaign-video-iframe"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Mark Henrickson Campaign Launch Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-narrative">
              <h3 className="video-title">Why I am running for City Council</h3>
              <p>
                In this introductory video, Mark outlines his vision for Salem and Ward 1, 
                discussing the key challenges we face and the sensible, proactive solutions 
                he hopes to bring to Salem City Council. Watch to learn more about our 
                campaign and our dedication to building a stronger community, together.
              </p>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section id="join" className="join-section">
          <div className="section-header">
            <span className="section-subtitle">GET INVOLVED</span>
            <h2 className="section-title">Join the Campaign</h2>
            <div className="section-divider"></div>
          </div>
          <div className="join-content">
            <p className="join-placeholder">
              Want to help? Ways to volunteer are coming soon.
            </p>
            <div className="volunteer-interest-cards">
              <div className="interest-card">
                <span className="interest-icon">🏡</span>
                <h4>Host a Yard Sign</h4>
                <p>Show your support in your neighborhood by hosting a campaign yard sign.</p>
              </div>
              <div className="interest-card">
                <span className="interest-icon">🗣️</span>
                <h4>Spread the Word</h4>
                <p>Share our campaign with friends and family in Ward 1 to help build momentum.</p>
              </div>
              <div className="interest-card">
                <span className="interest-icon">✉️</span>
                <h4>Get Campaign Updates</h4>
                <p>Stay informed about future town halls, community events, and news.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="campaign-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <svg
              className="footer-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              />
            </svg>
            <h3>MARK HENRICKSON FOR SALEM</h3>
            <p>Building a stronger Salem, together.</p>
          </div>
          
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">Meet Mark</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#platform">The Platform</a></li>
              <li><a href="#video">Video</a></li>
              <li><a href="#join">Get Involved</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Social Media</h4>
            <div className="footer-social-icons">
              {/* Facebook */}
              <a
                href="https://facebook.com/markhenricksonforsalem"
                className="social-icon"
                aria-label="Facebook"
                id="social-facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="https://twitter.com/henrickson4salem"
                className="social-icon"
                aria-label="Twitter/X"
                id="social-twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d={
                      "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1" +
                      "A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 " +
                      "2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    }
                  />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/markhenricksonforsalem"
                className="social-icon"
                aria-label="Instagram"
                id="social-instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
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
