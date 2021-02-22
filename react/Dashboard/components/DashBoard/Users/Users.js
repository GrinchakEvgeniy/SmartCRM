import React, {useState, useEffect} from 'react';
import './Users.scss';
import {getRolesFetch, getUsersFetch} from "../../requests";
import User from "./User";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import {TextField} from "@material-ui/core";

const Users = () => {
    const [alerts, setAlerts] = useState({
        type: "",
        message: ""
    })
    const [addUser, setAddUser] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [renderUser, setRenderUser] = useState([]);

    useEffect(()=>{
        getUsersFetch()
            .then((data)=>{
                setUsers(data);
                setRenderUser(data);
            })
        getRolesFetch()
            .then(data=>{
                setRoles(data);
            })
    }, []);

    const Search = (string) => {
        if (string === '') {
            setRenderUser(users);
        } else {
            const searchArr = users.filter(el => {
                return el.first_name.toLowerCase().indexOf(string.toLowerCase()) > -1 || el.last_name.toLowerCase().indexOf(string.toLowerCase()) > -1 ;
            })
            setRenderUser(searchArr);
        }
    }

    useEffect(()=>{
        getUsersFetch()
            .then((data)=>{
                setUsers(data);
                setRenderUser(data);
            })
    }, [alerts]);

    return (
        <div className="container users-wrap">
            <div className={alerts.type + " alerts"}>{alerts.message}</div>
            <div className="navigation">
                <div className="action">
                    <Button className="btn add-btn"
                                variant="contained"
                                color="primary"
                            onClick={()=>setAddUser(!addUser)}
                                >Add user
                        </Button>
                </div>
                <div className="search">
                    <TextField
                            className="search"
                            type="text"
                            id="outlined-basic"
                            label="Search"
                            onChange={(event)=>Search(event.target.value)}
                            variant="outlined"/>
                </div>
            </div>
            <div className="content">
                <div className="header"><h4>Users</h4></div>
                <div className="items">
                    {
                        renderUser.map((value, index)=>{
                            return <User value={value}
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

export default Users;