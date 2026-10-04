import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // 🟢 Save message to Firebase Firestore "contacts" collection
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Firebase contact submit error:", error);
      setStatus({
        submitting: false,
        success: false,
        error: "Could not send message. Please try calling us directly."
      });
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-page">
        <div className="contact-container">
          
          <h1>Contact Us</h1>
          <p className="contact-intro">
            Get in touch with Omega Solar Power Systems for rooftop solar installation, site assessment, and project inquiries.
          </p>

          <div className="contact-grid">

            {/* Contact Info */}
            <div className="contact-info">
              <h3>Our Office</h3>
              <p><strong>Omega Solar Power Systems</strong></p>
              <p>Malkajgiri, Hyderabad, Telangana</p>

              <p>📞 +91 89784 28057</p>
              <p>✉ omegasolarservices@gmail.com</p>
              <p>🕘 Mon - Sat : 9:00 AM - 6:00 PM</p>

              <div className="contact-buttons">
                <a href="tel:+918978428057" className="call-btn">
                  Call Now
                </a>
                <a
                  href="https://wa.me/918978428057"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form Connected to Firebase */}
            <div className="contact-form">
              <h3>Send a Message</h3>

              {status.success ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>✅</div>
                  <h4 style={{ color: "#059669", marginBottom: "8px" }}>Message Sent!</h4>
                  <p style={{ fontSize: "14px", color: "#64748b" }}>
                    Thank you for reaching out. Our team will contact you shortly.
                  </p>
                  <button
                    style={{
                      marginTop: "16px",
                      background: "#0b2a4a",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {status.error && (
                    <div style={{ color: "#dc2626", marginBottom: "12px", fontSize: "13px" }}>
                      ⚠️ {status.error}
                    </div>
                  )}

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    rows="4"
                  ></textarea>

                  <button type="submit" disabled={status.submitting}>
                    {status.submitting ? "Sending to Firebase..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Google Map */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps?q=Malkajgiri,+Hyderabad&output=embed"
              loading="lazy"
              title="Omega Solar Location Map"
            ></iframe>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}