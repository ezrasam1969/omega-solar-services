import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-home" id="about">

      <div className="about-container">

        <div className="about-text">

          <h2>About Omega Solar Services</h2>

          <p className="about-main">
            Omega Solar Services is a Hyderabad-based solar installation
            company specializing in residential, commercial, and
            industrial rooftop solar systems.
          </p>

          <p>
            We focus on professional installation, structural work,
            electrical integration, and long-term system reliability.
            Our team brings hands-on experience and technical expertise
            to every project.
          </p>

          <ul className="about-points">
            <li>✔ Experienced installation team</li>
            <li>✔ Quality workmanship & safety standards</li>
            <li>✔ Transparent pricing</li>
            <li>✔ Timely project delivery</li>
            <li>✔ Post-installation support</li>
          </ul>

          <a href="/contact" className="about-btn">
            Contact Us
          </a>

        </div>

      </div>

    </section>
  );
}
