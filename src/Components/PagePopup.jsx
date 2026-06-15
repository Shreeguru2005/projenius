import React from "react";
import "./PagePopup.css";

export default function PagePopup({ imageSrc, title, subtitle, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container animate-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose} aria-label="Close">
          <i className="bi bi-x"></i>
        </button>
        <div className="popup-content">
          {imageSrc && (
            <div className="popup-image-wrapper">
              <img src={imageSrc} alt={title} className="popup-image" />
            </div>
          )}
          <div className="popup-text-content">
            <span className="popup-subtitle">{subtitle}</span>
            <h3 className="popup-title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
