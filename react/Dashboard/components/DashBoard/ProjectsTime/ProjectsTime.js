import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getProjectsSimpleFetch, getUsersFetch, getWorkNowByDateFetch} from "../../requests";
import './ProjectsTime.scss';
import TimeLine from "./TimeLine";
import ProjectInfo from "./ProjectInfo";
import {isEmpty, today} from "../../helper";

const ProjectsTime = () => {
    const [selectedDate, setSelectedDate] = useState(today());

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('none');
    const [selectedProject, setSelectedProject] = useState({});

    const [users, setUsers] = useState([]);
    const [todayDateTime, setTodayDateTime] = useState({
        start: Date.parse(today()+"T00:00:00"),
        finish: Date.parse(today()+"T24:00:00")
    })
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }

    useEffect(()=>{
        if(project != "none"){
            const projectObj = projects.filter((el)=>el.id == parseInt(project));
            if(projectObj.length != 0){
                setSelectedProject(projectObj[0]);
            }
        } else {
            setSelectedProject({});
        }
    }, [project]);

    useEffect(()=>{
        getProjectsSimpleFetch()
            .then(data=>setProjects(data))
        getUsersFetch()
            .then(data=>setUsers(data))
    }, [])

    useEffect(()=>{
        setTodayDateTime({
            start: Date.parse(selectedDate+"T00:00:00"),
            finish: Date.parse(selectedDate+"T24:00:00")
        })
    }, [selectedDate]);

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
                        <MenuItem value={'none'} selected={true}>None</MenuItem>
                        {
                            projects.map((value, index)=>{
                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            })
                        }
                    </Select>
                </div>

            </div>
            <div className="content">
                {
                    project == "none"
                        ?
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
                        :
                        <div className="project_time_info">
                            {
                                isEmpty(selectedProject)
                                    ?
                                    <div className="alert">Project not found</div>
                                    :
                                    <ProjectInfo value={selectedProject} date={selectedDate} users={users}/>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default ProjectsTime;