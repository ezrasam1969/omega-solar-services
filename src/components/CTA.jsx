import { Link } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta">
      <h2>Ready to Reduce Your Electricity Bills?</h2>
      <Link to="/quote">
        <button>Request Free Site Survey</button>
      </Link>
    </section>
  );
}
