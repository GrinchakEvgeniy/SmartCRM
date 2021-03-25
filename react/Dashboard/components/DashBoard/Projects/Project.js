import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './Project.scss'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from "@material-ui/core/Button";
import {delProjectSimpleFetch} from "../../requests";
import {getAccess} from "../../helper";
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const Project = (props) => {

    const [warning, setWarning] = useState(false)
    const allowedUsersToDelProj = ['S', 'PM']
    const defaultAva = '/static/images/userIcon.svg';

    const delProject = (id) => {
        delProjectSimpleFetch(id).then(() => {
            props.update()
        }).then(() => {
            for (let elem of props.users_id) {
                props.web_socket.send(JSON.stringify({
                    'message': `${props.currentUserName} deleted the ${props.value.name} project`,
                    'type_notification': "user",
                    'from_notification': props.currentUserId,
                    'for_notification': elem,
                }));
            }
        })
    }

    return (
        <div className='projectWrap'>
            <NavLink to={'/dashboard/project/' + props.value.id}>
                <div className="project">
                    <div className="title"><h3>{props.value.name}</h3></div>
                    <div className="status"><p>{props.value.status}</p></div>
                    <div className="users">
                        {
                            props.users.map((value2, index) => {
                                for (let i = 0; i < props.users_id.length; i++) {
                                    if (value2.id === parseInt(props.users_id[i])) {
                                        return (
                                            <div className="userWrap" key={index}>
                                                <div className="user">
                                                    <img src={value2.profile.avatar.image
                                                        ?
                                                        value2.profile.avatar.image
                                                        :
                                                        defaultAva}
                                                         alt={value2.first_name}/>
                                                </div>
                                                <p className="userName">{value2.first_name}</p>
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </div>
            </NavLink>

            {
                getAccess(props.currentUserRole, allowedUsersToDelProj)
                    ?
                    <div className="MyDelIcon" onClick={() => {
                        setWarning(!warning)
                    }}>
                        <div className="iconWrap">
                            <div className="lid"></div>
                            <div className="trash">    &times;</div>
                        </div>
                    </div>
                    :
                    ''
            }

            {
                warning
                    ?
                    <div className="warning">
                        <h3>Are You sure?</h3>
                        <div className="btns">
                            <Button className='btn'
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setWarning(!warning)
                                    }}>
                                Cancel
                            </Button>
                            <Button className='btn'
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        delProject(props.value.id)
                                        setWarning(!warning)
                                    }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                    :
                    ''
            }
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
export default connect(putState, putDispatch)(Project);