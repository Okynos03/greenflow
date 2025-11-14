import "../styles/landing.css";

export default function FAQModal({ faq, onClose }) {
  if (!faq) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container" style={{ maxWidth: "500px" }}>
        <div className="modal-header">
          <h2>{faq.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <p style={{ lineHeight: 1.6, color: "#333" }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}
