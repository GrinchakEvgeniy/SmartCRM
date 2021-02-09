import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import login from './login.scss';
import {getToken} from "../requests";

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Login = () =>{
        getToken({username:username, password:password})
            .then(data=>{
                document.cookie = "userToken="+data.token;
                console.log(document.cookie)
                // window.location.href = '/dashboard'
            })
    }

    return (
        <div className={'login'}>
            <form action={'submit'} className={'login_form'}>
                <TextField className={'login_form_username'}
                           onChange={(event)=>setUsername(event.target.value)}
                           id="outlined-basic"
                           label="Username"
                           variant="outlined"/>
                <TextField className={'login_form_pass'}
                           onChange={(event)=>setPassword(event.target.value)}
                           id="outlined-basic"
                           label="Password"
                           variant="outlined"/>
                <Button variant="contained"
                        className="login_form_btn"
                        onClick={Login}
                        color="primary">
                    LOG IN
                </Button>
            </form>
        </div>
    );
};

export default LogIn;