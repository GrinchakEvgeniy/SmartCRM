import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import {MenuItem, Select, TextField} from "@material-ui/core";
import './Salary.scss'
import {getUserFetch, getUsersFetch} from "../../requests";
import NewSalary from "./NewSalary";
import {getSalaryFetch} from "../../requests_";
import {getAccess, isEmpty} from "../../helper";
import UpdateSalary from "./UpdateSalary";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import NoAccess from "../NoAccess/NoAccess";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Salary = (props) => {
    const [users, setUsers] = useState([]);
    const [usersSalary, setUsersSalary] = useState([]);
    const [newSalaryPopup, setNewSalaryPopup] = useState(false);

    const [updateSalaryPopup, setUpdateSalaryPopup] = useState(false);
    const [updateSalaryId, setUpdateSalaryId] = useState('');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersToSalary = ['S', 'HR']

    useEffect(() => {
        if (!updateSalaryPopup || !newSalaryPopup) {
            const data = {
                'action': 'get salary by mount and year',
                'month': month,
                'year': year
            }
            getSalaryFetch(data).then(data => {
                setUsersSalary(data)
            })
        }
    }, [updateSalaryPopup, newSalaryPopup]);

    useEffect(() => {
        getUsersFetch().then((data) => setUsers(data))
        let date = new Date(Date.now());
        let month = date.getMonth();
        let year_ = date.getFullYear();
        setMonth(months[month]);
        setYear(year_);
        const data = {
            'action': 'get salary by mount and year',
            'month': months[month],
            'year': year_
        }
        getSalaryFetch(data).then(data => {
            setUsersSalary(data)
        })
    }, []);

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.length === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
        }
    }, [props.user_data])

    useEffect(() => {
        if (updateSalaryId !== '')
            setUpdateSalaryPopup(true);
    }, [updateSalaryId]);

    const Find = () => {
        const data = {
            'action': 'get salary by mount and year',
            'month': month,
            'year': year
        }
        getSalaryFetch(data).then(data => {
            setUsersSalary(data)
        });
    }

    return (
        <div className='salary'>
            {
                getAccess(currentUserRole, allowedUsersToSalary)
                    ?
                    <div className="container salary_wrap">
                        {
                            newSalaryPopup ? <NewSalary setNewSalaryPopup={setNewSalaryPopup} users={users}/> : ""
                        }
                        {
                            updateSalaryPopup ?
                                <UpdateSalary setUpdateSalaryPopup={setUpdateSalaryPopup} salary_id={updateSalaryId}
                                              users={users}/> : ""
                        }
                        <div className="panel">
                            <Button variant="contained"
                                    className="btn btn-new"
                                    color="secondary"
                                    onClick={() => setNewSalaryPopup(true)}
                            >
                                Create salary
                            </Button>
                            <div className="history_salary_field">
                                <div className="label">
                                    <p>Get salary result by month</p>
                                </div>
                                <Select id="demo-simple-select"
                                        variant='outlined'
                                        value={month}
                                        disabled={false}
                                        onChange={(event) => {
                                            setMonth(event.target.value);
                                        }}
                                >
                                    <MenuItem value={'Jan'} selected={true}>January</MenuItem>
                                    <MenuItem value={'Feb'}>February</MenuItem>
                                    <MenuItem value={'Mar'}>March</MenuItem>
                                    <MenuItem value={'Apr'}>April</MenuItem>
                                    <MenuItem value={'May'}>May</MenuItem>
                                    <MenuItem value={'Jun'}>June</MenuItem>
                                    <MenuItem value={'Jul'}>July</MenuItem>
                                    <MenuItem value={'Aug'}>August</MenuItem>
                                    <MenuItem value={'Sep'}>September</MenuItem>
                                    <MenuItem value={'Oct'}>October</MenuItem>
                                    <MenuItem value={'Nov'}>November</MenuItem>
                                    <MenuItem value={'Dec'}>December</MenuItem>
                                </Select>
                                <TextField id="year"
                                           variant='outlined'
                                           type="number"
                                           value={year}
                                           onChange={(event) => {
                                               setYear(event.target.value)
                                           }}
                                           className="select-year"
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                />
                                <Button variant="contained"
                                        className="btn btn-new"
                                        color="primary"
                                        onClick={Find}
                                >
                                    Find
                                </Button>
                            </div>
                        </div>
                        <div className="content">
                            <div className="item_selery_head">
                                <div className="user_meta">User</div>
                                <div className="month_meta">Month</div>
                                <div className="course_meta">Course</div>
                                <div className="hour_total_meta">Total hours</div>
                                <div className="rate_meta">Rate per hour</div>
                                <div className="fine_meta">Fine</div>
                                <div className="issued_meta">Issued</div>
                                <div className="total_meta">Total</div>
                                <div className="total_uan_meta">Total in UAN</div>
                            </div>
                            {
                                usersSalary.map((value, index) => {
                                    const total = value.total_hour * value.rate_per_hour
                                    return (<div className="item_selery" key={index}
                                                 onClick={() => setUpdateSalaryId(value.id)}>
                                        {
                                            users.map((value_user, index) => {
                                                if (value_user.id === value.user_id)
                                                    return (<div className="user_meta"
                                                                 key={index}>{value_user.first_name + ' ' + value_user.last_name}</div>);
                                            })
                                        }
                                        <div className="month_meta">{value.month}</div>
                                        <div className="course_meta">{value.course}</div>
                                        <div className="hour_total_meta">{value.total_hour}</div>
                                        <div className="rate_meta">{value.rate_per_hour}</div>
                                        <div className="fine_meta">{value.fine}</div>
                                        <div className="issued_meta">{value.issued}</div>
                                        <div className="total_meta">{total}</div>
                                        <div className="total_uan_meta">{total * value.course}</div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    :
                    <NoAccess/>
            }
        </div>
    );
}

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
export default connect(putState, putDispatch)(Salary);