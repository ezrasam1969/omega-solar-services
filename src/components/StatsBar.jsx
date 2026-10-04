import { useState, useEffect, useRef } from 'react';
import './StatsBar.css';

const STATS_DATA = [
  {
    id: 'installations',
    target: 750,
    suffix: '+',
    label: 'Total Installations',
    sublabel: 'Residential, Commercial & Industrial',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  {
    id: 'capacity',
    target: 15000,
    suffix: '+ kW',
    label: 'Capacity Installed',
    sublabel: 'Clean Solar Energy Generated',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    )
  },
  {
    id: 'experience',
    target: 10,
    suffix: '+ Years',
    label: 'Years in Business',
    sublabel: 'Trusted Hyderabad Solar Experts',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 12 11 14 15 10"></polyline>
      </svg>
    )
  },
  {
    id: 'satisfaction',
    target: 99.4,
    suffix: '%',
    isDecimal: true,
    label: 'Customer Satisfaction',
    sublabel: '5-Star Rated Service & Support',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    )
  }
];

export default function StatsBar() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar-section" ref={sectionRef}>
      <div className="stats-bar-container">
        <div className="stats-grid">
          {STATS_DATA.map((stat) => (
            <StatItem 
              key={stat.id} 
              stat={stat} 
              shouldAnimate={hasAnimated} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, shouldAnimate }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth count-up slowing down near target
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * stat.target;
      
      setValue(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [shouldAnimate, stat.target]);

  const displayValue = stat.isDecimal
    ? value.toFixed(1)
    : Math.floor(value).toLocaleString();

  return (
    <div className="stat-item">
      <div className="stat-icon-box">
        {stat.icon}
      </div>
      <div className="stat-content">
        <div className="stat-value-row">
          <span className="stat-counter-number">{displayValue}</span>
          <span className="stat-counter-suffix">{stat.suffix}</span>
        </div>
        <span className="stat-label-text">{stat.label}</span>
        <span className="stat-sublabel-text">{stat.sublabel}</span>
      </div>
    </div>
  );
}
