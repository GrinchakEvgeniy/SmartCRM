import React, {useState, useEffect} from 'react';
import "./Projects.scss";
import {getProjectsSimpleFetch, getUsersFetch, getClientsFetch} from "../../requests";
import NewProject from "./NewProject";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import {isEmpty} from "../../helper";
import Button from "@material-ui/core/Button";
import {Link, NavLink} from "react-router-dom";
import Project from "./Project";

const Projects = (props) => {
    const [projectsSimple, setProjectsSimple] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([])
    const [newProjectLayout, setNewProjectLayout] = useState(false);
    const [roleId, setRoleId] = useState(true)


    useEffect(() => {
        getProjectsSimpleFetch()
            .then(data => setProjectsSimple(data));
        getUsersFetch()
            .then(data => setUsers(data));
        getClientsFetch()
            .then(data => setClients(data));
    }, [])

    const update = () => {
        getProjectsSimpleFetch()
            .then(data => setProjectsSimple(data));
    }

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.role_id === 'undefined') return;
            if (props.user_data.profile.role_id.value === "S" || props.user_data.profile.role_id.value === "PM") {
                setRoleId(false);
            } else {
                setRoleId(true)
            }
        }
    }, [props.user_data]);

    return (
        <div className="projects">
            <div className="container">
                <div className="navigation">
                    <Button variant="contained"
                            className="btn btn-new"
                            disabled={roleId}
                            color="primary"
                            onClick={() => {
                                setNewProjectLayout(true)
                            }}>
                        Add new
                    </Button>
                </div>
                <div className="projects_wrap">
                    {
                        projectsSimple.map((value, index) => {
                            const users_id = value.users_list.split(',');
                            return (
                                <Project value={value}
                                         index={index}
                                         users_id={users_id}
                                         key={index}
                                         users={users}
                                         update={update}/>
                            )
                        })
                    }
                </div>
            </div>
            {
                newProjectLayout ? <NewProject
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