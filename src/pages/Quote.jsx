import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Quote.css';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    type: 'Residential',
    bill: '',
    message: ''
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
      // 🟢 Add document to Firebase Firestore "leads" collection
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        propertyType: formData.type,
        monthlyBill: formData.bill,
        message: formData.message,
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });

      setStatus({ submitting: false, success: true, error: null });
    } catch (error) {
      console.error("Firebase submit error:", error);
      setStatus({
        submitting: false,
        success: false,
        error: "Failed to submit request. Please check your network or call us directly."
      });
    }
  };

  const resetForm = () => {
    setStatus({ submitting: false, success: false, error: null });
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      type: 'Residential',
      bill: '',
      message: ''
    });
  };

  return (
    <>
      <Navbar />

      <section className="quote-section">
        <div className="quote-container">

          <div className="quote-header">
            <span className="quote-badge">⚡ Instant Site Survey & Quote</span>
            <h1 className="quote-title">Request a Free Rooftop Solar Quote</h1>
            <p className="quote-subtitle">
              Fill in your details below and our TSSPDCL-certified solar engineering team will get back to you with a 3D layout & cost breakdown within 24 hours.
            </p>
          </div>

          <div className="quote-card-wrap">
            {status.success ? (
              <div className="quote-success-box">
                <div className="success-icon">✅</div>
                <h3>Quote Request Submitted Successfully!</h3>
                <p>Thank you! Your quote request has been saved in our system. Our solar engineer will contact you shortly.</p>
                <button className="btn-submit-again" onClick={resetForm}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                {status.error && (
                  <div className="quote-error-banner">
                    ⚠️ {status.error}
                  </div>
                )}

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>City / Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Property Type *</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                      <option value="Residential">Residential Rooftop</option>
                      <option value="Commercial">Commercial Building</option>
                      <option value="Industrial">Industrial Plant / Factory</option>
                      <option value="Agricultural">Agricultural / Solar Farm</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Approx. Monthly Bill (₹)</label>
                    <input
                      type="text"
                      name="bill"
                      value={formData.bill}
                      onChange={handleChange}
                      placeholder="e.g. ₹5,000 / month"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Additional Notes / System Capacity Preference</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your rooftop area or specific requirements..."
                    rows="3"
                  ></textarea>
                </div>

                {/* 🟢 PROMINENT FIREBASE CONNECTED SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="quote-submit-btn"
                  disabled={status.submitting}
                >
                  {status.submitting ? (
                    <>
                      <span className="submit-spinner"></span>
                      <span>Saving to Firebase Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Quote Request</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
