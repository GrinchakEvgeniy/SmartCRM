import React, {useEffect, useState} from 'react';
import './Tasks.scss'
import {getProjectFetch, getUserFetch, getUsersFetch, postNewTaskGroupFetch} from "../../requests";
import TasksGroup from "./TasksGroup";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const Tasks = () => {

    const [taskGroups, setTaskGroups] = useState([])
    const [currentProjectId, setCurrentProjectId] = useState('')

    useEffect(() => {
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
            console.log('data', data)
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
                            console.log('addNewTask')
                        }}>
                    Add new tasks group
                </Button>
            </div>

            {
                taskGroups.map((el, index) => {
                    return (
                        <TasksGroup tasks={el} key={index} update={update} number={index}/>
                    )
                })
            }
        </div>
    );
};

export default Tasks;