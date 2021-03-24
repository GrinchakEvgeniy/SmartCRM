import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
    deleteSalaryFetch,
    getSalaryFetch,
    getWorkTimeTodayFetch,
    postSalaryFetch,
    putSalaryFetch
} from "../../requests_";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const UpdateSalary = (props) => {

    const [newData, setNewData] = useState({
            user_id: 'None',
            month: '',
            year: '',
            total_hour: 0,
            rate_per_hour: 0,
            fine: 0,
            issued: 0,
            course: 0,
            from_times: '',
            to_times: ''
        });

    const Save = () => {
        putSalaryFetch(newData).then(data=>{
            props.setUpdateSalaryPopup(false);
        })
    }

    const Delete = () => {
        deleteSalaryFetch({id:props.salary_id}).then(data=>{
            props.setUpdateSalaryPopup(false);
        })
    }

    useEffect(()=>{
        const data = {
            'action': 'get salary by id',
            'id': props.salary_id
        }
        getSalaryFetch(data).then(data=>setNewData(data))
    }, []);

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
        <div className="update_salary">
            <div className="back" onClick={()=>props.setUpdateSalaryPopup(false)}></div>
            <div className="popup">
                <div className="title">Update Salary</div>
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
                        value={newData.from_times}
                        onChange={(event)=>{
                            setNewData({...newData, from_times: event.target.value})
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
                        value={newData.to_times}
                        onChange={(event)=>{
                            setNewData({...newData, to_times: event.target.value})
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
                    <Button variant="contained"
                            className="btn btn-new"
                            color="secondary"
                            onClick={Delete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateSalary;