import './callbutton.css';

export default function CallButton() {
  return (
    <div className="call-wrapper">
      <span className="call-tooltip">Call us now</span>

      <a
        href="tel:+918978428057"
        className="call-float"
        aria-label="Call us"
      >
        <i className="fa-solid fa-phone"></i>
      </a>
    </div>
  );
}
