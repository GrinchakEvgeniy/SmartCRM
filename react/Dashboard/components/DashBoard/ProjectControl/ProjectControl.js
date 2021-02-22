import React, {useEffect, useState} from 'react';
import './ProjectControl.scss';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {TextField} from "@material-ui/core";

const ProjectControl = () => {

    const [tabValue, setTabValue] = useState('Project')
    const [editTitle, setEditTitle] = useState(false)

    useEffect(() => {
        document.getElementById('projectTitleId').focus()
    }, [editTitle === true])

    return (
        <div className="projectControl">
            <div className="container">
                <div className={tabValue === 'Project' ? 'tabs first' : 'tabs second'}>
                    <div className="tab project"
                         onClick={() => {
                             setTabValue('Project')
                         }}>
                        Project
                    </div>
                    <div className="tab tasks"
                         onClick={() => {
                             setTabValue('Tasks')
                         }}>
                        Tasks
                    </div>
                    <span className='activeTab'></span>
                </div>
                <div className="tabValue">
                    {
                        tabValue === 'Project'
                            ?
                            <div className="project">
                                <div className="projectWrap">
                                    <div className="projectTitle">
                                        <TextField id="projectTitleId"
                                                   className='editTitle'
                                                   disabled={!editTitle}
                                                   defaultValue='Project Title'
                                                   variant="outlined"/>
                                        <div className="menuBtn">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className="actions">
                                            <div className="action edit"
                                                 onClick={() => {
                                                     setEditTitle(true)
                                                 }}>
                                                <EditIcon/>
                                            </div>
                                            <div className="action save"
                                                 onClick={() => {
                                                     setEditTitle(false)
                                                 }}>
                                                <SaveIcon/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            tabValue === 'Tasks'
                                ?
                                <div className="projectTasks">
                                    <div className="projectTasksWrap">

                                    </div>
                                </div>
                                :
                                ''
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectControl;