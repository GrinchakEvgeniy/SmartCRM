import React, {useEffect, useState} from 'react';
import './ProjectControl.scss';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {TextField} from "@material-ui/core";
import {getProjectFetch} from "../../requests";
import ProjectField from "./ProjectField";

const ProjectControl = () => {

    const [tabValue, setTabValue] = useState('Project')
    // const [editField, setEditField] = useState(false)
    // const [showMenuField, setShowMenuField] = useState(false)

    const [project, setProject] = useState({})

    useEffect(() => {
        getProjectFetch(window.location.href.split('/').pop()).then(data => setProject(data));
    }, [])

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
                                    <ProjectField value={'Project Title New'}/>
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