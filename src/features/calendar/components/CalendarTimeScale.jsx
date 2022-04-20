import React from "react";
import { createNumbersArray } from "../../../scripts/common/createNumbersArray";
import moment from "moment";
import "./timescale.scss";

const CalendarTimeScale = () => {
  const hours = createNumbersArray(1, 23);
  const formatHour = (hour) => moment(new Date(0, 0, 0, hour)).format("HH:mm");

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => {
        return (
          <div key={hour} className="time-slot">
            <span className="time-slot-time">{formatHour(hour)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarTimeScale;
