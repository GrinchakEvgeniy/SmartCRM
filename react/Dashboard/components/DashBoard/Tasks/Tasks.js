import React, {useEffect, useState} from 'react';
import './Tasks.scss'
import {getProjectFetch, getUsersFetch} from "../../requests";
import Task from "./Task";


const Tasks = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setTasks(data.project_task)
            })
        getUsersFetch()
            .then(data => console.log('users', data))
    }, [])


    return (
        <div className='tasks'>

            {
                tasks.map((el, index) => {
                    const nestedTasks = el.project_nested_task
                    return (
                        <div key={index}>
                            <div className="tasksHeader">
                                <div className="creatorName">
                                    <h5>Creator name id {el.created_user_id}</h5>
                                </div>
                                <div className="taskGroupName">
                                    <h3>Project name {el.name}</h3>
                                </div>
                                <div className="numberOfTasks">
                                    <h6>{el.project_nested_task.length} tasks</h6>
                                </div>
                                <span className='progress'></span>
                            </div>
                            <div className="allTasksProject">
                                {
                                    nestedTasks.map((elem, ind) => {
                                        return (
                                            <Task task={elem}
                                                  key={ind}/>
                                        )
                                    })
                                }
                            </div>
                            <button onClick={() => {
                                console.log(tasks)
                            }}>
                                show task
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Tasks;