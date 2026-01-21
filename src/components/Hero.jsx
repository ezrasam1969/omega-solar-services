import heroImage from '../assets/images/hero-en.jpg';
import './Hero.css';

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Save Up to 70% on Electricity Bills with Rooftop Solar</h1>
          <p>Professional solar installation services for homes and buildings</p>
          <button className="hero-btn">Get Free Quote</button>
        </div>
      </div>
    </section>
  );
}
