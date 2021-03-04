import React, {useEffect, useState} from 'react';
import './Task.scss'
import DescriptionIcon from "@material-ui/icons/Description";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {delProjectNestedTaskFilesFetch, postProjectFilesFetch, postProjectNestedTaskFilesFetch} from "../../requests";

const Task = (props) => {

    const [files, setFiles] = useState([])
    const [imgs, setImages] = useState(['png', 'jpeg', 'jpg', 'gif', 'webp'])

    useEffect(() => {
        if (!isEmpty(props)) {
            if (props.tasks.project_nested_task_file === []) return;
            setFiles(props.tasks.project_nested_task_file)
            console.log('props.tasks', props.tasks)
        }
    }, [props.tasks]);

    return (
        <div className='task'>
            <div className='taskWrap'>
                <div className="taskHeader">
                    <div className='nameStatus'>
                        <h5 className="status">
                            {props.tasks.status}
                        </h5>
                        <h3 className="name">
                            {props.number}. Title - {props.tasks.name}
                        </h3>
                    </div>
                    <div className='creatorWorker'>
                        <h4 className="creator">
                            Creator id - {props.tasks.created_user_id}
                        </h4>
                        <h4 className="usersWorked">
                            Worked id - {props.tasks.worked_user_id}
                        </h4>
                    </div>
                    <EditIcon className='editIcon'
                              onClick={() => {

                              }}/>
                </div>
                <div className="taskContent">
                    <div className="description">
                        <p>
                            {props.tasks.description}
                        </p>
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
                                                              .then((data) => {
                                                                  console.log('del file', data)
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