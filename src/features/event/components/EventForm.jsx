import React, { useState, useEffect } from "react";
import { createNumbersArray } from "../../../scripts/common/createNumbersArray";
import moment from "moment";
import validateDataEvent from "../eventValidation.js";

const EventForm = ({
  onClose,
  onCreateEvent,
  onUpdateEvent,
  currentEvent,
  events,
}) => {
  const selectHoursArr = createNumbersArray(0, 23).map((hour) =>
    hour < 10 ? "0" + hour : hour
  );

  const selectMinutesArr = ["00", "15", "30", "45"];

  const colorsEventArr = [
    "#0097e6",
    "#8c7ae6",
    "#e1b12c",
    "#44bd32",
    "#40739e",
    "#c23616",
    "#718093",
    "#192a56",
    "#353b48",
  ];

  const allowedFields = ["id", "title", "start", "end", "description", "color"];

  const removeExcludeFields = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (!allowedFields.includes(key)) delete obj[key];
    });
  };

  const baseEventObj = {
    title: "",
    day: moment().format("YYYY-MM-DD"),
    startHours: moment().format("HH"),
    startMinutes: "00",
    endHours: +moment().format("HH") + 1,
    endMinutes: "00",
    description: "",
    color: "#0097e6",
  };

  const [event, setEvent] = useState(currentEvent || baseEventObj);

  const prepareEvent = (e) => {
    e.preventDefault();

    const eventObj = Object.assign(
      {
        start: moment(event.day)
          .set("hour", event.startHours)
          .set("minute", event.startMinutes)
          .toISOString(),
        end: moment(event.day)
          .set("hour", event.endHours)
          .set("minute", event.endMinutes)
          .toISOString(),
      },
      event
    );

    removeExcludeFields(eventObj);

    validateDataEvent(eventObj, events)
      .then((result) => {
        if (result.errors) throw new Error(result.errors);
        eventObj.id ? onUpdateEvent(eventObj) : onCreateEvent(eventObj);
      })
      .catch((error) => alert(error));
  };

  const prepareEventObjForForm = (eventObj) => {
    const editEvent = Object.assign({}, eventObj);
    editEvent.day = moment(editEvent.start).format("YYYY-MM-DD");
    editEvent.startHours = moment(editEvent.start).format("HH");
    editEvent.startMinutes = moment(editEvent.start).format("mm");
    editEvent.endHours = moment(editEvent.end).format("HH");
    editEvent.endMinutes = moment(editEvent.end).format("mm");
    delete editEvent.start;
    delete editEvent.end;
    return editEvent;
  };

  const onChangeInput = (e) => {
    e.persist();
    setEvent((oldEvent) => ({
      ...oldEvent,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!currentEvent || !currentEvent.id) return;
    setEvent(prepareEventObjForForm(currentEvent));
  }, [currentEvent]);

  return (
    <form className="event-form" onSubmit={prepareEvent}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="event-form__field"
        value={event.title}
        onChange={onChangeInput}
      />
      <div className="event-form__time">
        <input
          type="date"
          name="day"
          className="event-form__field"
          value={event.day}
          onChange={onChangeInput}
        />
        <select
          name="startHours"
          onChange={onChangeInput}
          value={event.startHours}
        >
          {selectHoursArr.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        {" : "}
        <select
          name="startMinutes"
          onChange={onChangeInput}
          value={event.startMinutes}
        >
          {selectMinutesArr.map((minutes) => {
            return (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
        <span> — </span>
        <select name="endHours" onChange={onChangeInput} value={event.endHours}>
          {selectHoursArr.map((hour) => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        {" : "}
        <select
          name="endMinutes"
          onChange={onChangeInput}
          value={event.endMinutes}
        >
          {selectMinutesArr.map((minutes) => {
            return (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="event-form__field"
        onChange={onChangeInput}
        value={event.description}
        rows="4"
      ></textarea>

      <div className="color-label">
        {colorsEventArr.map((color) => {
          return (
            <label
              key={color}
              style={{ backgroundColor: color }}
              className={event.color === color ? "color-label__checked" : ""}
            >
              <input
                type="radio"
                name="color"
                value={color}
                onChange={onChangeInput}
                checked={event.color === color}
              />
            </label>
          );
        })}
      </div>

      <div className="event-form__buttons">
        <a className="button create-event__close-btn" onClick={() => onClose()}>
          Close
        </a>
        <button type="submit" className="button event-form__submit-btn">
          {event.id ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
