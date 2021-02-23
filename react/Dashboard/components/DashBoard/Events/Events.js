import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.scss';
import NewEvents from "./NewEvents";
import UpdateEvents from "./UpdateEvents";
import {getEventsFetch} from "../../requests";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";

const Events = (props) => {
    const [events, setEvents] = useState([]);
    const [addEvent, setAddEvent] = useState("");
    const [renderUpdateEvent, setRenderUpdateEvent] = useState("");

    const handleSelect = ({ start, end }) => {
        setAddEvent(<NewEvents
            start={start}
            setAddEvent={setAddEvent}
            setEvents={setEvents}
            events={events}
            end={end}
        />)
    }

    useEffect(()=>{
        getEventsFetch()
            .then(data=>setEvents(data))
    }, []);

    useEffect(()=>{
        getEventsFetch()
            .then(data=>{
                const res = data.map((el, index, arr)=>{
                    return {...arr[index], start: moment(arr[index].start).toDate(), end: moment(arr[index].end).toDate()}
                })
                console.log(res)
                setEvents(res)
            })
    }, [addEvent, renderUpdateEvent])

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.backgroundColor,
            borderRadius: '2px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    const updateEvent = (event) => {
        if(event.user_id != props.user_data.id) return false;
        setRenderUpdateEvent(
            <UpdateEvents
                event={event}
                setRenderUpdateEvent={setRenderUpdateEvent}
                setEvents={setEvents}
                events={events}
            />
        )
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
                onSelectEvent={event => updateEvent(event)}
            />
            {addEvent}
            {renderUpdateEvent}
        </div>
    );
};
const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(Events);