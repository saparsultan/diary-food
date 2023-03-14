import React from "react";

const ModalNotify = ({ isOpen, onClose, children, type }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" style={type==="error" ? {backgroundColor: "#f57474"} : {}}>
      <button className="modal-close" onClick={onClose}>
        x
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalNotify;
