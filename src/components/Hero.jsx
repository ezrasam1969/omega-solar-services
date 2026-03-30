import heroImage from '../assets/images/hero-en.jpg';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      id="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Save Up to 99% on Electricity Bills with Rooftop Solar</h1>
          <p>Professional solar installation services for homes and buildings</p>
          <button className="hero-btn" onClick={() => navigate('/quote')}>Get Free Quote</button>
        </div>
      </div>
    </section>
  );
}
