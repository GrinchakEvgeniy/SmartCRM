import React from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const NewSalary = (props) => {
    return (
        <div className="new_salary">
            <div className="back" onClick={()=>props.setNewSalaryPopup(false)}></div>
            <div className="popup">
                <div className="title">New Salary</div>
                <div className="group1">
                    <div className="select_user">
                        <Select id="demo-simple-select"
                                variant='outlined'
                            // value={project}
                                disabled={false}
                            // onChange={(event) => {
                            //     setProject(event.target.value);
                            // }}
                        >
                            <MenuItem value={''} selected={true}>None</MenuItem>
                            {
                                props.users.map((value, index)=>{
                                    return (
                                        <MenuItem value={value.id}>{value.first_name+' '+value.last_name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="select_month">
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
                    </div>
                    <div className="rate">
                        <TextField
                            id="rate"
                            label="Select rate per hour"
                            variant='outlined'
                            type="number"
                            className="select-rate"
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
                        className="select-date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="result"><p>Hours</p><p>8</p></div>
                </div>
                <div className="btn">
                    <Button variant="contained"
                            className="btn btn-new"
                            color="primary"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewSalary;