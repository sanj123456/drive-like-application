import React from "react";
import "./modal.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, children, title }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{title}</h2>
              <span className="close-btn" onClick={handleClose}>
                <IoIosCloseCircleOutline />
              </span>
            </div>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
