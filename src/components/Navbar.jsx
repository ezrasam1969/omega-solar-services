import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Omega Solar Services</div>


      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="/#about">About</a></li>
        <li><a href="/#services">Services</a></li>
        <li><a href="/#projects">Projects</a></li>
        <li>
          <Link to="/quote">
            <button className="quote-btn">Get Quote</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
