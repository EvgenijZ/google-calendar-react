import React from "react";

const CalendarBody = ({ children }) => {
  return (
    <div className="calendar__body">
      <div className="calendar__week-container">{children}</div>
    </div>
  );
};

export default CalendarBody;
