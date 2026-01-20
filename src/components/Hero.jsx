import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Save Up to 70% on Electricity Bills with Solar Power</h1>
        <p>Residential & Commercial Solar Installations</p>
        <button className="hero-btn">Get Free Quote</button>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1592833158982-d0b8d15d6c02"
          alt="Solar Panels"
        />
      </div>
    </section>
  );
}
