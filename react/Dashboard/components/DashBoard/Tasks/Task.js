import React, {useEffect, useState} from 'react';
import './Task.scss'
import DescriptionIcon from "@material-ui/icons/Description";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    delNestedTaskFetch,
    delProjectNestedTaskFilesFetch, getUserFetch,
    postProjectFilesFetch, postProjectNestedTaskDescriptionFetch,
    postProjectNestedTaskFilesFetch, postProjectNestedTaskNameFetch, postProjectNestedTaskWorkerFetch,
    postProjectTaskNameFetch
} from "../../requests";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const Task = (props) => {

    const [files, setFiles] = useState([])
    const [imgs, setImages] = useState(['png', 'jpeg', 'jpg', 'gif', 'webp'])
    const [editName, setEditName] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showFiles, setShowFiles] = useState(false)
    const [status, setStatus] = useState('')
    const [warning, setWarning] = useState(false)
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task_file === []) return;
            setFiles(props.tasks.project_nested_task_file)
            setStatus(props.tasks.status)
        }
        getUserFetch().then(data => {
            setCurrentUser(data.id)
        })
    }, [props.tasks]);

    const editNestedTaskStatusAndWorker = (e) => {
        switch (e.target.value) {
            case 'pending':
                postProjectNestedTaskNameFetch(props.tasks.id, props.tasks.name, e.target.value, null)
                    .then(() => {
                        props.update()
                    })
                console.log('pending')
                break
            case 'at work':
                postProjectNestedTaskNameFetch(props.tasks.id, props.tasks.name, e.target.value, currentUser)
                    .then(() => {
                        props.update()
                    })
                console.log('at work')
                break
            case 'done':
                postProjectNestedTaskNameFetch(props.tasks.id, props.tasks.name, e.target.value, currentUser)
                    .then(() => {
                        props.update()
                    })
                console.log('done')
                break
            default:
                console.log('default')
        }
        console.log(props.tasks)
    }

    const editNestedTaskName = (val) => {
        postProjectNestedTaskNameFetch(props.tasks.id, val, status)
            .then(() => {
                props.update()
            })
    }

    const editNestedTasksDescription = (val) => {
        postProjectNestedTaskDescriptionFetch(props.tasks.id, val)
            .then(() => {
                props.update()
            })
    }

    const delNestedTask = (task_id) => {
        delNestedTaskFetch(task_id).then(() => {
            props.update()
        })
    }

    return (
        <div className='task'>
            <div className='taskWrap'>
                <div className="taskHeader">
                    <div className='nameStatus'>
                        <FormControl variant="filled"
                                     disabled={!(currentUser === props.tasks.worked_user_id || props.tasks.worked_user_id === null)}
                                     className='status'
                                     style={
                                         status === 'pending'
                                             ?
                                             {background: 'rgba(255, 255, 255, 0.74)'}
                                             :
                                             status === 'at work'
                                                 ?
                                                 {background: 'rgba(255, 255, 255, 0.74)'}
                                                 :
                                                 status === 'done'
                                                     ?
                                                     {background: '#EDC939'}
                                                     :
                                                     {background: 'rgba(255, 255, 255, 0.74)'}
                                     }>
                            <Select value={status}
                                    onChange={(event) => {
                                        setStatus(event.target.value)
                                        editNestedTaskStatusAndWorker(event)
                                    }}>
                                <MenuItem value='pending'>PENDING</MenuItem>
                                <MenuItem value='at work'>AT WORK</MenuItem>
                                <MenuItem value='done'>DONE</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='nameWrap'>
                            <p className='number'>{props.number + '.'}</p>
                            <textarea className='name'
                                      defaultValue={props.tasks.name}
                                      disabled={!editName}
                                      rows={1}
                                      maxLength='65'
                                      style={editName ? {background: '#d2d2d2'} : {background: 'transparent'}}
                                      onKeyPress={(e) => {
                                          if (e.key === 'Enter') {
                                              setEditName(!editName)
                                              editNestedTaskName(e.target.value)
                                          }
                                      }}/>
                            {
                                editName
                                    ?
                                    <span className='saveBtn'
                                          onClick={(e) => {
                                              setEditName(!editName)
                                              editNestedTaskName(e.target.previousSibling.value)
                                          }}>
                                          &#128190;
                                      </span>
                                    :
                                    <EditIcon className='editIcon' onClick={(e) => {
                                        setEditName(!editName)
                                    }}/>
                            }
                        </div>
                    </div>
                    <div className='creatorWorker'>
                        <p className="creator">
                            Creator: {props.findName(props.tasks.created_user_id, props.users)}
                        </p>
                        <p className="usersWorked">
                            Worked: {props.findName(props.tasks.worked_user_id, props.users)}
                            {/*Worked: {props.tasks.worked_user_id}*/}
                        </p>
                    </div>
                </div>
                <div className="taskContent">
                    <Button className='showBtn'
                            variant="contained"
                            onClick={() => {
                                setShowDescription(!showDescription)
                            }}>
                        {showDescription ? 'close description' : 'show description'}
                    </Button>
                    {
                        showDescription
                            ?
                            <div className="description">
                                <div className='descrWrap'>
                                    <textarea className='descriptionVal'
                                              defaultValue={props.tasks.description}
                                              disabled={!editDescription}
                                              rows='3'
                                              onKeyPress={(e) => {
                                                  if (e.key === 'Enter') {
                                                      setEditDescription(!editDescription)
                                                      editNestedTasksDescription(e.target.value)
                                                  }
                                              }}/>
                                    {
                                        editDescription
                                            ?
                                            <span className='saveBtn'
                                                  onClick={(e) => {
                                                      setEditDescription(!editDescription)
                                                      editNestedTasksDescription(e.target.previousSibling.value)
                                                  }}>&#128190;</span>
                                            :
                                            <EditIcon className='editIcon'
                                                      onClick={() => {
                                                          setEditDescription(!editDescription)
                                                      }}/>
                                    }
                                </div>
                            </div>
                            :
                            ''

                    }
                    <Button className='showBtn'
                            variant="contained"
                            onClick={() => {
                                setShowFiles(!showFiles)
                            }}>
                        {showFiles
                            ?
                            'close files'
                            :
                            'show ' + props.tasks.project_nested_task_file.length + ' files'}
                    </Button>
                    {
                        showFiles
                            ?
                            <div className="taskFiles">
                                <div className="filesWrap">
                                    {
                                        files
                                            ?
                                            files.map((el, index) => {
                                                return (
                                                    <a className="file"
                                                       href={el.file}
                                                       download
                                                       key={index}>
                                                        <div className="fileIcon">
                                                            {
                                                                imgs.indexOf(el.file.split('.').pop()) !== -1
                                                                    ?
                                                                    <img src={el.file} alt=""/>
                                                                    :
                                                                    <DescriptionIcon/>
                                                            }
                                                        </div>
                                                        <h4 className="fileName">{el.file.split('/').pop()}</h4>
                                                        <span className="delBtn"
                                                              onClick={(e) => {
                                                                  e.preventDefault()
                                                                  delProjectNestedTaskFilesFetch({id: el.id})
                                                                      .then(() => {
                                                                          props.update()
                                                                      })
                                                              }}
                                                              id="9">&times;</span>
                                                    </a>
                                                )
                                            })
                                            :
                                            ''
                                    }
                                </div>
                                <Button className="addFileBtn"
                                        variant="contained"
                                        onChange={(event) => {
                                            postProjectNestedTaskFilesFetch(event.target.files, props.tasks.id)
                                                .then((data) => {
                                                    props.update()
                                                })
                                        }}
                                        component="label">
                                    +
                                    <input type="file" hidden/>
                                </Button>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
            <DeleteForeverIcon className='delNestedTask'
                               onClick={() => {
                                   console.log('DELETE TASK')
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
                                    onClick={() => {
                                        setWarning(!warning)
                                    }}>
                                Cancel
                            </Button>
                            <Button className='btn'
                                    variant="contained"
                                    onClick={() => {
                                        delNestedTask(props.tasks.id)
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

export default Task;