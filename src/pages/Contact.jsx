import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-page">

        <div className="contact-container">

          <h1>Contact Us</h1>
          <p className="contact-intro">
            Get in touch with Omega Solar Services for rooftop solar
            installation, site assessment, and project inquiries.
          </p>

          <div className="contact-grid">

            {/* Contact Info */}
            <div className="contact-info">

              <h3>Our Office</h3>

              <p><strong>Omega Solar Systems</strong></p>
              <p>Malkajgiri, Hyderabad, Telangana</p>

              <p>📞 +91 8978428057</p>
              <p>✉ omegasolarservices@gmail.com</p>

              <p>🕘 Mon - Sat : 9:00 AM - 6:00 PM</p>

              <div className="contact-buttons">

                <a href="tel:+918978428057" className="call-btn">
                  Call Now
                </a>

                <a
                  href="https://wa.me/918978428057"
                  className="whatsapp-btn"
                >
                  WhatsApp
                </a>

              </div>

            </div>

            {/* Contact Form */}
            <div className="contact-form">

              <h3>Send a Message</h3>

              <form>

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                />

                <textarea
                  placeholder="Your Message"
                  rows="4"
                ></textarea>

                <button type="submit">
                  Send Message
                </button>

              </form>

            </div>

          </div>

          {/* Google Map */}
          <div className="contact-map">

            <iframe
              src="https://www.google.com/maps?q=Hyderabad&output=embed"
              loading="lazy"
              title="map"
            ></iframe>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}