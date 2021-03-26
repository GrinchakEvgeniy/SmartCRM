import React, {useState, useEffect} from 'react';
import "./Projects.scss";
import {getProjectsSimpleFetch, getUsersFetch, getClientsFetch, getUserFetch} from "../../requests";
import NewProject from "./NewProject";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import {getAccess, isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import {Link, NavLink} from "react-router-dom";
import Project from "./Project";

const Projects = (props) => {
    const [projectsSimple, setProjectsSimple] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([])
    const [newProjectLayout, setNewProjectLayout] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState('')
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    const allowedUsersToAddProj = ['S', 'PM']
    const allowedUsersHere = ['S', 'PM', 'D', 'TL', 'Dev']


    useEffect(() => {
        getProjectsSimpleFetch()
            .then(data => setProjectsSimple(data));
        getUsersFetch()
            .then(data => setUsers(data));
        getClientsFetch()
            .then(data => setClients(data));
        // getUserFetch().then(data => {
        //     setCurrentUserRole(data.profile.role_id.value)
        //     setCurrentUserName(data.first_name)
        //     setCurrentUserId(data.id)
        // })
    }, [])

    useEffect(()=>{
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
            setCurrentUserName(props.user_data.first_name)
            setCurrentUserId(props.user_data.id)
        }
    }, [props.user_data])

    const update = () => {
        getProjectsSimpleFetch()
            .then(data => setProjectsSimple(data));
    }

    return (
        <div className="projects">
            <div className="container">

                {
                    getAccess(currentUserRole, allowedUsersToAddProj)
                        ?
                        <div className="navigation">
                            <Button variant="contained"
                                    className="btn btn-new"
                                    color="primary"
                                    onClick={() => {
                                        setNewProjectLayout(true)
                                    }}>
                                Add new
                            </Button>
                        </div>
                        :
                        ''
                }

                {
                    getAccess(currentUserRole, allowedUsersHere)
                        ?
                        <div className="projects_wrap">
                            {
                                projectsSimple.map((value, index) => {
                                    const users_id = value.users_list.split(',');
                                    return (
                                        <Project value={value}
                                                 currentUserRole={currentUserRole}
                                                 currentUserName={currentUserName}
                                                 currentUserId={currentUserId}
                                                 index={index}
                                                 users_id={users_id}
                                                 key={index}
                                                 users={users}
                                                 update={update}/>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className='noAccess' style={{
                            width: '600px',
                            height: '300px',
                            position: "fixed",
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            background: 'white',
                            boxShadow: '1px 3px 10px 0px #bfbfbf'
                        }}>
                            <h2 style={{
                                color: '#757575',
                                fontSize: '36px',
                                textTransform: 'uppercase'
                            }}>
                                You don't have access.
                            </h2>
                        </div>
                }
            </div>
            {
                newProjectLayout ? <NewProject
                    currentUserName={currentUserName}
                    currentUserId={currentUserId}
                    closeLayout={setNewProjectLayout}
                    users={users}
                    setProjectsSimple={setProjectsSimple}
                    clients={clients}/> : ""
            }
        </div>
    );
};

const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(Projects);