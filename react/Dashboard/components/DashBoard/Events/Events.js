import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.scss';
import NewEvents from "./NewEvents";

const Events = (props) => {
    const [events, setEvents] = useState([]);
    const [addEvent, setAddEvent] = useState("");

    const handleSelect = ({ start, end }) => {
        setAddEvent(<NewEvents
            start={start}
            setAddEvent={setAddEvent}
            setEvents={setEvents}
            events={events}
            end={end}
            />)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        backgroundColor: event.backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}

    const localizer = momentLocalizer(moment)
    return (
        <div className="container events">
            <Calendar
                localizer={localizer}
                onSelectSlot={handleSelect}
                selectable
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
                eventPropGetter={(eventStyleGetter)}
                onSelectEvent={event => alert(event.title)}
            />
            {addEvent}
        </div>
    );
};

export default Events;