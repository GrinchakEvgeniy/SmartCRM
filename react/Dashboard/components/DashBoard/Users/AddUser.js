import React, {useState, useEffect} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createUserFetch} from "../../requests";
import './AddUser.scss';

const AddUser = (props) => {
    const [create, setCreate] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    });

    const Create = () => {
        if(create){
            createUserFetch(newUser)
                .then(data=>{
                    props.setAlerts(data)
                    props.setAddUser(false)
                })
        } else {
            props.setAlerts({type:'error', message:"Password dosn`t same"})
        }
    }

    return (
        <div className="add_user_wrap">
            <div className="inputs">
                <TextField
                    className="username"
                    type="text"
                    id="outlined-basic"
                    label="Username"
                    onChange={(event)=>{
                        setNewUser({...newUser, username: event.target.value})
                    }}
                    variant="outlined"/>
                <TextField
                    className="pass"
                    type="password"
                    id="outlined-basic"
                    label="Password"
                    onChange={(event)=>{
                        setNewUser({...newUser, password: event.target.value})
                    }}
                    variant="outlined"/>
                <TextField
                    className="pass"
                    type="password"
                    id="outlined-basic"
                    label="Repeat password"
                    onChange={(event)=>{
                        if(event.target.value == newUser.password){
                            setCreate(true)
                        } else {
                            setCreate(false)
                        }
                    }}
                    variant="outlined"/>
            </div>
            <div className="action">
                <Button className="btn add-btn"
                        variant="contained"
                        color="secondary"
                        onClick={()=>props.setAddUser(false)}
                >Cancel</Button>
                <Button className="btn add-btn"
                        variant="contained"
                        color="primary"
                        onClick={Create}
                >Create</Button>
            </div>
        </div>
    );
};

export default AddUser;