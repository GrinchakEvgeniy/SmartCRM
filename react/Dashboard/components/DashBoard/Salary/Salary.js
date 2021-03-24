import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import {MenuItem, Select, TextField} from "@material-ui/core";
import './Salary.scss'
import {getUserFetch, getUsersFetch} from "../../requests";
import NewSalary from "./NewSalary";
import {getSalaryFetch} from "../../requests_";
import {getAccess} from "../../helper";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Salary = (props) => {
    const [users, setUsers] = useState([]);
    const [usersSelery, setUsersSelery] = useState([]);
    const [newSalaryPopup, setNewSalaryPopup] = useState(false);

    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersToSalary = ['S', 'HR']

    useEffect(()=>{
        getUsersFetch().then((data)=>setUsers(data))
        let date = new Date(Date.now());
        let month = date.getMonth();
        let year = date.getFullYear();
        const data = {
            'action': 'default',
            'month' : months[month],
            'year' : year
        }
        getSalaryFetch(data).then(data=>{
            console.log(data)
        })
        getUserFetch().then(data => {
            setCurrentUserRole(data.profile.role_id.value)
        })

    }, []);


    return (
        <div className='salary'>
            {
                getAccess(currentUserRole, allowedUsersToSalary)
                    ?
                    <div className="container salary_wrap">
                        {
                            newSalaryPopup ? <NewSalary setNewSalaryPopup={setNewSalaryPopup} users={users}/> : ""
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
                                    // value={project}
                                        disabled={false}
                                    // onChange={(event) => {
                                    //     setProject(event.target.value);
                                    // }}
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
                                <Button variant="contained"
                                        className="btn btn-new"
                                        color="primary"
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
                                usersSelery.map((value, index) => {
                                    const total = value.total_hour * value.rate_per_hour
                                    return (<div className="item_selery">
                                        <div className="user_meta">{value.user_id}</div>
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

export default Salary;