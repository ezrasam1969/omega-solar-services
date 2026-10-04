import { useNavigate } from 'react-router-dom';
import './Process.css';

const PROCESS_STEPS = [
  {
    stepNumber: "01",
    title: "Free Site Survey",
    subtitle: "Rooftop & Shadow Assessment",
    description: "Our certified engineers visit your Hyderabad property to inspect roof structural integrity, solar irradiance, shadow angles, and historical power bills.",
    badge: "Step 1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    )
  },
  {
    stepNumber: "02",
    title: "Custom System Design & Quote",
    subtitle: "3D Modeling & Subsidy Estimate",
    description: "We design a customized 3D solar layout, calculate exact payback timelines & PM Surya Ghar subsidies (up to ₹78,000), and deliver an itemized quote.",
    badge: "Step 2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    stepNumber: "03",
    title: "Installation & Safety Setup",
    subtitle: "Turnkey Solar Engineering",
    description: "Our experienced technical team installs Tier-1 solar panels, inverters, earthing protection, and lightning arresters in as fast as 48 hours.",
    badge: "Step 3",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  {
    stepNumber: "04",
    title: "Commissioning & Support",
    subtitle: "Net-Metering & 25-Yr Support",
    description: "We handle TSSPDCL net-metering approvals, activate your real-time mobile tracking app, and provide 25-year performance warranty support.",
    badge: "Step 4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  }
];

export default function Process() {
  const navigate = useNavigate();

  return (
    <section className="process-section" id="how-it-works">
      <div className="process-container">
        
        {/* Section Header */}
        <div className="process-header">
          <div className="process-subtitle-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="process-title">How Your Solar Journey Works</h2>
          <p className="process-description">
            From initial rooftop survey to net-metering connection with TSSPDCL, we handle every detail for a hassle-free solar transition.
          </p>
        </div>

        {/* Timeline Track & Step Cards */}
        <div className="timeline-container">
          
          {/* Horizontal Line Connector for Desktop */}
          <div className="timeline-connecting-line"></div>

          <div className="process-steps-grid">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.stepNumber} className="step-card">
                
                {/* Step Header: Number Badge & Icon */}
                <div className="step-card-header">
                  <div className="step-number-badge">
                    <span>{step.stepNumber}</span>
                  </div>
                  <div className="step-icon-wrapper">
                    {step.icon}
                  </div>
                </div>

                {/* Step Body */}
                <div className="step-card-body">
                  <span className="step-phase-tag">{step.badge}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <h4 className="step-subtitle">{step.subtitle}</h4>
                  <p className="step-description">{step.description}</p>
                </div>

                {/* Connector Arrow (Visible on desktop between items) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="step-arrow-divider">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Process CTA Footer */}
        <div className="process-cta-banner">
          <div className="process-cta-content">
            <h3>Ready to Start Step 1?</h3>
            <p>Schedule your 100% free, no-obligation rooftop solar survey in Hyderabad today.</p>
          </div>
          <button 
            className="btn-process-cta"
            onClick={() => navigate('/quote')}
          >
            <span>Book Free Site Survey</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
