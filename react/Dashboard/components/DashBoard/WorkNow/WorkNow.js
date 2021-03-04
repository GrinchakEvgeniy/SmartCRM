import React, {useEffect, useState} from 'react';
import './WorkNow.scss';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import {createWorkNowFetch, getProjectsSimpleFetch, putWorkNowFetch} from "../../requests";
import {isEmpty} from "../../helper";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import {Select, MenuItem} from "@material-ui/core";

const WorkNow = (props) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');

    useEffect(()=>{
        getProjectsSimpleFetch()
            .then(data=>setProjects(data))
        if(!isEmpty(props.workNowObject)){
            setProject(props.workNowObject.project_id)
        }
    }, [])

    const Action = (checked) => {
        if(checked){
            const data = {
                user_id: props.user_data.id,
                project_id: project != "" ? parseInt(project) : "",
                start: Date.now(),
                self_education: props.selfEducation
            }
            createWorkNowFetch(data).then(data=>props.setWorkNowObject(data))
        } else {
            const newState = JSON.parse(JSON.stringify(props.workNowObject));
            newState.finish = Date.now()
            putWorkNowFetch(newState)
                .then(data=>{
                    setProject('');
                    props.setWorkNowObject({});
                })
        }
    }

    const handleChangeSelfEducation = (checked) => {
        if(checked){
            setProject('')
        }
        props.setSelfEducation(checked);
    }

    return (
        <div className="work_now_popup">
            <div className="title"><p>Work Now</p></div>
            <div className="body">
                <div className="time">
                    <div className="digital">
                        <span className="hour">{props.time.hour}</span>
                        <span>:</span>
                        <span className="minute">{props.time.minute}</span>
                        <span>:</span>
                        <span className="second">{props.time.second}</span>
                    </div>
                </div>
                <div className="project">
                    <p>Project</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={project}
                        disabled={props.isActive || props.selfEducation ? true : false}
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
                <div className="self_education">
                    <p>Self-Education</p>
                    <Checkbox
                        disabled={props.isActive ? true : false}
                        checked={props.selfEducation}
                        onChange={(event, checked)=>handleChangeSelfEducation(checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <div className="on_off_btn">
                    <p className="off">OFF</p>
                    <Switch
                        checked={props.isActive}
                        onChange={(event, checked)=>{
                            props.setIsActive(!props.isActive);
                            Action(checked)
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <p className="on">ON</p>
                </div>
            </div>
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
export default connect(putState, putDispatch)(WorkNow);