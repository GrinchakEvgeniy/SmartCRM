import React, {useEffect, useState} from 'react';
import {getWorkNowByDateFetch} from "../../requests";
import './ProjectInfo.scss';
import Diagrams from "./Diagrams";
import {msToTime} from "../../helper";


const ProjectInfo = (props) => {
    const [workStack, setWorkStack] = useState([]);
    const [workStackAllTime, setWorkStackAllTime] = useState([]);
    const [users, setUsers] = useState([]);

    const defaultAva = '/static/images/userIcon.svg';


    const initWork = () => {
        getWorkNowByDateFetch({
            date: props.date,
            action: 'project',
            project_id: props.value.id
        })
            .then(data => {
                setWorkStack(data);
                getWorkNowByDateFetch({
                    action: 'project all time',
                    project_id: props.value.id
                })
                    .then(data => {
                        setWorkStackAllTime(data);
                    })
            })
    }

    const initUsers = () => {
        const userProjectId = props.value.users_list.split(",");
        let users_ = [];
        for (let i = 0; i < userProjectId.length; i++) {
            for (let j = 0; j < props.users.length; j++) {
                if (userProjectId[i] == props.users[j].id) {
                    users_.push(props.users[j]);
                }
            }
        }
        setUsers(users_);
    }

    useEffect(() => {
        initWork();
        initUsers();
    }, []);

    useEffect(() => {
        initWork()
    }, [props.value, props.date])
    return (
        <div className="project-info">
            <div className="project_name"><p>{props.value.name}</p></div>
            <div className="content">
                <div className="__users">
                    {
                        users.map((value, index) => {
                            const markWork = workStack.filter(el => el.user_id === value.id);
                            const all_time_project = markWork.map((value) => {
                                if (value.finish == null) {
                                    return Date.now() - value.start;
                                }
                                return value.finish - value.start;
                            });
                            const sum_time = all_time_project.reduce((a, b) => a + b, 0);
                            return (<div key={index} className="user_time_project">
                                <div className="user_info">
                                    <div className="avatar">
                                        <img src={value.profile.avatar.image ? value.profile.avatar.image : defaultAva}
                                             alt="ava"/>
                                    </div>
                                    <div className="name">
                                        {/*<p>{value.first_name+ " " +value.last_name}</p>*/}
                                        <p>{value.first_name}</p>
                                    </div>
                                </div>
                                <div className="time_project">
                                    <p>{msToTime(sum_time)}</p>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <Diagrams today={workStack} allTime={workStackAllTime} users={users} project={props.value}/>
            </div>
        </div>
    );
};

export default ProjectInfo;