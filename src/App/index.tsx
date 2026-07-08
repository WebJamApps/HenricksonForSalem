/**
 * @file index.tsx
 * @description Main application layout for Mark Henrickson for Salem City Council campaign.
 */

import { InvolvementForm } from './InvolvementForm';

export function App() {
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
              strokeWidth="2"
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
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#join" className="nav-btn-link">Get Involved</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-tag">SALEM CITY COUNCIL • WARD 1</div>
          <h1 className="hero-title">
            Mark Henrickson <br />
            <span className="gradient-text">for Salem City Council</span>
          </h1>
          <p className="hero-subtitle">
            A fresh voice, a stronger community, and a better Salem.
            Committed to sensible development, robust public spaces,
            and transparent civic leadership.
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
              <blockquote>
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

        {/* Get Involved Section */}
        <section className="join-section">
          <InvolvementForm />
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
              strokeWidth="2"
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
              <li><a href="#platform">The Platform</a></li>
              <li><a href="#join">Get Involved</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Social Media</h4>
            <div className="footer-social-icons">
              {/* Facebook Placeholder */}
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
              {/* Twitter/X Placeholder */}
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
              {/* Instagram Placeholder */}
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
