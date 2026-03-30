import './Footer.css';
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-col">
          <h3>Omega Solar Power Systems</h3>
          <p>
            Professional solar installation and civil works for homes,
            commercial buildings, and industries in Hyderabad.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/quote">Get Quote</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul> */}
          <ul>

  <li><Link to="/">Home</Link></li>

  <li><a href="/#about">About</a></li>

  <li><a href="/#services">Services</a></li>

  <li><a href="/#projects">Projects</a></li>

  <li><Link to="/contact">Contact</Link></li>

  <li><Link to="/quote">Get Quote</Link></li>

</ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>📞 +91 8978428057</p>
          <p>📞 +91 7995055890</p>
          <p>💬 WhatsApp: +91 7995055890</p>
          <p>✉️ omegasolarservices@gmail.com</p>
          <p>📍 Hyderabad, Telangana</p>
        </div>

        {/* Social Media */}
        <div className="footer-col">
          <h4>Follow Us</h4>

          <div className="social-links">

  <a
    href="https://facebook.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="social facebook"
  >
    <i className="fa-brands fa-facebook-f"></i>
  </a>

  <a
    href="https://instagram.com/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="social instagram"
  >
    <i className="fa-brands fa-instagram"></i>
  </a>

  <a
    href="https://wa.me/918978428057"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="social whatsapp"
  >
    <i className="fa-brands fa-whatsapp"></i>
  </a>
</div>

        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Omega Solar Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
