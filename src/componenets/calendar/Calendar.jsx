import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./Calendar.css";
import EventModal from "../calendar-event-modal/EventModal";

export default function Calendar() {
  const calendarRef = useRef(null);

  // ModalState
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState(null);
  const [selectInfo, setSelectInfo] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleChangeView = (viewName) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setCurrentView(viewName);
  };

  const handleEventDrop = (info) => {
    const { id, startStr } = info.event;
    const [datePart, timePart] = startStr.split("T");
    const time = timePart.slice(0, 5);

    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, date: datePart, time } : ev))
    );
  };

  const handleEventResize = (info) => {
    const { id, startStr } = info.event;
    const [datePart, timePart] = startStr.split("T");
    const time = timePart.slice(0, 5);

    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, date: datePart, time } : ev))
    );
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };
  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();

  const handleDateSelect = (selectInfo) => {
    setSelectInfo(selectInfo);
    setModalInitial({
      id: null,
      title: "",
      date: selectInfo.startStr.slice(0, 10),
      time: selectInfo.startStr.slice(11, 16) || "",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleModalSave = ({ title, date, time, notes, color }) => {
    if (modalInitial.id) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === modalInitial.id
            ? { ...ev, title, date, time, notes, color }
            : ev
        )
      );
      setIsModalOpen(false);
      selectInfo.view.calendar.unselect();
    } else {
      const id = String(Date.now());
      setEvents((prev) => [...prev, { id, title, date, time, notes, color }]);
      setIsModalOpen(false);
      selectInfo.view.calendar.unselect();
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    if (selectInfo) selectInfo.view.calendar.unselect();
  };

  // Format title
  const formatTitle = (date) => {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  //EDIT
  const handleEventClick = (clickInfo) => {
    const ev = clickInfo.event;
    setSelectInfo(clickInfo);
    setModalInitial({
      id: ev.id,
      title: ev.title,
      date: ev.startStr.slice(0, 10),
      time: ev.startStr.slice(11, 16) || "",
      notes: ev.extendedProps.notes || "",
      color: ev.backgroundColor,
    });
    setIsModalOpen(true);
  };

  //Delete
  const handleEventMount = (info) => {
    // info.el — DOM el
    info.el.addEventListener("contextmenu", (e) => {
      e.preventDefault(); //
      if (window.confirm("Delete this event?")) {
        setEvents((prev) => prev.filter((ev) => ev.id !== info.event.id));
      }
    });
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-name">Calendar</h2>
      <div className="calendar-header">
        <div className="calendar-controls-left">
          <button onClick={handleToday}>Today</button>
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="calendar-title">{formatTitle(currentDate)}</div>
        <div className="calendar-controls-right">
          <button
            className={currentView === "dayGridMonth" ? "active" : ""}
            onClick={() => handleChangeView("dayGridMonth")}
          >
            Month
          </button>
          <button
            className={currentView === "timeGridWeek" ? "active" : ""}
            onClick={() => handleChangeView("timeGridWeek")}
          >
            Week
          </button>
          <button
            className={currentView === "timeGridDay" ? "active" : ""}
            onClick={() => handleChangeView("timeGridDay")}
          >
            Day
          </button>
          <button
            className={currentView === "listWeek" ? "active" : ""}
            onClick={() => handleChangeView("listWeek")}
          >
            Agenda
          </button>
        </div>
      </div>
      <div className="calendar-body">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={false}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          }}
          eventDidMount={handleEventMount}
          defaultTimedEventDuration="00:30:00"
          slotMinHeight={40}
          allDaySlot={true}
          dayMaxEventRows={true}
          selectable={true}
          select={handleDateSelect}
          events={events.map((ev) => ({
            id: ev.id,
            title: ev.title,
            start: ev.time ? `${ev.date}T${ev.time}` : ev.date,
            allDay: false,
            display: "block",
            backgroundColor: ev.color,
            extendedProps: { notes: ev.notes },
          }))}
          fixedWeekCount={false}
          eventClick={handleEventClick}
          editable={true}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        initial={modalInitial}
        onSave={handleModalSave}
        onCancel={handleModalCancel}
      ></EventModal>
    </div>
  );
}
