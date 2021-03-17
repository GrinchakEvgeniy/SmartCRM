import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import './ProjectField.scss'
import {getAccess} from "../../helper";
import {getRolesFetch, getUserFetch, getUsersFetch} from "../../requests";

const ProjectField = (props) => {

    const [editField, setEditField] = useState(false)
    const [showMenuField, setShowMenuField] = useState(false)
    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersToEditField = ['S', 'PM']
    // const [valueField, setValueField] = useState()

    useEffect(() => {
        document.getElementById(props.uniqId).focus()
    }, [editField === true])

    useEffect(() => {
        getUserFetch().then(data => {
            setCurrentUserRole(data.profile.role_id.value)
        })
    }, []);

    return (
        <div className="projectField">
            <TextField className='editField'
                       id={props.uniqId}
                       rows={props.rows ? props.rows : 1}
                       rowsMax={10}
                       multiline
                       disabled={!editField}
                       defaultValue={props.value}
                       onChange={(e) => {
                           props.edit(e.target.value)
                       }}
                       variant="outlined"/>
            {
                getAccess(currentUserRole, allowedUsersToEditField)
                    ?
                    <div className="menuBtn"
                         onClick={() => {
                             setShowMenuField(!showMenuField)
                         }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    :
                    ''
            }
            {
                getAccess(currentUserRole, allowedUsersToEditField)
                    ?
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
                                 props.update()
                             }}>
                            <SaveIcon/>
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

export default ProjectField;