import React from "react";
import moment from "moment";

const CalendarHeaderDay = ({ days }) => {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const getDayClasses = (day) => {
    let dayClasses = "calendar__day-label day-label";
    let dayClassesPrev = `${dayClasses} calendar__day-prev`;
    let dayClassesNext = `${dayClasses} calendar__day-next`;
    let dayClassesActive = `${dayClasses} calendar__day-active`;

    const dayMoment = moment(day).format("DD.MM.YYYY");
    const todayMoment = moment().format("DD.MM.YYYY");

    return dayMoment < todayMoment
      ? dayClassesPrev
      : dayMoment > todayMoment
      ? dayClassesNext
      : dayClassesActive;
  };

  return days.map((day) => {
    return (
      <div key={moment(day).unix()} className={getDayClasses(day)}>
        <span className="day-label__day-name">{daysOfWeek[day.getDay()]}</span>
        <span className="day-label__day-number">{day.getDate()}</span>
      </div>
    );
  });
};

export default CalendarHeaderDay;
