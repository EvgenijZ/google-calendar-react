import React from "react";
import "./popup.scss";

const Popup = ({ settings, onEditEvent, onDeleteEvent, closePopup }) => {
  const popupStyles = {
    left: settings.left + "px",
    top: settings.top + "px",
  };

  return (
    settings.isOpen && (
      <div className="popup overlay">
        <div className="popup__overlay" onClick={closePopup}></div>
        <div className="popup__content" style={popupStyles}>
          <button className="button edit-event-btn" onClick={onEditEvent}>
            Edit
          </button>
          <button className="button delete-event-btn" onClick={onDeleteEvent}>
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;
