import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import './ProjectField.scss'

const ProjectField = (props) => {

    const [editField, setEditField] = useState(false)
    const [showMenuField, setShowMenuField] = useState(false)

    useEffect(() => {
        document.getElementById('projectTitleId').focus()
    }, [editField === true])

    return (
        <div className="projectField">
            <TextField className='editField'
                       id='projectTitleId'
                       disabled={!editField}
                       defaultValue={props.value}
                       variant="outlined"/>
            <div className="menuBtn"
                 onClick={() => {
                     setShowMenuField(!showMenuField)
                 }
                 }>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={showMenuField ? 'actions show' : 'actions'}>
                <div className="action edit"
                     onClick={() => {
                         setEditField(true)
                     }}>
                    <EditIcon/>
                </div>
                <div className="action save"
                     onClick={() => {
                         setEditField(false)
                         setShowMenuField(!showMenuField)
                     }}>
                    <SaveIcon/>
                </div>
            </div>
        </div>
    );
};

export default ProjectField;