import React, {useState, useEffect} from 'react';
import './NewProject.scss';
import {getUserFetch, getUsersFetch, postProjectSimpleFetch} from "../../requests";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const NewProject = (props) => {
    const [userIds, setUserIds] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        users_list: "",
        description: "",
        accesses: "",
        status: "Active",
        client_id: ""
    });
    // const [currentUserId, setCurrentUserId] = useState('')
    // const [currentUserName, setCurrentUserName] = useState('')
    const defaultAva = '/static/images/userIcon.svg';

    const userCheck = (event) => {
        // console.log(event.target.dataset.id, event.target.dataset.check)
        let result = userIds.slice()
        if (event.target.closest('.user_check_wrap').dataset.check === "true") {
            result.push(event.target.closest('.user_check_wrap').dataset.id)
        } else {
            result = userIds.filter(el => el !== event.target.closest('.user_check_wrap').dataset.id);
        }
        setUserIds(result);
        setNewProject({...newProject, users_list: result.join()});
    }

    const Create = () => {
        // getUsersFetch().then(data => {
        //     console.log('data', data)
        // })
        postProjectSimpleFetch(newProject)
            .then(data => {
                props.setProjectsSimple(data);
                props.closeLayout(false);
            })
            .then(() => {
                for (let el of userIds) {
                    props.web_socket.send(JSON.stringify({
                        'message': props.currentUserName + ' created a project ' + newProject.name,
                        'type_notification': "user",
                        'from_notification': props.currentUserId,
                        'for_notification': el,
                    }));
                }
                props.web_socket.send(JSON.stringify({
                    'message': props.currentUserName + ' created a project ' + newProject.name,
                    'type_notification': "group",
                    'from_notification': props.currentUserId,
                    'for_notification': "PM",
                }));
                props.web_socket.send(JSON.stringify({
                    'message': props.currentUserName + ' created a project ' + newProject.name,
                    'type_notification': "group",
                    'from_notification': props.currentUserId,
                    'for_notification': "S",
                }));
            })
    }

    return (
        <div className="new_project">
            <div className="new_projectWrap">
                <div className="pr_new_title">
                    <h3>CREATE NEW PROJECT</h3>
                </div>
                <div className="new_project_fields">
                    <div className="field name">
                        <TextField label="Title *"
                                   error={!newProject.name}
                                   fullWidth
                                   margin="normal"
                                   variant="outlined"
                                   onChange={(event) => {
                                       setNewProject({...newProject, name: event.target.value})
                                   }}/>
                    </div>
                    <div className="field description">
                        <TextField
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            onChange={(event) => {
                                setNewProject({...newProject, description: event.target.value})
                            }}/>
                    </div>
                    <div className="field access">
                        <TextField
                            label="Accesses"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            onChange={(event) => {
                                setNewProject({...newProject, accesses: event.target.value})
                            }}/>
                    </div>
                    <div className="field users">
                        <h3>PARTICIPANTS</h3>
                        <div className="usersWrap">
                            {
                                props.users.map((value, index) => {
                                    return (
                                        <div className="user_check_wrap"
                                             data-id={value.id}
                                             data-check={false}
                                             key={index}
                                             onClick={(event) => {
                                                 let elem = event.target.closest('.user_check_wrap')
                                                 elem.dataset.check === 'false'
                                                     ?
                                                     (elem.dataset.check = "true", elem.style.background = "#b0d6ff")
                                                     :
                                                     (elem.dataset.check = "false", elem.style.background = "#f7f7f7")
                                                 userCheck(event)
                                             }}>
                                            <div className="img_user">
                                                <img src={value.profile.avatar.image
                                                    ?
                                                    value.profile.avatar.image
                                                    :
                                                    defaultAva} alt="ava"/>
                                            </div>
                                            <div className="name_user">
                                                <p>{value.first_name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className="field client">
                        <FormControl variant="outlined">
                            <InputLabel>Clients</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="987"
                                label="Clients"
                                defaultValue=""
                                onChange={(event) => {
                                    setNewProject({...newProject, client_id: event.target.value})
                                }}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    props.clients.map((value, index) => {
                                        return (
                                            <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="field status">
                        <FormControl variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="987"
                                label="Status"
                                defaultValue=""
                                onChange={(event) => {
                                    setNewProject({...newProject, status: event.target.value})
                                }}>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Not Active">Not Active</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="newProjectFootnote">
                    <p>* - required fields</p>
                </div>
                <div className="new_project_buttons">
                    <Button variant="contained"
                            className="btn-cancel"
                            color="secondary"
                            onClick={() => props.closeLayout(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained"
                            disabled={!newProject.name}
                            className="btn-create"
                            color="primary"
                            onClick={Create}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket,
        notification: state.notification
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data)),
        newNotification: (data) => dispatch(newNotification(data))
    }
}
export default connect(putState, putDispatch)(NewProject);