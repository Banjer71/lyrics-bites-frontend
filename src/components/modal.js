import React from "react";
import "../css/modal.css";

const Modal = ({ open, OnClose, children }) => {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={OnClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
