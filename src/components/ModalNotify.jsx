import React from "react";

const ModalNotify = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        x
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalNotify;
