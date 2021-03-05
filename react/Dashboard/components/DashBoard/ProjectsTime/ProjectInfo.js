import React, {useEffect, useState} from 'react';
import {getWorkNowByDateFetch} from "../../requests";
import './ProjectInfo.scss';
import Diagrams from "./Diagrams";


function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
}


const ProjectInfo = (props) => {
    const [workStack, setWorkStack] = useState([]);
    const [users, setUsers] = useState([]);


    const initWork  = () => {
        getWorkNowByDateFetch({
            date: props.date,
            action: 'project',
            project_id: props.value.id})
            .then(data=>{
                setWorkStack(data);
            })
    }

    const initUsers = () => {
        const userProjectId = props.value.users_list.split(",");
        let users_ = [];
        for(let i = 0; i < userProjectId.length;i++){
            for(let j = 0; j < props.users.length;j++){
                if(userProjectId[i] == props.users[j].id){
                    users_.push(props.users[j]);
                }
            }
        }
        setUsers(users_);
    }

    useEffect(()=>{
        initWork();
        initUsers();
    }, []);

    useEffect(()=>{
        initWork()
    }, [props.value, props.date])
    return (
        <div className="project-info">
            <div className="project_name"><p>{props.value.name}</p></div>
            <div className="content">
                <div className="__users">
                    {
                        users.map((value, index)=>{
                            const markWork = workStack.filter(el=>el.user_id === value.id);
                            const all_time_project = markWork.map((value)=>{
                                if(value.finish == null){
                                    return Date.now() - value.start;
                                }
                                return value.finish - value.start;
                            });
                            const sum_time = all_time_project.reduce((a, b) => a + b, 0);
                            return (<div key={index} className="user_time_project">
                                <div className="user_info">
                                    <div className="avatar"><img src={value.profile.avatar.image} alt=""/></div>
                                    <div className="name"><p>{value.first_name+ " " +value.last_name}</p></div>
                                </div>
                                <div className="time_project">
                                    <p>{msToTime(sum_time)}</p>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <Diagrams/>
            </div>
        </div>
    );
};

export default ProjectInfo;