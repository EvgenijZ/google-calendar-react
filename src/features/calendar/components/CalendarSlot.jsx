import React from "react";
import { createNumbersArray } from "../../../scripts/common/createNumbersArray";
import Event from "../../event/components/Event";
import moment from "moment";

const CalendarSlot = ({
  events,
  day,
  setCurrentEvent,
  openPopup,
  showModal,
}) => {
  const hours = createNumbersArray(0, 23);

  const onClick = (e, hour) => {
    prepareHours(hour, e.nativeEvent.offsetY);
  };

  const prepareHours = (hours, minutes) => {
    let startHours = hours >= 10 ? hours : "0" + hours;
    let startMinutes = Math.ceil(minutes / 15) * 15;
    startMinutes = startMinutes >= 45 ? 45 : startMinutes;
    startMinutes = startMinutes == 0 ? "00" : startMinutes;
    let endHours = +startHours + 1;
    endHours = endHours >= 10 ? endHours : "0" + endHours;
    const endMinutes = startMinutes;

    setCurrentEvent({
      title: "",
      day: moment(day).format("YYYY-MM-DD"),
      startHours,
      startMinutes,
      endHours,
      endMinutes,
      description: "",
      color: "#0097e6",
    });
    showModal();
  };

  const filteredEvents = (events, hour) => {
    const formatDay = moment(day).set({ h: hour });
    return events.filter(
      (event) => moment(event.start).format("HH") === formatDay.format("HH")
    );
  };

  return hours.map((hour) => {
    const countEvents = filteredEvents(events, hour).length;
    return (
      <div
        key={hour}
        className="calendar__time-slot"
        onClick={(e) => onClick(e, hour)}
      >
        {countEvents ? (
          <Event
            events={filteredEvents(events, hour)}
            setCurrentEvent={setCurrentEvent}
            openPopup={openPopup}
          />
        ) : null}
      </div>
    );
  });
};

export default CalendarSlot;
