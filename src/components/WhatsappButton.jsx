import './WhatsappButton.css';

export default function WhatsAppButton() {
  return (
    <div className="whatsapp-wrapper">
      <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>

      <a
        href="https://wa.me/917995055890?text=Hi,%20I%20am%20interested%20in%20rooftop%20solar%20installation"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
