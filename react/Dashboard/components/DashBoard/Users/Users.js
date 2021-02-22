import React, {useState, useEffect} from 'react';
import './Users.scss';
import {getRolesFetch, getUsersFetch} from "../../requests";
import User from "./User";

const Users = () => {
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

    return (
        <div className="container users-wrap">
            <div className="alerts"></div>
            <div className="navigation">
                <div className="action">
                    <button className="btn btn-create">New user</button>
                </div>
                <div className="search">
                    <input type="text"/>
                </div>
            </div>
            <div className="content">
                <div className="header"><h4>Users</h4></div>
                <div className="items">
                    {
                        renderUser.map((value, index)=>{
                            return <User value={value} roles={roles} key={index}/>
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default Users;