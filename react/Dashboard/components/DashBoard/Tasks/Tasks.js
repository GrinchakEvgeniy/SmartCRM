import React, {useEffect, useState} from 'react';
import './Tasks.scss'
import {getProjectFetch, getUserFetch, getUsersFetch, postNewTaskGroupFetch} from "../../requests";
import TasksGroup from "./TasksGroup";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const Tasks = () => {

    const [taskGroups, setTaskGroups] = useState([])
    const [currentProjectId, setCurrentProjectId] = useState('')
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        getUserFetch().then(data => {
            setCurrentUser(data.id)})
        update()
    }, [])

    const update = () => {
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setTaskGroups(data.project_task)
                setCurrentProjectId(data.id)
            })
    }

    const addNewTask = (name) => {
        console.log(currentProjectId)
        getUserFetch().then(data => {
            console.log('data user', data)
            postNewTaskGroupFetch(currentProjectId, data.id, name).then(()=>{
                update()
            })
        })
    }


    return (
        <div className='tasks'>

            <div className="addNewTasksGroup">
                <Button variant="contained"
                        color="primary"
                        className='addTasksGroupBtn'
                        onClick={() => {
                            addNewTask('New Task')
                        }}>
                    Add new tasks group
                </Button>
            </div>

            {
                taskGroups.map((el, index) => {
                    return (
                        <TasksGroup currentUser={currentUser} tasks={el} key={index} update={update} number={index}/>
                    )
                })
            }
            <button onClick={()=>{console.log(currentUser)}} >9999999</button>
        </div>
    );
};

export default Tasks;