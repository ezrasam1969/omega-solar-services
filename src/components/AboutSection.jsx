import workerImg from '../assets/images/worker.jpg.jpg';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-grid">
          
          {/* Left Column: Image with Experience Badge */}
          <div className="about-image-column">
            <div className="about-image-frame">
              <img src={workerImg} alt="Omega Solar Engineering Team" className="about-img" />
              <div className="about-badge-card">
                <div className="badge-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="badge-info">
                  <span className="badge-num">10+ Years</span>
                  <span className="badge-text">Solar Engineering Excellence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Points */}
          <div className="about-text-column">
            <div className="section-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Who We Are</span>
            </div>

            <h2 className="about-title">
              Hyderabad’s Trusted Partner for Turnkey Rooftop Solar
            </h2>

            <p className="about-intro">
              Omega Solar Power Systems is a premier Hyderabad-based engineering company specializing in high-efficiency residential, commercial, and industrial solar installations.
            </p>

            <p className="about-body">
              We manage the complete end-to-end solar transition: from precision rooftop structural design and electrical integration to fast TSSPDCL net-metering approval and PM Surya Ghar subsidy disbursement.
            </p>

            <div className="about-features-grid">
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>Certified Engineering Team</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>Tier-1 Panel Warranties</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>100% Transparent Pricing</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>Fast TSSPDCL Net Metering</span>
              </div>
            </div>

            <div className="about-actions">
              <a href="/quote" className="btn-about-primary">
                Get Solar Consultation →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

