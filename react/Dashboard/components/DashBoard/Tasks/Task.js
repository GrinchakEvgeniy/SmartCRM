import React, {useEffect, useState} from 'react';
import './Task.scss'
import DescriptionIcon from "@material-ui/icons/Description";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    delNestedTaskFetch,
    delProjectNestedTaskFilesFetch,
    postProjectFilesFetch, postProjectNestedTaskDescriptionFetch,
    postProjectNestedTaskFilesFetch, postProjectNestedTaskNameFetch,
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

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task_file === []) return;
            setFiles(props.tasks.project_nested_task_file)
            setStatus(props.tasks.status)
        }
    }, [props.tasks]);

    const editNestedTaskStatus = (e) => {
        postProjectNestedTaskNameFetch(props.tasks.id, props.tasks.name, e.target.value)
            .then(() => {
                props.update()
            })
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
                                     className='status'
                                     style={
                                         status === 'is pending'
                                             ?
                                             {background: '#ffff48'}
                                             :
                                             status === 'at work'
                                                 ?
                                                 {background: '#ff9745'}
                                                 :
                                                 status === 'done'
                                                     ?
                                                     {background: '#4fff4f'}
                                                     :
                                                     {background: '#D8D8D8'}

                                     }>
                            <Select value={status}
                                    onChange={(event) => {
                                        setStatus(event.target.value)
                                        console.log('event.target.value', event.target.value)
                                        editNestedTaskStatus(event)
                                    }}>
                                <MenuItem value='is pending'>IS PENDING</MenuItem>
                                <MenuItem value='at work'>AT WORK</MenuItem>
                                <MenuItem value='done'>DONE</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            editName
                                ?
                                <div className='nameWrap'>
                                    <input className='name'
                                           type="text"
                                           defaultValue={props.tasks.name}
                                           onKeyPress={(e) => {
                                               if (e.key === 'Enter') {
                                                   setEditName(!editName)
                                                   editNestedTaskName(e.target.value)
                                               }
                                           }}/>
                                    <span className='saveBtn'
                                          onClick={(e) => {
                                              setEditName(!editName)
                                              editNestedTaskName(e.target.previousSibling.value)

                                          }}>
                                          ok
                                      </span>
                                </div>
                                :
                                <div className='nameWrap'>
                                    <h3 className='name'>{props.number}. {props.tasks.name}</h3>
                                </div>
                        }
                    </div>
                    <div className='creatorWorker'>
                        <h4 className="creator">
                            Creator: {props.findName(props.tasks.created_user_id, props.users)}
                        </h4>
                        <h4 className="usersWorked">
                            Worked: {props.findName(props.tasks.worked_user_id, props.users)}
                        </h4>
                    </div>
                    <EditIcon className='editIcon'
                              color={editName ? 'secondary' : 'primary'}
                              onClick={() => {
                                  setEditName(!editName)
                              }}/>
                </div>
                <div className="taskContent">
                    <Button className='showBtn'
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setShowDescription(!showDescription)
                            }}>
                        {showDescription ? 'close description' : 'show description'}
                    </Button>
                    {
                        showDescription
                            ?
                            <div className="description">
                                {
                                    editDescription
                                        ?
                                        <div className='descrWrap'>
                                            <textarea className='descriptionVal'
                                                     defaultValue={props.tasks.description}
                                                     onKeyPress={(e) => {
                                                         if (e.key === 'Enter') {
                                                             setEditDescription(!editDescription)
                                                             editNestedTasksDescription(e.target.value)
                                                         }
                                                     }}/>
                                            <span className='saveDescrBtn'
                                                  onClick={(e) => {
                                                      setEditDescription(!editDescription)
                                                      editNestedTasksDescription(e.target.previousSibling.value)

                                                  }}>
                                          ok
                                      </span>
                                        </div>
                                        :
                                        <p>
                                            {props.tasks.description}
                                        </p>
                                }
                                <EditIcon className='editIcon'
                                          color={editDescription ? 'secondary' : 'primary'}
                                          onClick={() => {
                                              setEditDescription(!editDescription)
                                          }}/>
                            </div>
                            :
                            ''

                    }
                    <Button className='showBtn'
                            variant="contained"
                            color="secondary"
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
                                                              id="9">-</span>
                                                    </a>
                                                )
                                            })
                                            :
                                            ''
                                    }
                                </div>
                                <Button className="addFileBtn"
                                        color='secondary'
                                        variant="contained"
                                        onChange={(event) => {
                                            postProjectNestedTaskFilesFetch(event.target.files, props.tasks.id)
                                                .then((data) => {
                                                    console.log('add file', data)
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
                               color='primary'
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