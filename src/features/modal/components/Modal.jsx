import React from "react";
import EventForm from "../../event/components/EventForm";
import "./modal.scss";
import "./create-event.scss";

const Modal = ({
  settings,
  onClose,
  onCreateEvent,
  onUpdateEvent,
  currentEvent,
  events,
}) => {
  return (
    settings.isOpen && (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <EventForm
              events={events}
              onClose={onClose}
              onCreateEvent={onCreateEvent}
              onUpdateEvent={onUpdateEvent}
              currentEvent={currentEvent}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
