import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getWorkTimeTodayFetch} from "../../requests_";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const NewSalary = (props) => {
    let date = new Date(Date.now());
    let month = date.getMonth();
    let year = date.getFullYear();

    const [dateRange, setDateRange] = useState({
        start: '',
        finish: ''
    })

    const [newData, setNewData] = useState({
            user_id: '',
            month: months[month],
            year: year,
            total_hour: 0,
            rate_per_hour: 0,
            fine: 0,
            issued: 0,
            course: 0
        });

    const Save = () => {

    }

    useEffect(()=>{
        if(!dateRange.start || !dateRange.finish) return;
        const data = {
            action: 'get all time by date range and user',
            user_id: newData.user_id,
            from: Date.parse(dateRange.start+'T00:00:00'),
            before: Date.parse(dateRange.finish+'T00:00:00'),
        }
        getWorkTimeTodayFetch(data).then(r => {
            let total = 0;
            r.forEach((value)=>{

            })
            setNewData({...newData, total_hour: total})
        })
    }, [dateRange])

    return (
        <div className="new_salary">
            <div className="back" onClick={()=>props.setNewSalaryPopup(false)}></div>
            <div className="popup">
                <div className="title">New Salary</div>
                <div className="group1">
                    <div className="select_user">
                        <Select id="demo-simple-select"
                                variant='outlined'
                                value={newData.user_id}
                                disabled={false}
                                onChange={(event) => {
                                    setNewData({...newData, user_id:event.target.value});
                                }}
                        >
                            <MenuItem value={''} selected={true}>None</MenuItem>
                            {
                                props.users.map((value, index)=>{
                                    return (
                                        <MenuItem key={index} value={value.id}>{value.first_name+' '+value.last_name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="select_month">
                        <Select id="demo-simple-select"
                                variant='outlined'
                            value={newData.month}
                                disabled={false}
                            onChange={(event) => {
                                setNewData({...newData, month:event.target.value});
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
                    </div>
                    <div className="rate">
                        <TextField
                            id="rate"
                            label="Select rate per hour"
                            variant='outlined'
                            type="number"
                            value={newData.rate_per_hour}
                            className="select-rate"
                            onChange={(event)=>{
                                setNewData({...newData, rate_per_hour:event.target.value});
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="cource">
                        <TextField
                            id="cource"
                            label="Select cource"
                            variant='outlined'
                            type="number"
                            value={newData.course}
                            onChange={(event)=>{
                                setNewData({...newData, course:event.target.value});
                            }}
                            className="select-cource"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="fine">
                        <TextField
                            id="fine"
                            label="Select fine"
                            variant='outlined'
                            type="number"
                            value={newData.fine}
                            onChange={(event)=>{
                                setNewData({...newData, fine:event.target.value});
                            }}
                            className="select-fine"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="issued">
                        <TextField
                            id="issued"
                            label="Select issued"
                            variant='outlined'
                            type="number"
                            value={newData.issued}
                            onChange={(event)=>{
                                setNewData({...newData, issued:event.target.value});
                            }}
                            className="select-issued"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className="group2">
                    <TextField
                        id="date1"
                        label="Select date"
                        variant='outlined'
                        type="date"
                        format="yyyy-MM-dd"
                        value={dateRange.start}
                        onChange={(event)=>{
                            setDateRange({...dateRange, start: event.target.value})
                        }}
                        className="select-date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date2"
                        label="Select date"
                        variant='outlined'
                        type="date"
                        format="yyyy-MM-dd"
                        value={dateRange.finish}
                        onChange={(event)=>{
                            setDateRange({...dateRange, finish: event.target.value})
                        }}
                        className="select-date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="result"><p>Hours</p><p>{newData.total_hour}</p></div>
                </div>
                <div className="btn">
                    <Button variant="contained"
                            className="btn btn-new"
                            color="primary"
                            onClick={Save}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewSalary;