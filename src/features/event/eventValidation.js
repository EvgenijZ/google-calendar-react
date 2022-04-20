import moment from "moment";

export default async (obj, events) => {
  const [start, end] = prepareDate(obj);
  const errors = [];
  const filteredEvents = [];

  events.forEach((event) => {
    checkStartObjBetween(event, start, filteredEvents);
    checkStartEventBetween(event, start, end, filteredEvents);
    checkEqualStart(event, start, filteredEvents);
    checkCurrentId(obj, filteredEvents);
  });

  if (filteredEvents.length)
    errors.push("Два события не могут пересекаться по времени");
  if (
    moment(start) > moment(end) ||
    moment(start).unix() === moment(end).unix()
  )
    errors.push("Неккоретный диапазон события");
  if (moment(end).diff(moment(start), "hours") > 6)
    errors.push("Cобытие не может быть дольше 6 часов");

  return errors.length
    ? { errors: JSON.stringify(errors.join(", ")) }
    : { success: true };
};

const prepareDate = (obj, format = "YYYY-MM-DD HH:mm") => {
  const start = moment(obj.start).format(format);
  const end = moment(obj.end).format(format);
  return [start, end];
};

const checkStartObjBetween = (event, start, filteredEvents) =>
  moment(start).isBetween(
    moment(event.start).format("YYYY-MM-DD HH:mm"),
    moment(event.end).format("YYYY-MM-DD HH:mm")
  )
    ? filteredEvents.push(event)
    : false;

const checkStartEventBetween = (event, start, end, filteredEvents) =>
  moment(moment(event.start).format("YYYY-MM-DD HH:mm")).isBetween(start, end)
    ? filteredEvents.push(event)
    : false;

const checkEqualStart = (event, start, filteredEvents) =>
  moment(event.start).format("YYYY-MM-DD HH:mm") == start
    ? filteredEvents.push(event)
    : false;

const checkCurrentId = (event, filteredEvents) => {
  filteredEvents.forEach((e, index) => {
    if (e.id === event.id) filteredEvents.splice(index, 1);
  });
  return filteredEvents;
};
