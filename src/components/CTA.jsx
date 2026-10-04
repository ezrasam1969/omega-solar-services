import { useNavigate } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-card">
          
          <div className="cta-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>PM Surya Ghar Subsidy Available</span>
          </div>

          <h2 className="cta-title">Ready to Cut Your Electricity Bills by Up to 90%?</h2>

          <p className="cta-subtitle">
            Book a 100% free rooftop solar survey with Hyderabad’s top engineers. Get customized 3D design and instant cost estimates with zero obligation.
          </p>

          <div className="cta-button-group">
            <button 
              className="btn-cta-primary" 
              onClick={() => navigate('/quote')}
            >
              <span>Request Free Site Survey</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <a href="tel:+918978428057" className="btn-cta-call">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call +91 89784 28057</span>
            </a>
          </div>

          <div className="cta-trust-foot">
            <span>✓ Up to ₹78,000 Direct Govt Subsidy</span>
            <span>✓ 25-Year Panel Warranty</span>
            <span>✓ 0% Down EMI</span>
          </div>

        </div>
      </div>
    </section>
  );
}

