import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getProjectsSimpleFetch, getUsersFetch, getWorkNowByDateFetch} from "../../requests";
import './ProjectsTime.scss';
import TimeLine from "./TimeLine";


const today = () => {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10)
    {
        dd=`0${dd}`;
    }

    if(mm<10)
    {
        mm=`0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
}

const ProjectsTime = () => {
    const [selectedDate, setSelectedDate] = useState(today());
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');
    const [users, setUsers] = useState([]);
    const [todayDateTime, setTodayDateTime] = useState({
        start: Date.parse(today()+"T00:00:00"),
        finish: Date.parse(today()+"T24:00:00")
    })
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }

    useEffect(()=>{
        getProjectsSimpleFetch()
            .then(data=>setProjects(data))
        getUsersFetch()
            .then(data=>setUsers(data))
        // setTodayDateTime({
        //     start: Date.parse(selectedDate+"T00:00:00"),
        //     finish: Date.parse(selectedDate+"T24:00:00")
        // })
    }, [])

    const searchByDate = () => {
        console.log('search')
    }

    return (
        <div className='container projects-time'>
            <div className="navigations">
                <div className="by_time">
                    <TextField
                        id="date"
                        label="Select date"
                        type="date"
                        format="yyyy-MM-dd"
                        onChange={handleDateChange}
                        defaultValue={selectedDate}
                        className="select-date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="by_project">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Project"
                        value={project}
                        disabled={false}
                        onChange={(event)=>{
                            setProject(event.target.value);
                        }}
                    >
                        <MenuItem value={''}/>
                        {
                            projects.map((value, index)=>{
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </div>
                <div className="search">
                    <Button className="btn add-btn"
                            variant="contained"
                            color="primary"
                            onClick={searchByDate}
                    >Search</Button>
                </div>
            </div>
            <div className="content">
                {/*<div className="navbar_time">*/}
                {/*    <div className="title"><p>Time</p></div>*/}
                {/*    <div className="maps">*/}
                {/*        <p>0:00</p>*/}
                {/*        <p>24:00</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="user_time_info">
                    {
                        users.map((value, index)=>{
                            return (<div className="item_user" key={index}>
                                <div className="user_info">
                                    <div className="avatar">
                                        <img src={value.profile.avatar.image} alt=""/>
                                    </div>
                                    <p>{value.first_name + " " + value.last_name}</p>
                                </div>
                                <div className="user_content">
                                    <TimeLine lineTimeStandart={todayDateTime} date={selectedDate} user_id={value.id}/>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectsTime;