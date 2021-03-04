import React, {useEffect, useState} from 'react';
import './Task.scss'
import DescriptionIcon from "@material-ui/icons/Description";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import {postProjectFilesFetch} from "../../requests";

const Task = (props) => {

    const[files, setFiles] = useState([])
    const [imgs, setImages] = useState(['png', 'jpeg', 'jpg', 'gif', 'webp'])

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.task.project_nested_task_file.lenght === 'undefined' ) return;
            setFiles(props.task.project_nested_task_file)
        }
    }, [props]);

    return (
        <div className='task'>
            <div className='taskWrap'>
                <div className="taskHeader">
                    <div className="status">
                        Status - {props.task.status}
                    </div>
                    <div className="name">
                        Name - {props.task.name}
                    </div>
                    <div className="creator">
                        Creator id - {props.task.created_user_id}
                    </div>
                    <div className="usersWorked">
                        Worked id - {props.task.worked_user_id}
                    </div>
                    <div className="description">
                        Description - {props.task.description}
                    </div>
                    <div className="taskFiles">
                        <div className="filesWrap">
                        {
                            files.length
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
                                                      // delProjectFile(el.id)
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
                                    postProjectFilesFetch(event.target.files, project.id)
                                        .then(() => {
                                            update()
                                        })
                                }}
                                component="label">
                            +
                            <input type="file" hidden/>
                        </Button>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                console.log(props)
            }}>task
            </button>
        </div>
    );
};

export default Task;