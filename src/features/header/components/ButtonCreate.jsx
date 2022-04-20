import React from "react";

const ButtonCreate = ({ showModal }) => {
  return (
    <button className="button create-event-btn" onClick={showModal}>
      <i className="fas fa-plus create-event-btn__icon"></i>Create
    </button>
  );
};

export default ButtonCreate;
