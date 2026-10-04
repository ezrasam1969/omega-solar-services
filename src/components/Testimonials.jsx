import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "Jubilee Hills, Hyderabad",
    projectType: "Residential Solar (8 kW)",
    rating: 5,
    savings: "Saved ₹8,100 / month",
    quote: "Switching to rooftop solar with Omega Solar dropped our monthly electricity bill from ₹8,500 to under ₹400! The installation was smooth and completed in just 2 days.",
    avatarBg: "#10b981",
    initials: "RS",
    verified: true
  },
  {
    id: 2,
    name: "Dr. Priya Reddy",
    location: "Gachibowli, Hyderabad",
    projectType: "Residential Solar (5 kW)",
    rating: 5,
    savings: "Saved ₹5,200 / month",
    quote: "Their team handled the PM Surya Ghar subsidy application completely. We received ₹78,000 directly in our bank account and our home runs on 100% clean solar power.",
    avatarBg: "#0284c7",
    initials: "PR",
    verified: true
  },
  {
    id: 3,
    name: "K. Srinivas Goud",
    location: "Cherlapally, Hyderabad",
    projectType: "Commercial Solar (35 kW)",
    rating: 5,
    savings: "Saved ₹34,000 / month",
    quote: "Our factory power tariff was bleeding our operating margins. Omega Solar engineered a 35kW system that paid for itself in under 3 years. Outstanding engineering!",
    avatarBg: "#8b5cf6",
    initials: "SG",
    verified: true
  },
  {
    id: 4,
    name: "Ananya & Vikram Rao",
    location: "Banjara Hills, Hyderabad",
    projectType: "Hybrid Solar (10 kW)",
    rating: 5,
    savings: "Saved ₹9,800 / month",
    quote: "Zero power outages even during summer grid fluctuations thanks to their hybrid battery setup. Our electricity bills are practically zero every single month.",
    avatarBg: "#f59e0b",
    initials: "VR",
    verified: true
  },
  {
    id: 5,
    name: "Madhusudhan V.",
    location: "Kondapur, Hyderabad",
    projectType: "Commercial Solar (50 kW)",
    rating: 5,
    savings: "Saved ₹48,000 / month",
    quote: "Extremely professional installation with top-tier Tier-1 solar panels. Net-metering approval from TSSPDCL was fast and completely hassle-free.",
    avatarBg: "#ec4899",
    initials: "MV",
    verified: true
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const total = TESTIMONIALS_DATA.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-play interval (5 seconds)
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isPaused]);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Client Reviews</span>
          </div>
          <h2 className="testimonials-title">What Our Hyderabad Customers Say</h2>
          <p className="testimonials-description">
            Read real feedback from homeowners and commercial partners across Telangana who eliminated their electricity bills with our rooftop solar systems.
          </p>
        </div>

        {/* Carousel Outer Container */}
        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous Arrow Button */}
          <button 
            className="carousel-arrow prev-arrow" 
            onClick={prevSlide}
            aria-label="Previous Testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Cards Track */}
          <div className="carousel-track-container">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS_DATA.map((item) => (
                <div key={item.id} className="testimonial-card-slide">
                  <div className="testimonial-card">
                    
                    {/* Top Row: Quote Icon & Savings Pill */}
                    <div className="card-top-row">
                      <div className="quote-icon-box">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>

                      <div className="savings-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        <span>{item.savings}</span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="star-rating">
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </div>

                    {/* 1-2 Sentence Quote */}
                    <p className="testimonial-quote">
                      "{item.quote}"
                    </p>

                    {/* Customer Profile Footer */}
                    <div className="customer-profile">
                      <div className="avatar-circle" style={{ backgroundColor: item.avatarBg }}>
                        <span>{item.initials}</span>
                      </div>

                      <div className="customer-details">
                        <div className="name-row">
                          <h4 className="customer-name">{item.name}</h4>
                          {item.verified && (
                            <span className="verified-badge" title="Verified Installation">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Verified Client
                            </span>
                          )}
                        </div>
                        <p className="customer-location">📍 {item.location}</p>
                        <span className="project-type-tag">{item.projectType}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button 
            className="carousel-arrow next-arrow" 
            onClick={nextSlide}
            aria-label="Next Testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots">
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
