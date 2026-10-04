import { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    id: 1,
    category: "Subsidy & Finance",
    question: "How do I claim the PM Surya Ghar government subsidy in Hyderabad?",
    answer: "Residential homeowners in Hyderabad & Telangana installing rooftop solar up to 3kW are eligible for direct government subsidies up to ₹78,000 under the PM Surya Ghar Muft Bijli Yojana (₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW and above). Omega Solar handles the complete online portal registration, site inspection, and TSSPDCL net-metering approval so the subsidy is credited directly into your bank account."
  },
  {
    id: 2,
    category: "Financial ROI",
    question: "What is the average payback period for a rooftop solar investment?",
    answer: "For residential homeowners, the typical payback period is between 3 to 4 years through monthly electricity bill savings. For commercial and industrial businesses benefiting from 40% accelerated depreciation tax write-offs, the payback is even faster at 2.5 to 3 years. After recouping your initial investment, your solar system generates free electricity for the remainder of its 25+ year lifespan."
  },
  {
    id: 3,
    category: "Technical & Grid",
    question: "What happens during a power outage or grid failure?",
    answer: "Standard grid-tied (on-grid) solar systems automatically shut down during a grid outage as a mandatory safety feature to protect utility lineworkers (known as anti-islanding protection). If 24/7 uninterrupted power is essential, we install hybrid solar systems with lithium battery storage that switch instantly during power cuts to run your lights, fans, refrigerator, and air conditioners."
  },
  {
    id: 4,
    category: "Warranties & Quality",
    question: "What warranties are included with Omega Solar installations?",
    answer: "Every installation includes a 25-Year Linear Performance Warranty on Tier-1 solar panels (guaranteeing at least 80% output efficiency at year 25), a 10 to 12-year warranty on on-grid / hybrid inverters, and a 5-year comprehensive workmanship & civil structural warranty covering hot-dip galvanized mounting structures, ACDB/DCDB boxes, earthing, and wiring."
  },
  {
    id: 5,
    category: "Maintenance",
    question: "What maintenance is required to keep solar panels running efficiently?",
    answer: "Solar PV panels have zero moving parts, making them extremely low maintenance. Cleaning dust and debris off the panels with water once every 2 to 3 weeks is generally all that's required to maintain maximum efficiency. Omega Solar also equips all systems with mobile app remote monitoring so you can track real-time daily energy generation from anywhere."
  },
  {
    id: 6,
    category: "Metering & Approvals",
    question: "Do you handle TSSPDCL net-metering approvals?",
    answer: "Yes, 100%! We provide complete end-to-end service including DISCOM application submission, solar meter testing, structural stability documentation, and physical net-meter installation with TSSPDCL (Telangana State Southern Power Distribution Company Limited). You don't have to deal with bureaucracy."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1); // Default first question open

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">
            Everything you need to know about rooftop solar installation, PM Surya Ghar subsidies, grid net-metering, and long-term savings in Hyderabad.
          </p>
        </div>

        {/* Accordions List */}
        <div className="faq-accordion-list">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="question-left">
                    <span className="faq-category-tag">{item.category}</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <div className="faq-icon-indicator">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      className={`chevron-icon ${isOpen ? 'rotated' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Card */}
        <div className="faq-help-box">
          <div className="help-info">
            <h4>Have a specific solar question for your roof?</h4>
            <p>Our Hyderabad solar engineering team is available 6 days a week to assist you.</p>
          </div>
          <div className="help-actions">
            <a href="tel:+918978428057" className="btn-help-phone">
              📞 Call +91 89784 28057
            </a>
            <a href="https://wa.me/918978428057" target="_blank" rel="noopener noreferrer" className="btn-help-whatsapp">
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
