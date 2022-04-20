import React from "react";
import "./calendar.scss";
import PropTypes from "prop-types";

const Calendar = ({ children }) => {
  return <section className="calendar">{children}</section>;
};

export default Calendar;

Calendar.propTypes = {
  children: PropTypes.node.isRequired,
};
