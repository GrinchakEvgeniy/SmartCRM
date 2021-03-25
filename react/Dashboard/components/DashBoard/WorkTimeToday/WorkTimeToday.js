import React, {useEffect, useState} from 'react';
import './WorkTimeToday.scss';
import {today} from "../../helper";
import {getWorkTimeTodayFetch, postWorkTimeTodayFetch, putWorkTimeTodayFetch} from "../../requests_";
import {MenuItem, Select, TextField} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Button from "@material-ui/core/Button";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const WorkTimeToday = (props) => {
    const [newObject, setNewObject] = useState(true);
    const [fromWork, setFromWork] = useState('office');

    const [workObject, setWorkObject] = useState({});

    const [timeStart, setTimeStart] = useState('09:00');
    const [timeFinish, setTimeFinish] = useState('18:00');

    useEffect(() => {
        const data = {
            action: 'get not finished work',
            today: Date.parse(today() + "T00:00:00"),
            user_id: props.user.id
        }
        getWorkTimeTodayFetch(data).then(data => {
            if (data.length === 0) {
                setNewObject(true);
                return;
            } else {
                if (data.finish != null) {
                    setNewObject(true)
                    return;
                } else {
                    setWorkObject(data);
                    setNewObject(false);
                }
            }
        })
    }, [])

    const submit_in = () => {
        setNewObject(false);
        const data = {
            user_id: props.user.id,
            start: Date.parse(today() + "T" + timeStart + ":00"),
            status: fromWork,
            today: Date.parse(today() + "T00:00:00")
        }
        postWorkTimeTodayFetch(data).then(data => {
            setWorkObject(data)
        })
        props.web_socket.send(JSON.stringify({
            'message': props.user_data.first_name + " started work at " + fromWork,
            'type_notification': "group",
            'from_notification': props.user_data.id,
            'for_notification': "PM",
        }));
        props.web_socket.send(JSON.stringify({
            'message': props.user_data.first_name + " started work at " + fromWork,
            'type_notification': "group",
            'from_notification': props.user_data.id,
            'for_notification': "HR",
        }));
    }

    const submit_out = () => {
        setNewObject(true);
        const data = {
            id: workObject.id,
            user_id: props.user.id,
            finish: Date.parse(today() + "T" + timeFinish + ":00"),
        }
        putWorkTimeTodayFetch(data).then(data => {
            setWorkObject({})
        })
        props.web_socket.send(JSON.stringify({
            'message': props.user_data.first_name + " finished work at " + fromWork,
            'type_notification': "group",
            'from_notification': props.user_data.id,
            'for_notification': "PM",
        }));
        props.web_socket.send(JSON.stringify({
            'message': props.user_data.first_name + " finished work at " + fromWork,
            'type_notification': "group",
            'from_notification': props.user_data.id,
            'for_notification': "HR",
        }));
    }

    return (
        <div className='work_time_today'>
            <div className="work_time_today_wrap">
                <div className="title"><p>Work Time Today</p></div>
                <div className="content">
                    {
                        newObject ?
                            <div className="date_in">
                                <div className="date">
                                    <div className="ttl"><p>Date Start</p></div>
                                    <div className="inputs_wrap">
                                        <TextField
                                            id="time1"
                                            label="Time"
                                            type="time"
                                            value={timeStart}
                                            className="select-time"
                                            onChange={(event) => {
                                                setTimeStart(event.target.value)
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select_work"
                                            label="From work"
                                            className="from__work"
                                            value={fromWork}
                                            disabled={false}
                                            onChange={(event) => {
                                                setFromWork(event.target.value);
                                            }}
                                        >
                                            <MenuItem value={'office'} selected={true}><BusinessIcon/><p>Office</p>
                                            </MenuItem>
                                            <MenuItem value={'home'}><HomeIcon/><p>Home</p></MenuItem>
                                            <MenuItem value={'business trip'}><BusinessCenterIcon/><p>Business trip</p>
                                            </MenuItem>
                                        </Select>
                                    </div>
                                    <div className="btn_wrap">
                                        <Button variant="contained"
                                                className="btn btn-new"
                                                color="primary"
                                                onClick={submit_in}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="date_out">
                                <div className="date">
                                    <div className="ttl"><p>Date End</p></div>
                                    <div className="inputs_wrap">
                                        <TextField
                                            id="time2"
                                            label="Time"
                                            type="time"
                                            value={timeFinish}
                                            onChange={(event) => {
                                                setTimeFinish(event.target.value)
                                            }}
                                            className="select-time"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </div>
                                    <div className="btn_wrap">
                                        <Button variant="contained"
                                                className="btn btn-new"
                                                color="primary"
                                                onClick={submit_out}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="work_time_today_subLayer"
                 onClick={() => {
                     props.setWorkTimeToday(false)
                 }}> </div>
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
export default connect(putState, putDispatch)(WorkTimeToday);