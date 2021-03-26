import React, {useState, useEffect} from 'react';
import './Users.scss';
import {getRolesFetch, getUserFetch, getUsersFetch} from "../../requests";
import User from "./User";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import {TextField} from "@material-ui/core";
import {getAccess, isEmpty} from "../../helper";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const Users = (props) => {
    const [alerts, setAlerts] = useState({
        type: "",
        message: ""
    })
    const [addUser, setAddUser] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [renderUser, setRenderUser] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersHere = ['S']

    useEffect(() => {
        getUsersFetch()
            .then((data) => {
                setUsers(data);
                setRenderUser(data);
            })
        getRolesFetch()
            .then(data => {
                setRoles(data);
            })
    }, []);

    useEffect(()=>{
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.length === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
        }
    }, [props.user_data])

    const Search = (string) => {
        if (string === '') {
            setRenderUser(users);
        } else {
            const searchArr = users.filter(el => {
                return el.first_name.toLowerCase().indexOf(string.toLowerCase()) > -1 || el.last_name.toLowerCase().indexOf(string.toLowerCase()) > -1;
            })
            setRenderUser(searchArr);
        }
    }

    useEffect(() => {
        getUsersFetch()
            .then((data) => {
                setUsers(data);
                setRenderUser(data);
            })
        if (alerts.type !== "") {
            const timer = setTimeout(() => {
                setAlerts({type: "", message: ""})
            }, 2300);
            return () => clearTimeout(timer);
        }
    }, [alerts]);


    return (
        <div className="container users-wrap">
            <div id='alert' className={alerts.type + " alerts"}>{alerts.message}</div>
            <div className="navigation">

                {
                    getAccess(currentUserRole, allowedUsersHere)
                        ?
                        <div className="action">
                            <Button className="btn add-btn"
                                    disabled={!(currentUserRole === "S")}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setAddUser(!addUser)}
                            >Add user
                            </Button>
                        </div>
                        :
                        ''
                }



                <div className="search">
                    <TextField
                        className="search"
                        type="text"
                        id="outlined-basic"
                        label="Search"
                        onChange={(event) => Search(event.target.value)}
                        variant="outlined"/>
                </div>
            </div>
            <div className="content">
                {/*<div className="header">*/}
                {/*    <h4>Users</h4>*/}
                {/*</div>*/}
                <div className="items">
                    {
                        renderUser.map((value, index) => {
                            return <User value={value}
                                         currentUserRole={currentUserRole}
                                         roles={roles}
                                         setAlerts={setAlerts}
                                         key={index}/>
                        })
                    }

                </div>
            </div>
            {
                addUser ? <AddUser
                    setAlerts={setAlerts}
                    setAddUser={setAddUser}
                /> : ""
            }
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data))
    }
}
export default connect(putState, putDispatch)(Users);