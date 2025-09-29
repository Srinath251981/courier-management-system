import React from "react";
import "./Popup.css";

interface PopupProps {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, children, title }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2
          style={{
            color: "#000000",
          }}
        >
          {title}
        </h2>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
