import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  getDisplayedMonth,
  generateWeekRange,
  getStartOfWeek,
} from "./scripts/common/time.utils";
import Header from "./features/header/components/Header";
import Navigation from "./features/header/components/Navigation";
import ButtonCreate from "./features/header/components/ButtonCreate";
import Calendar from "./features/calendar/components/Calendar";
import CalendarHeader from "./features/calendar/components/CalendarHeader";
import CalendarBody from "./features/calendar/components/CalendarBody";
import CalendarTimeScale from "./features/calendar/components/CalendarTimeScale";
import CalendarWeek from "./features/calendar/components/CalendarWeek";
import Modal from "./features/modal/components/Modal";
import Popup from "./features/popup/components/Popup";
import PageNotFound from "./PageNotFound";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./features/event/eventGateway";

const App = () => {
  const [week, setWeek] = useState(
    generateWeekRange(getStartOfWeek(new Date()))
  );

  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [popup, setPopup] = useState({
    isOpen: false,
  });
  const [modal, setModal] = useState({
    isOpen: false,
  });

  const startWeekDay = new Date(week[0]);

  const setPrevWeek = () =>
    setWeek(
      generateWeekRange(
        getStartOfWeek(
          new Date(startWeekDay.setDate(startWeekDay.getDate() - 7))
        )
      )
    );

  const setCurrentWeek = () => {
    const currentWeek = generateWeekRange(getStartOfWeek(new Date()));
    if (+week[0] !== +currentWeek[0]) setWeek(currentWeek);
  };

  const setNextWeek = () =>
    setWeek(
      generateWeekRange(
        getStartOfWeek(
          new Date(startWeekDay.setDate(startWeekDay.getDate() + 7))
        )
      )
    );

  const openPopup = (positions) => setPopup({ ...positions, isOpen: true });
  const closePopup = () => setPopup({ isOpen: false });

  const showModal = () => setModal({ isOpen: true });
  const closeModal = () => {
    setModal({ isOpen: false });
    setCurrentEvent(null);
  };

  const onEditEvent = () => {
    closePopup();
    showModal();
  };

  const onCreateEvent = (eventData) => {
    createEvent(eventData)
      .then((newEvent) => {
        setEvents([newEvent, ...events]);
        closeModal();
      })
      .catch((e) => {
        alert(e);
      });
  };

  const onUpdateEvent = (eventData) => {
    updateEvent(eventData)
      .then((editedEvent) => {
        const editedEvents = events.map((event) => {
          if (event.id == editedEvent.id) {
            event = eventData;
          }
          return event;
        });
        setEvents(editedEvents);
        closeModal();
      })
      .catch((e) => {
        alert(e);
      });
  };

  const onDeleteEvent = () => {
    deleteEvent(currentEvent.id)
      .then((event) => {
        const filteredEvents = events.filter((e) => e.id !== event.id);
        setEvents(filteredEvents);
        closePopup();
      })
      .catch((error) => alert(error));
  };

  const fetchEvents = () => {
    getEvents()
      .then((events) => setEvents(events))
      .catch((e) => alert(e));
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      if (new Date().getSeconds() == 0)
        setWeek(generateWeekRange(getStartOfWeek(new Date())));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header>
              <ButtonCreate showModal={showModal} />
              <Navigation
                setPrevWeek={setPrevWeek}
                setCurrentWeek={setCurrentWeek}
                setNextWeek={setNextWeek}
                displayedMonth={getDisplayedMonth(week[0])}
              />
            </Header>
            <Calendar>
              <CalendarHeader week={week} />
              <CalendarBody>
                <CalendarTimeScale />
                <CalendarWeek
                  week={week}
                  events={events}
                  setCurrentEvent={setCurrentEvent}
                  openPopup={openPopup}
                  showModal={showModal}
                />
              </CalendarBody>
            </Calendar>
            <Modal
              onClose={closeModal}
              onCreateEvent={onCreateEvent}
              onUpdateEvent={onUpdateEvent}
              settings={modal}
              events={events}
              currentEvent={currentEvent}
            />
            <Popup
              closePopup={closePopup}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
              settings={popup}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
