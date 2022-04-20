import React from "react";
import moment from "moment";

const CalendarTimeLine = ({ day }) => {
  const topPosition = { top: `${moment(new Date()).diff(day, "minutes")}px` };
  return <div className="current-timeline" style={topPosition}></div>;
};

export default CalendarTimeLine;
