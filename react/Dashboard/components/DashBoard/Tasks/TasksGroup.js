import React, {useEffect, useState} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import Task from "./Task";
import './TasksGroup.scss'
import {isEmpty} from "../../helper";
import {
    delTaskGroupFetch,
    getProjectFetch,
    getUserFetch,
    getUsersFetch, postNewNestedTaskFetch, postNewTaskGroupFetch,
    postProjectTaskNameFetch,
    updateProjectFetch
} from "../../requests";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const TasksGroup = (props) => {

    const [tasks, setTasks] = useState([])
    const [doneTasks, setDoneTasks] = useState('')
    const [showTasks, setShowTasks] = useState(false)
    const [editName, setEditName] = useState(false)
    const [users, setUsers] = useState([])
    const [project, setProject] = useState({})
    const [warning, setWarning] = useState(false)
    const [widthProgessLine, setWidthProgessLine] = useState('0%')

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task.length === 'undefined') return;
            setTasks(props.tasks.project_nested_task)
            setDoneTasks(props.tasks.project_nested_task.filter(el => el.status === 'done'))
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

    const editTaskName = (val) => {
        postProjectTaskNameFetch(props.tasks.id, val)
            .then(() => {
                props.update()
            })
    }

    const addNewNestedTask = (name, status) => {
        postNewNestedTaskFetch(name, status, props.tasks.id, props.currentUser).then(() => {
            props.update()
        })
    }

    const delTask = (id) => {
        delTaskGroupFetch(id).then(() => {
            props.update()
        })
    }

    return (
        <div className="tasksGroup">
            <div className="tasksGroupHeader">
                <div className="creatorName">
                    <h5>created by {findName(props.tasks.created_user_id, users)}
                    </h5>
                </div>
                <div className="taskGroupName">
                    {
                        editName
                            ?
                            <div className='nameFieldWrap'>
                                <input className='nameField'
                                       type="text"
                                       defaultValue={props.tasks.name}
                                       onKeyPress={(e) => {
                                           if (e.key === 'Enter') {
                                               setEditName(!editName)
                                               editTaskName(e.target.value)
                                           }
                                       }}/>
                                <span className='saveBtn'
                                      onClick={(e) => {
                                          setEditName(!editName)
                                          editTaskName(e.target.previousSibling.value)

                                      }}>
                                          ok
                                      </span>
                            </div>
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
                            // style={!showTasks ? {background: '#c6c6c6'} : {background: '#00a4ff'}}
                            color="primary"
                            onClick={() => {
                                addNewNestedTask('New nested task', 'not started')
                            }}>
                        add new nested task
                    </Button>
                </div>
                <span className='progress_line'
                      style={{width: doneTasks.length / tasks.length * 100 + '%'}}
                > </span>
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
            <DeleteForeverIcon className='delTask'
                               style={
                                   showTasks
                                       ?
                                       {display: 'none'}
                                       :
                                       {display: 'initial'}
                               }
                               color='primary'
                               onClick={() => {
                                   setWarning(!warning)
                               }}/>
            {
                warning
                    ?
                    <div className="warning">
                        <h3>Are You sure?</h3>
                        <div className="btns">
                            <Button className='btn'
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setWarning(!warning)
                                    }}>
                                Cancel
                            </Button>
                            <Button className='btn'
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        delTask(props.tasks.id)
                                        setWarning(!warning)
                                    }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

export default TasksGroup;