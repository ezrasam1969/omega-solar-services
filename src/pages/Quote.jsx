import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
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
    type: '',
    bill: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: new Date()
      });

      alert("Request submitted successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        type: '',
        bill: '',
        message: ''
      });
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="quote">
        <h1>Request a Free Solar Quote</h1>
        <p>Fill in the details below and our team will contact you.</p>

        <form className="quote-form" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="City / Location" required />

          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Property Type</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>

          <input name="bill" value={formData.bill} onChange={handleChange} placeholder="Monthly Electricity Bill" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional Details"></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </section>

      <Footer />
    </>
  );
}
