import React from "react";
import moment from "moment";
import "./event.scss";

const Event = ({ events, setCurrentEvent, openPopup }) => {
  const prepareEventStyles = (start, end, color) => {
    return {
      top: `${moment(start).minutes()}px`,
      height: `${moment(end).diff(moment(start), "minutes")}px`,
      backgroundColor: color,
    };
  };

  const prepareEventClass = (start, end) => {
    const momentStart = moment(start).format("YYYY-MM-DD HH:mm");
    const momentEnd = moment(end).format("YYYY-MM-DD HH:mm");
    const momentNow = moment().format("YYYY-MM-DD HH:mm");
    if (momentStart < momentNow && momentNow >= momentEnd) {
      return "event event__past";
    } else {
      return "event";
    }
  };

  const formatEventTime = (start, end) => {
    return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;
  };

  const onClickEvent = (e, id) => {
    e.stopPropagation();

    const event = events.find((event) => event.id === id);
    event.day = moment(event).format("YYYY-MM-DD");
    setCurrentEvent(event);
    openPopup(preparePositionPopup(e));
  };

  const preparePositionPopup = (event) => {
    const diffPositionClickWidth = window.innerWidth - event.pageX;
    const diffPositionClickHeight = window.innerHeight - event.pageY;
    const marginClickWidth = 150;
    const marginClickHeight = 125;
    const left =
      diffPositionClickWidth >= marginClickWidth
        ? event.pageX
        : window.innerWidth - marginClickWidth;
    const top =
      diffPositionClickHeight >= marginClickHeight
        ? event.pageY
        : window.innerHeight - marginClickHeight;

    return { top, left };
  };

  return events.map(({ id, title, start, end, color }) => {
    return (
      <div
        key={id}
        className={prepareEventClass(start, end)}
        style={prepareEventStyles(start, end, color)}
        onClick={(e) => onClickEvent(e, id)}
      >
        {moment(end).diff(moment(start), "minutes") > 30 && (
          <div className="event-title">{title}</div>
        )}
        <div
          className={
            moment(end).diff(moment(start), "minutes") <= 15
              ? "event__time event__time-small"
              : "event__time"
          }
        >
          {formatEventTime(start, end)}
        </div>
      </div>
    );
  });
};

export default Event;
