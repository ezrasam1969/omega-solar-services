import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">SolarPower</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li>About</li>
        <li>Services</li>
        <li>Projects</li>
        <li>
          <Link to="/quote">
            <button className="quote-btn">Get Quote</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
