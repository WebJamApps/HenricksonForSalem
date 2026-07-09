/**
 * @file index.tsx
 * @description Main application layout for Mark Henrickson for Salem City Council campaign.
 */

import { useState, useEffect } from 'react';

export function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <nav className="nav-links">
            <a href="#about" className="nav-link">Meet Mark</a>
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#join" className="nav-btn-link">Get Involved</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-tag">SALEM CITY COUNCIL • WARD 1</div>
            <h1 className="hero-title">
              Mark Henrickson <br />
              <span className="hero-title-accent">for Salem City Council</span>
            </h1>
            <p className="hero-subtitle">
              A fresh voice, a stronger community, and a better Salem. Mark is dedicated to 
              active, accessible leadership for Ward 1, prioritizing real community engagement, 
              robust public parks, and responsive civic leadership.
            </p>
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
                <svg className="slide-svg" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="350" rx="12" fill="#f8fafc" />
                  <rect x="2" y="2" width="496" height="346" rx="10" stroke="#1d3557" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Community graphic representation */}
                  <circle cx="250" cy="160" r="60" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <path d="M190 260C190 210 210 200 250 200C290 200 310 210 310 260" stroke="#1d3557" strokeWidth="2.5" fill="#f1f5f9" />
                  <circle cx="170" cy="180" r="40" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <path d="M130 270C130 220 145 215 170 215C195 215 210 220 210 270" stroke="#1d3557" strokeWidth="2" fill="#f1f5f9" />
                  <circle cx="330" cy="180" r="40" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <path d="M290 270C290 220 305 215 330 215C355 215 370 220 370 270" stroke="#1d3557" strokeWidth="2" fill="#f1f5f9" />
                  {/* Sparingly used Red Accent details */}
                  <circle cx="250" cy="160" r="6" fill="#e63946" />
                  <circle cx="170" cy="180" r="4" fill="#e63946" />
                  <circle cx="330" cy="180" r="4" fill="#e63946" />
                  <path d="M230 110L250 90L270 110" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="slide-overlay">
                  <span className="slide-label">COMMUNITY ENGAGEMENT</span>
                  <p className="slide-caption">Listening directly to Ward 1 residents at neighborhood town halls.</p>
                </div>
              </div>

              {/* Slide 2 */}
              <div
                className={`gallery-slide ${activeSlide === 1 ? 'active' : 'inactive'}`}
                aria-hidden={activeSlide !== 1}
              >
                <svg className="slide-svg" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="350" rx="12" fill="#f8fafc" />
                  <rect x="2" y="2" width="496" height="346" rx="10" stroke="#1d3557" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Public Parks graphic representation */}
                  <path d="M50 300C120 280 200 310 280 290C360 270 420 310 450 300" stroke="#1d3557" strokeWidth="2.5" />
                  <path d="M120 290V190C120 160 180 160 180 190V295" stroke="#1d3557" strokeWidth="2" fill="#f1f5f9" />
                  <circle cx="150" cy="140" r="30" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  {/* Sparingly used Red Accent details */}
                  <circle cx="150" cy="140" r="5" fill="#e63946" />
                  <path d="M300 300V220C300 200 340 200 340 220V290" stroke="#1d3557" strokeWidth="2" fill="#f1f5f9" />
                  <circle cx="320" cy="180" r="20" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <circle cx="320" cy="180" r="3" fill="#e63946" />
                </svg>
                <div className="slide-overlay">
                  <span className="slide-label">PUBLIC SPACES & PARKS</span>
                  <p className="slide-caption">Advocating for robust parks, accessible sidewalks, and safe green spaces.</p>
                </div>
              </div>

              {/* Slide 3 */}
              <div
                className={`gallery-slide ${activeSlide === 2 ? 'active' : 'inactive'}`}
                aria-hidden={activeSlide !== 2}
              >
                <svg className="slide-svg" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="350" rx="12" fill="#f8fafc" />
                  <rect x="2" y="2" width="496" height="346" rx="10" stroke="#1d3557" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Shopfronts representation */}
                  <rect x="80" y="160" width="120" height="130" rx="4" fill="#f1f5f9" stroke="#1d3557" strokeWidth="2" />
                  <rect x="100" y="200" width="80" height="90" rx="2" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <path d="M60 160L140 120L220 160Z" fill="#f1f5f9" stroke="#1d3557" strokeWidth="2" />
                  <rect x="260" y="140" width="160" height="150" rx="4" fill="#f1f5f9" stroke="#1d3557" strokeWidth="2" />
                  {/* Sparingly used Red Accent details */}
                  <rect x="300" y="180" width="80" height="110" rx="2" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                  <path d="M290 180H390" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="140" cy="100" r="6" fill="#e63946" />
                </svg>
                <div className="slide-overlay">
                  <span className="slide-label">LOCAL COMMERCE</span>
                  <p className="slide-caption">Supporting Ward 1 small businesses with streamlined regulations.</p>
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
        {/* Personal Commitment + Platform Section */}
        <section className="commitment-platform-section">
          <div className="mid-grid">
            <div className="mid-text-col">
              <div className="commitment-block">
                <span className="sub-title">MY COMMITMENT TO WARD 1</span>
                <h2 className="main-heading">Serving with Integrity and Purpose</h2>
                <div className="heading-accent-line"></div>
                
                <p className="commitment-paragraph">
                  "Salem is more than just where I live — it’s where my family is growing, where our 
                  neighbors support one another, and where our children are learning to build the future. 
                  I believe that local government works best when it is active, approachable, and 
                  transparent. Together, we can build a city that honors its heritage while looking 
                  confidently toward the future."
                </p>
                
                <p className="commitment-signature-text">
                  — Mark Henrickson, Candidate for Salem City Council
                </p>
              </div>

              {/* Platform block directly integrated here */}
              <div className="platform-block" id="platform">
                <span className="sub-title">THE VISION FOR SALEM</span>
                <h2 className="main-heading">Campaign Platform</h2>
                <div className="heading-accent-line"></div>
                
                <div className="platform-card-grid">
                  <div className="platform-item">
                    <div className="platform-item-icon">🏗️</div>
                    <div className="platform-item-body">
                      <h3>Sustainable Housing & Planning</h3>
                      <p>
                        Promote balanced zoning policies that encourage affordable and middle-density 
                        housing, ensuring Salem remains welcoming and accessible to families and seniors alike.
                      </p>
                    </div>
                  </div>

                  <div className="platform-item">
                    <div className="platform-item-icon">🛡️</div>
                    <div className="platform-item-body">
                      <h3>Public Safety & Community Trust</h3>
                      <p>
                        Support community-oriented policing initiatives, emergency services, and mental 
                        health resources to guarantee safe, secure neighborhoods and strong community bonds.
                      </p>
                    </div>
                  </div>

                  <div className="platform-item">
                    <div className="platform-item-icon">🚶</div>
                    <div className="platform-item-body">
                      <h3>Infrastructure Renewal</h3>
                      <p>
                        Prioritize localized investments in street repairs, safe sidewalks, protected 
                        cycling paths, and comprehensive public transport, building options fit for the 21st century.
                      </p>
                    </div>
                  </div>

                  <div className="platform-item">
                    <div className="platform-item-icon">📊</div>
                    <div className="platform-item-body">
                      <h3>Fiscal Transparency & Business</h3>
                      <p>
                        Advocate for strict fiscal oversight of city budgets and support Salem's local 
                        merchants and small business owners with simplified, sensible regulatory frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustrated Portrait Slot Column */}
            <div className="mid-portrait-col">
              <div className="portrait-slot-wrapper">
                <div className="portrait-slot">
                  <div className="portrait-vector-art">
                    <svg className="portrait-svg" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="300" height="400" rx="8" fill="#f8fafc" />
                      <rect x="2" y="2" width="296" height="396" rx="6" stroke="#1d3557" strokeWidth="2" />
                      
                      {/* Stylized Portrait Silhouette */}
                      <circle cx="150" cy="150" r="55" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                      <path d="M80 320C80 250 110 230 150 230C190 230 220 250 220 320V396H80V320Z" fill="#e2e8f0" stroke="#1d3557" strokeWidth="2" />
                      
                      {/* Suit & Collar details */}
                      <path d="M125 230L150 280L175 230" stroke="#1d3557" strokeWidth="2" fill="#f8fafc" />
                      <path d="M140 280H160L150 330L140 280Z" fill="#e63946" stroke="#1d3557" strokeWidth="1" /> {/* Red Tie */}
                      
                      {/* Flag Lapel Pin (subtle flag pin, sparingly used red/blue accent) */}
                      <g className="flag-lapel-pin" transform="translate(170, 255)">
                        <rect width="16" height="11" rx="1" fill="#1d3557" />
                        <line x1="1" y1="3" x2="15" y2="3" stroke="#f8fafc" strokeWidth="1.5" />
                        <line x1="1" y1="7" x2="15" y2="7" stroke="#e63946" strokeWidth="1.5" />
                        <rect width="7" height="6" fill="#1d3557" />
                        <circle cx="3" cy="3" r="1.2" fill="#f8fafc" />
                        <rect x="0" y="0" width="16" height="11" stroke="#1d3557" strokeWidth="1.5" fill="none" />
                      </g>
                    </svg>
                  </div>
                  <div className="portrait-caption">
                    <span className="portrait-name">MARK HENRICKSON</span>
                    <span className="portrait-sub">Ward 1 City Council Candidate</span>
                    <span className="portrait-slot-note">[ PORTRAIT SLOT - VECTOR ASSET PENDING ]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section id="about" className="bio-section">
          <div className="bio-container">
            <span className="sub-title">MEET THE CANDIDATE</span>
            <h2 className="main-heading">About Mark Henrickson</h2>
            <div className="heading-accent-line"></div>

            <div className="bio-content-grid">
              <div className="bio-narrative">
                <p>
                  Mark Henrickson has spent over 15 years in Salem as a civic leader, professional civil engineer, and 
                  dedicated family man. With a professional career rooted in solving complex public infrastructure 
                  challenges and directing community projects, Mark brings a rigorous, analytical, and cooperative 
                  approach to local policymaking.
                </p>
                <p>
                  He has actively served on the Ward 1 Neighborhood Council, spent weekends volunteering with community 
                  youth recreation leagues, and championed local initiatives aimed at upgrading public parks and restoring historic 
                  pathways. Living in Salem with his wife and two children, Mark is deeply invested in ensuring Ward 1 remains 
                  a safe, thriving, and accessible place for every neighbor.
                </p>
              </div>

              <div className="bio-stats-card">
                <h3 className="stats-heading">Professional & Civic Background</h3>
                <ul className="stats-list">
                  <li>
                    <span className="stats-bullet-icon">🔧</span>
                    <div>
                      <strong>Senior Project Engineer</strong>
                      <span>Over 15 years of experience managing infrastructure projects.</span>
                    </div>
                  </li>
                  <li>
                    <span className="stats-bullet-icon">🏢</span>
                    <div>
                      <strong>Civic Organizer</strong>
                      <span>Former Chair, Ward 1 Parks Preservation Coalition.</span>
                    </div>
                  </li>
                  <li>
                    <span className="stats-bullet-icon">🏡</span>
                    <div>
                      <strong>Dedicated Resident</strong>
                      <span>Salem resident and active community volunteer since 2011.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section id="join" className="join-section">
          <div className="join-container">
            <span className="sub-title">SUPPORT THE MOVEMENT</span>
            <h2 className="main-heading">Join the Campaign</h2>
            <div className="heading-accent-line"></div>

            <p className="join-text-lead">
              Want to help? Ways to volunteer are coming soon.
            </p>
            <p className="join-text-desc">
              Every campaign is built on community energy. While we prepare our official 
              volunteer sign-ups and lawn sign distributions, you can get in touch with us 
              directly or help spread our community-first vision online.
            </p>

            <div className="join-options-grid">
              <a href="mailto:info@henricksonforsalem.com" className="join-option-card">
                <div className="option-icon">📧</div>
                <h3>Get in Touch</h3>
                <p>Email us directly at info@henricksonforsalem.com to share your concerns or ask questions.</p>
                <span className="option-link-text">Send an Email →</span>
              </a>

              <a href="#about" className="join-option-card">
                <div className="option-icon">🏡</div>
                <h3>Request a Yard Sign</h3>
                <p>Sign up to receive one of our campaign lawn signs as soon as they are manufactured.</p>
                <span className="option-link-text">Express Interest →</span>
              </a>

              <a href="#platform" className="join-option-card">
                <div className="option-icon">📢</div>
                <h3>Spread the Word</h3>
                <p>Explore our platform, talk to your Ward 1 neighbors, and share our vision for a better Salem.</p>
                <span className="option-link-text">Read Our Goals →</span>
              </a>
            </div>
          </div>
        </section>
      </main>

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
                <a href="#platform">The Platform</a>
              </li>
              <li>
                <a href="#join">Get Involved</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Follow Our Campaign</h4>
            <div className="footer-social-icons">
              <a
                href="https://facebook.com/markhenricksonforsalem"
                className="social-icon"
                aria-label="Facebook"
              >
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/henrickson4salem"
                className="social-icon"
                aria-label="Twitter/X"
              >
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
                  <path
                    d={
                      "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 " +
                      "4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 " +
                      "4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                    }
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com/markhenricksonforsalem"
                className="social-icon"
                aria-label="Instagram"
              >
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
