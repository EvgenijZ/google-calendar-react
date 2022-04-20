import React from "react";
import CalendarTimeLine from "./CalendarTimeLine";
import CalendarSlot from "./CalendarSlot";
import moment from "moment";

const CalendarDay = ({
  day,
  events,
  setCurrentEvent,
  openPopup,
  showModal,
}) => {
  const checkCurrentDay = () =>
    moment(new Date()).format("YYYY MM DD") ===
    moment(day).format("YYYY MM DD");

  const filteredEvents = () => {
    const eventsArr = events.filter(
      (event) =>
        moment(event.start).format("YYYY MM DD") ==
        moment(day).format("YYYY MM DD")
    );
    return eventsArr;
  };

  return (
    <div className="calendar__day">
      {checkCurrentDay() && <CalendarTimeLine day={day} />}
      <CalendarSlot
        events={filteredEvents()}
        day={day}
        setCurrentEvent={setCurrentEvent}
        openPopup={openPopup}
        showModal={showModal}
      />
    </div>
  );
};

export default CalendarDay;
