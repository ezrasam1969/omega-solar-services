import heroImage from '../assets/images/hero-en.jpg';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  const handleCallClick = (e) => {
    // Allows standard tel link behavior, but provides fallback if needed
  };

  return (
    <section
      className="hero-section"
      id="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay gradient for readability and premium look */}
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <div className="hero-grid">

          {/* Main Hero Content Area */}
          <div className="hero-content">

            {/* Trust Location Badge */}
            <div className="hero-badge">
              <span className="pulse-beacon"></span>
              <svg className="badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Hyderabad’s Top Solar Installation Partner</span>
            </div>

            {/* Bold Savings & Energy Independence Headline */}
            <h1 className="hero-title">
              Achieve <span className="highlight-text">Energy Independence</span> & Cut Bills by Up to <span className="highlight-accent">90%</span>
            </h1>

            {/* Detailed Subheadline mentioning Hyderabad & Residential/Commercial/Industrial */}
            <p className="hero-subheadline">
              Hyderabad’s trusted solar engineering experts delivering end-to-end
              <strong> residential</strong>, <strong>commercial</strong>, and <strong>industrial</strong> rooftop
              solar installations with PM Surya Ghar subsidy support & 25-year warranty.
            </p>

            {/* Value Highlights */}
            <div className="hero-perks">
              <div className="perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Up to ₹78,000 Govt. Subsidy</span>
              </div>
              <div className="perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>25-Year Performance Warranty</span>
              </div>
              <div className="perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>0% Down EMI Options</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="hero-cta-group">
              <button
                className="hero-btn btn-primary"
                onClick={() => navigate('/quote')}
                id="hero-get-quote-btn"
                aria-label="Get Free Quote"
              >
                <span>Get Free Quote</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href="tel:+919876543210"
                className="hero-btn btn-secondary"
                id="hero-call-now-btn"
                onClick={handleCallClick}
                aria-label="Call Now"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call Now</span>
              </a>
            </div>

          </div>

          {/* Quick Trust Stats Section */}
          <div className="hero-stats-wrapper">
            <div className="hero-stats-header">
              <h3>Proven Excellence in Hyderabad</h3>
              <p>Trusted by hundreds of homeowners and business leaders</p>
            </div>

            <div className="hero-stats-grid">

              {/* Stat 1: Installations */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-installations">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Installations Completed</span>
                </div>
              </div>

              {/* Stat 2: Experience */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-experience">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">10+ Years</span>
                  <span className="stat-label">Industry Experience</span>
                </div>
              </div>

              {/* Stat 3: Capacity Installed */}
              <div className="stat-card">
                <div className="stat-icon-wrapper icon-capacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">15,000+ kW</span>
                  <span className="stat-label">Total Capacity Installed</span>
                </div>
              </div>

            </div>

            {/* Quick Trust Footer Banner inside Glass Box */}
            <div className="hero-stats-footer">
              <div className="trust-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">4.9/5 Rating across Hyderabad</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

