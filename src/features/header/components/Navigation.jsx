import React from "react";
import "./navigation.scss";

const Navigation = ({
  setPrevWeek,
  setCurrentWeek,
  setNextWeek,
  displayedMonth,
}) => {
  return (
    <div className="navigation">
      <button
        data-direction="today"
        className="navigation__today-btn button"
        onClick={() => setCurrentWeek()}
      >
        Today
      </button>
      <button
        data-direction="prev"
        className="icon-button navigation__nav-icon"
        onClick={() => setPrevWeek()}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        data-direction="next"
        className="icon-button navigation__nav-icon"
        onClick={() => setNextWeek()}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{displayedMonth}</span>
    </div>
  );
};

export default Navigation;
