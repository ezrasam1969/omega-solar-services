 

import residential from '../assets/images/residential.jpg';
import Commercial from '../assets/images/Commercial.jpg';
import comm from '../assets/images/comm.jpg';


import './ServicesPreview.css';

export default function ServicesPreview() {
  return (
    <section className="services" id="services">
      <h2>Our Solar Services</h2>

      <div className="services-grid">
        <div className="service-card">
          <img src={residential} alt="Home Solar Installation" />
          <h3>Residential Solar</h3>
          <p>Affordable rooftop solar systems for homes to reduce electricity bills.</p>
        </div>

        <div className="service-card">
          <img src={comm} alt="Commercial Solar Installation" />
          <h3>Commercial Solar</h3>
          <p>High-efficiency solar solutions for offices, shops, and commercial buildings.</p>
        </div>

        <div className="service-card">
          <img src={Commercial} alt="Industrial Solar Installation" />
          <h3>Industrial Solar</h3>
          <p>Large-scale rooftop and ground-mounted solar systems for factories.</p>
        </div>
      </div>
    </section>
  );
}
