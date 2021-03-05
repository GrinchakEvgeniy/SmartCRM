import React, {useEffect, useState} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import Task from "./Task";
import './TasksGroup.scss'
import {isEmpty} from "../../helper";
import {
    getProjectFetch,
    getUserFetch,
    getUsersFetch, postNewNestedTaskFetch, postNewTaskGroupFetch,
    postProjectTaskNameFetch,
    updateProjectFetch
} from "../../requests";
import Button from "@material-ui/core/Button";

const TasksGroup = (props) => {

    const [tasks, setTasks] = useState([])
    const [showTasks, setShowTasks] = useState(false)
    const [editName, setEditName] = useState(false)
    const [users, setUsers] = useState([])
    const [project, setProject] = useState({})

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task.length === 'undefined') return;
            setTasks(props.tasks.project_nested_task)
        }
    }, [props.tasks]);

    useEffect(() => {
        getUsersFetch()
            .then(data => setUsers(data));
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setProject(data)
            })
    }, [])

    const findName = (id, arr) => {
        for (let el of arr) {
            if (el.id === id) {
                return el.first_name
            }
        }
    }

    const editTaskName = (e) => {
        postProjectTaskNameFetch(props.tasks.id, e.target.value)
            .then(() => {
                props.update()
            })
    }

    const addNewNestedTask = (name, status) => {
        postNewNestedTaskFetch(name, status, props.tasks.id, props.currentUser).then(() => {
            props.update()
            console.log('name', name)
            console.log('status', status)
            console.log('id', props.tasks.id)
            console.log('currentUser', props.currentUser)
        })
    }

    return (
        <div>
            <div className="tasksGroupHeader">
                <div className="creatorName">
                    <h5>created by {findName(props.tasks.created_user_id, users)}
                    </h5>
                </div>
                <div className="taskGroupName">
                    {
                        editName
                            ?
                            <input className='nameField'
                                   type="text"
                                   defaultValue={props.tasks.name}
                                   onKeyPress={(e) => {
                                       if (e.key === 'Enter') {
                                           setEditName(!editName)
                                           editTaskName(e)
                                       }
                                   }}/>
                            :
                            <h3 className='nameField'>{props.tasks.name}</h3>
                    }
                </div>
                <div className="numberOfTasks">
                    <Button className='showBtn'
                            variant="contained"
                            disabled={!props.tasks.project_nested_task.length}
                            color="primary"
                            onClick={() => {
                                setShowTasks(!showTasks)
                            }}>
                        {showTasks ? 'close tasks' : 'show ' + props.tasks.project_nested_task.length + ' tasks'}
                    </Button>
                    <Button className='addTask'
                            variant="contained"
                            // disabled={!showTasks}
                            color="primary"
                            onClick={() => {
                                addNewNestedTask('New nested task', 'not started')
                            }}>
                        add new nested task
                    </Button>
                </div>
                <span className='progress_line'></span>
                <EditIcon className='editIcon'
                          color={editName ? 'secondary' : 'primary'}
                          onClick={(e) => {
                              e.stopPropagation()
                              setEditName(!editName)
                          }}/>
            </div>
            {
                showTasks
                    ?
                    <div className="allTasksProject">
                        {
                            tasks.map((el, index) => {
                                return (
                                    <Task tasks={el}
                                          users={users}
                                          update={props.update}
                                          findName={findName}
                                          number={index + 1}
                                          key={index}/>
                                )
                            })
                        }
                    </div>
                    :
                    ''
            }
            {/*<button onClick={() => {*/}
            {/*    console.log('current users', props.currentUser)*/}
            {/*}}>*/}
            {/*    show users*/}
            {/*</button>*/}
        </div>
    );
};

export default TasksGroup;