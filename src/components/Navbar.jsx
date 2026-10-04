import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <div className="logo-text-group">
            <span className="brand-name">Omega Solar</span>
            <span className="brand-tagline">Power Systems</span>
          </div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className={`hamburger-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="/#hero" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/#services" className="nav-link" onClick={() => setMenuOpen(false)}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="/#how-it-works" className="nav-link" onClick={() => setMenuOpen(false)}>
              Process
            </a>
          </li>
          <li className="nav-item">
            <a href="/#projects" className="nav-link" onClick={() => setMenuOpen(false)}>
              Projects
            </a>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          
          {/* Quick Call Link */}
          <li className="nav-item call-link-item">
            <a href="tel:+919876543210" className="nav-call-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 89784 28057</span>
            </a>
          </li>

          {/* CTA Quote Button */}
          <li className="nav-item cta-item">
            <Link to="/quote" className="nav-cta-btn" onClick={() => setMenuOpen(false)}>
              <span>Get Free Quote</span>
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}

