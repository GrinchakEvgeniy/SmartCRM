import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getWorkTimeTodayFetch, postSalaryFetch} from "../../requests_";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const NewSalary = (props) => {
    let date = new Date(Date.now());
    let month = date.getMonth();
    let year = date.getFullYear();

    const [newData, setNewData] = useState({
            user_id: 'None',
            month: months[month],
            year: year,
            total_hour: 0,
            rate_per_hour: 0,
            fine: 0,
            issued: 0,
            course: 0,
            from_times: '',
            to_times: ''
        });

    const Save = () => {
        postSalaryFetch(newData).then(data=>{
            props.setNewSalaryPopup(false);
        })
    }

    useEffect(()=>{
        if(!newData.from_times || !newData.to_times || newData.user_id === '') return;
        const data = {
            action: 'get all time by date range and user',
            user_id: newData.user_id,
            from: Date.parse(newData.from_times+'T00:00:00'),
            before: Date.parse(newData.to_times+'T00:00:00'),
        }
        getWorkTimeTodayFetch(data).then(r => {
            let total = 0;
            r.forEach((value)=>{
                total += parseInt(value.finish) - parseInt(value.start);
            })
            setNewData({...newData, total_hour: Math.floor((total / (1000 * 60 * 60)) % 24)})
        })
    }, [newData.from_times, newData.to_times, newData.user_id]);

    return (
        <div className="new_salary">
            <div className="back" onClick={()=>props.setNewSalaryPopup(false)}> </div>
            <div className="popup">
                <div className="title">New Salary</div>
                <div className="group1">
                    <div className="select_user field">
                        <Select id="demo-simple-select"
                                variant='outlined'
                                value={newData.user_id}
                                disabled={false}
                                onChange={(event) => {
                                    setNewData({...newData, user_id:event.target.value});
                                }}
                        >
                            <MenuItem value={'None'} selected={true}>None</MenuItem>
                            {
                                props.users.map((value, index)=>{
                                    return (
                                        <MenuItem key={index} value={value.id}>{value.first_name+' '+value.last_name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="select_month field">
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
                    <div className="rate field">
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
                    <div className="cource field">
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
                    <div className="fine field">
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
                    <div className="issued field">
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
                        value={newData.from_times}
                        onChange={(event)=>{
                            setNewData({...newData, from_times: event.target.value})
                        }}
                        className="select-date field"
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
                        value={newData.to_times}
                        onChange={(event)=>{
                            setNewData({...newData, to_times: event.target.value})
                        }}
                        className="select-date field"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="result field"><p>Hours</p><p>{newData.total_hour}</p></div>
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