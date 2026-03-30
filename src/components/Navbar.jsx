// import { Link } from 'react-router-dom';
// import './Navbar.css';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="logo">Omega Solar Services</div>


//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><a href="/#about">About</a></li>
//         <li><a href="/#services">Services</a></li>
//         <li><a href="/#projects">Projects</a></li>
//         <li>
//           <Link to="/quote">
//             <button className="quote-btn">Get Quote</button>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">Omega Solar Power Systems</div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Navigation */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <a href="/#hero" onClick={() => setMenuOpen(false)}>Home</a>
        </li>

        {/* <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li> */}

        <li>
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
        </li>

        <li>
          <a href="/#services" onClick={() => setMenuOpen(false)}>Services</a>
        </li>

        <li>
          <a href="/#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        </li>

        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>

        <li>
          <Link to="/quote" className="quote-btn" onClick={() => setMenuOpen(false)}>
            Get Quote
          </Link>
        </li>

      </ul>

    </nav>
  );
}
