import React from "react";
import CalendarHeaderDay from "./CalendarHeaderDay";

const CalendarHeader = ({ week }) => {
  return (
    <header className="calendar__header">
      <CalendarHeaderDay days={week} />
    </header>
  );
};

export default CalendarHeader;
