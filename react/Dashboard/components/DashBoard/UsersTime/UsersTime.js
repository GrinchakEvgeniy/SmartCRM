import React, {useEffect, useState} from 'react';
import datesGenerator from "dates-generator/scripts/datesGenerator";
import {getWorkTimeTodayFetch} from "../../requests_";
import {getUserFetch, getUsersFetch} from "../../requests";
import './UsersTime.scss'
import {getAccess, isEmpty} from "../../helper";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const UsersTime = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [users, setUsers] = useState([]);
    const [calendar, setCalendar] = useState({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
    });

    const [dataTimes, setDataTimes] = useState([]);

    const [render, setRender] = useState([]);

    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersHere = ['S', 'HR']

    useEffect(() => {
        const body = {
            month: calendar.month,
            year: calendar.year
        };
        // console.log(body)
        getUsersFetch().then(data=>setUsers(data));
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        setDates([ ...dates ]);
        setCalendar({
            ...calendar,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }, [])

    useEffect(()=>{
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.length === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
        }
    }, [props.user_data])

    const onClickNext = () => {
        const body = { month: calendar.nextMonth, year: calendar.nextYear };
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        setDates([ ...dates ]);
        setCalendar({
            ...calendar,
            month: calendar.nextMonth,
            year: calendar.nextYear,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }

    const onClickPrevious = () => {
        const body = { month: calendar.previousMonth, year: calendar.previousYear };
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        setDates([ ...dates ]);
        setCalendar({
            ...calendar,
            month: calendar.previousMonth,
            year: calendar.previousYear,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }

    const onSelectDate = (date) => {
        setSelectedDate(new Date(date.year, date.month, date.date))
    }

    useEffect(()=>{
        if (dates.length === 0) return;
        let f = dates[0][0];
        let b = dates[dates.length-1][dates[dates.length-1].length - 1];
        let fd = f.date < 10 ? `0${f.date}` : f.date;
        let fm = f.month < 10 ? `0${f.month}` : f.month;
        let bd = b.date < 10 ? `0${b.date}` : b.date;
        let bm = b.month < 10 ? `0${b.month}` : b.month;
        const data = {
            action: 'get all users time by date range',
            from: Date.parse(`${f.year}-${fm}-${fd}T00:00:00`),
            before: Date.parse(`${b.year}-${bm}-${bd}T00:00:00`),
        }
        getWorkTimeTodayFetch(data).then(r => {
            setDataTimes(r);
        })
    }, [dates]);

    const getUnixDay = (year, mount, day) => {
        let dd = day < 10 ? `0${day}` : day;
        let mm = mount < 10 ? `0${mount}` : mount;
        return Date.parse(`${year}-${mm}-${dd}T00:00:00`)
    }

    useEffect(()=>{
        const result = [];
        users.forEach((user)=>{
            result.push({user:user.first_name+' '+user.last_name, id:user.id, times:[], render:[]})
            dataTimes.forEach((time)=>{
                if(time.user_id === user.id){
                    result[result.length-1].times.push({
                        today:time.today,
                        hours:parseInt(time.finish) - parseInt(time.start)
                    })
                }
            })
        })
        result.forEach((res, index)=>{
            dates.forEach((week)=>{
                week.forEach((day)=>{
                    let finded = false;
                    res.times.forEach((time)=>{
                        if(parseInt(time.today) === getUnixDay(day.year, day.month, day.date)){
                            result[index].render.push({
                                day: day.date < 10 ? `0${day.date}` : day.date,
                                hours: time.hours
                            })
                            finded = true;
                        }
                    })
                    if(!finded){
                        result[index].render.push({
                            day: day.date < 10 ? `0${day.date}` : day.date,
                            hours: 0
                        })
                    }
                })
            })
        })
        result.forEach((value, index)=>{
            for(let i = 1; i < value.render.length; i++){
                if(value.render[i].day === value.render[i-1].day){
                    value.render[i].hours += value.render[i-1].hours
                    value.render.splice(i-1, 1);
                    i--
                }
            }
        })
        setRender(result);
    }, [dataTimes])

    function msToTime(duration) {
        let milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes;
    }

    return (
        <div className='users_times'>

            {
                getAccess(currentUserRole, allowedUsersHere)
                    ?
                    <div className="container">
                        <div className='users_times_control'>
                            <div className='btn prev' onClick={onClickPrevious}>
                                Previous
                            </div>
                            <div className="current_month">
                                {months[calendar.month]}
                            </div>
                            <div className='btn next' onClick={onClickNext}>
                                Next
                            </div>
                        </div>
                        <div className="table">
                            {
                                render.map((value, index) => {
                                    return (
                                        <div className="user_item" key={index}>
                                            <div className="user_meta">
                                                <p>{value.user}</p>
                                            </div>
                                            <div className="days_name">
                                                <p>Sun</p>
                                                <p>Mon</p>
                                                <p>Tue</p>
                                                <p>Wed</p>
                                                <p>Thu</p>
                                                <p>Fri</p>
                                                <p>Sat</p>
                                            </div>
                                            <div className="user_time_meta">
                                                {
                                                    value.render.map((value, index) => {
                                                        return (
                                                            <div className="itm" key={index}>
                                                                <p className="day_">{value.day}</p>
                                                                <p className="time_">{msToTime(value.hours)}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/*<div style={{ padding: 10 }}>*/}
                        {/*    Selected Date: {selectedDate.toDateString()}*/}
                        {/*</div>*/}
                    </div>
                    :
                    <div className='noAccess' style={{
                        width: '600px',
                        height: '300px',
                        position: "fixed",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: 'white',
                        boxShadow: '1px 3px 10px 0px #bfbfbf'
                    }}>
                        <h2 style={{
                            color: '#757575',
                            fontSize: '36px',
                            textTransform: 'uppercase'
                        }}>
                            You don't have access.
                        </h2>
                    </div>
            }
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data))
    }
}
export default connect(putState, putDispatch)(UsersTime);