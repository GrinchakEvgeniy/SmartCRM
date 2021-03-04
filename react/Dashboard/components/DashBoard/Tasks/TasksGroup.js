import React, {useEffect, useState} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import Task from "./Task";
import './TasksGroup.scss'
import {isEmpty} from "../../helper";
import {getProjectFetch} from "../../requests";
import Button from "@material-ui/core/Button";

const TasksGroup = (props) => {

    const [tasks, setTasks] = useState([])
    const [showTasks, setShowTasks] = useState(false)
    const [editName, setEditName] = useState(false)

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task.length === 'undefined') return;
            setTasks(props.tasks.project_nested_task)
        }
    }, [props.tasks]);



    return (
        <div>
            <div className="tasksGroupHeader">
                <div className="creatorName">
                    <h5>Creator name id - {props.tasks.created_user_id}</h5>
                </div>
                <div className="taskGroupName">
                    {
                        editName
                            ?
                            <input className='nameField'
                                   type="text"
                                   defaultValue={props.tasks.name}
                                   onKeyPress={(e) => {
                                       if(e.key==='Enter'){
                                           console.log('DONE')
                                       }
                                   }}/>
                            :
                            <h3 className='nameField'>{props.tasks.name}</h3>
                    }
                </div>
                <div className="numberOfTasks">
                    <h4>{props.tasks.project_nested_task.length} tasks</h4>
                    <Button className='showBtn'
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setShowTasks(!showTasks)
                            }}>
                        {showTasks ? 'close' : 'show'}
                    </Button>
                </div>
                <span className='progress_line'></span>
                <EditIcon className='editIcon'
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
                                          update={props.update}
                                          number={index + 1}
                                          key={index}/>
                                )
                            })
                        }
                    </div>
                    :
                    ''
            }


            <button onClick={() => {
                console.log('props', props)
            }}>
                show task
            </button>
        </div>
    );
};

export default TasksGroup;