import React from "react";
import CalendarDay from "./CalendarDay";
import moment from "moment";

const CalendarWeek = ({
  week,
  events,
  setCurrentEvent,
  openPopup,
  showModal,
}) => {
  return (
    <div className="calendar__week">
      {week.map((day) => (
        <CalendarDay
          key={moment(day).unix()}
          day={day}
          events={events}
          setCurrentEvent={setCurrentEvent}
          openPopup={openPopup}
          showModal={showModal}
        />
      ))}
    </div>
  );
};

export default CalendarWeek;
