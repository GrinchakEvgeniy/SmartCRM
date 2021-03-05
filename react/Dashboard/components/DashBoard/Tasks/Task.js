import React, {useEffect, useState} from 'react';
import './Task.scss'
import DescriptionIcon from "@material-ui/icons/Description";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {
    delProjectNestedTaskFilesFetch,
    postProjectFilesFetch, postProjectNestedTaskDescriptionFetch,
    postProjectNestedTaskFilesFetch, postProjectNestedTaskNameFetch,
    postProjectTaskNameFetch
} from "../../requests";

const Task = (props) => {

    const [files, setFiles] = useState([])
    const [imgs, setImages] = useState(['png', 'jpeg', 'jpg', 'gif', 'webp'])
    const [editName, setEditName] = useState(false)
    const [editDescription, setEditDescription] = useState(false)

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task_file === []) return;
            setFiles(props.tasks.project_nested_task_file)
        }
    }, [props.tasks]);

    const editNestedTaskName = (e) => {
        postProjectNestedTaskNameFetch(props.tasks.id, e.target.value)
            .then(() => {
                props.update()
            })
    }

    const editNestedTasksDescription = (e) => {
        postProjectNestedTaskDescriptionFetch(props.tasks.id, e.target.value)
            .then(() => {
                props.update()
            })
    }


    return (
        <div className='task'>
            <div className='taskWrap'>
                <div className="taskHeader">
                    <div className='nameStatus'>
                        <h5 className="status">
                            {props.tasks.status}
                        </h5>
                        {
                            editName
                                ?
                                <input className='name'
                                       type="text"
                                       defaultValue={props.tasks.name}
                                       onKeyPress={(e) => {
                                           if (e.key === 'Enter') {
                                               setEditName(!editName)
                                               editNestedTaskName(e)
                                           }
                                       }}/>
                                :
                                <h3 className='name'>{props.number}. {props.tasks.name}</h3>
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
                    <div className="description">
                        {
                            editDescription
                                ?
                                <textarea className='name'
                                          defaultValue={props.tasks.description}
                                          onKeyPress={(e) => {
                                              if (e.key === 'Enter') {
                                                  setEditDescription(!editDescription)
                                                  editNestedTasksDescription(e)
                                              }
                                          }}/>
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
                </div>
            </div>
        </div>
    );
};

export default Task;