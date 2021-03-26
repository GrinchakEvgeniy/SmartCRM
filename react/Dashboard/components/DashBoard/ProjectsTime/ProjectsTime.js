import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getProjectsSimpleFetch, getUserFetch, getUsersFetch, getWorkNowByDateFetch} from "../../requests";
import './ProjectsTime.scss';
import TimeLine from "./TimeLine";
import ProjectInfo from "./ProjectInfo";
import {getAccess, isEmpty, today} from "../../helper";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const ProjectsTime = (props) => {
    const [selectedDate, setSelectedDate] = useState(today());
    const defaultAva = '/static/images/userIcon.svg';

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('none');
    const [selectedProject, setSelectedProject] = useState({});

    const [users, setUsers] = useState([]);
    const [todayDateTime, setTodayDateTime] = useState({
        start: Date.parse(today() + "T00:00:00"),
        finish: Date.parse(today() + "T24:00:00")
    })

    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersToProjTime = ['S', 'HR', 'PM']

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }

    useEffect(() => {
        if (project != "none") {
            const projectObj = projects.filter((el) => el.id == parseInt(project));
            if (projectObj.length != 0) {
                setSelectedProject(projectObj[0]);
            }
        } else {
            setSelectedProject({});
        }
    }, [project]);

    useEffect(() => {
        getProjectsSimpleFetch()
            .then(data => setProjects(data))
        getUsersFetch()
            .then(data => setUsers(data))
    }, [])

    useEffect(()=>{
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.length === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
        }
    }, [props.user_data])

    useEffect(() => {
        setTodayDateTime({
            start: Date.parse(selectedDate + "T00:00:00"),
            finish: Date.parse(selectedDate + "T24:00:00")
        })
    }, [selectedDate]);

    // const searchByDate = () => {
    //     console.log('search')
    // }

    return (
        <div className='projects-time'>
            {
                getAccess(currentUserRole, allowedUsersToProjTime)
                    ?
                    <div className='container projects-time-wrap'>
                        <div className="navigations">
                            <div className="by_time">
                                <TextField
                                    id="date"
                                    label="Select date"
                                    variant='outlined'
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
                                <Select id="demo-simple-select"
                                        variant='outlined'
                                        value={project}
                                        disabled={false}
                                        onChange={(event) => {
                                            setProject(event.target.value);
                                        }}
                                >
                                    <MenuItem value={'none'} selected={true}>All Projects</MenuItem>
                                    {
                                        projects.map((value, index) => {
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
                                            users.map((value, index) => {
                                                return (<div className="item_user" key={index}>
                                                    <div className="user_info">
                                                        <div className="avatar">
                                                            <img
                                                                src={value.profile.avatar.image ? value.profile.avatar.image : defaultAva}
                                                                alt=""/>
                                                        </div>
                                                        {/*<p>{value.first_name + " " + value.last_name}</p>*/}
                                                        <p>{value.first_name}</p>
                                                    </div>
                                                    <div className="user_content">
                                                        <TimeLine lineTimeStandart={todayDateTime} date={selectedDate}
                                                                  user_id={value.id}/>
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
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data))
    }
}
export default connect(putState, putDispatch)(ProjectsTime);