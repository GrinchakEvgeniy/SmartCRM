import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import login from './login.scss';

const LogIn = () => {
    const Login = () =>{
        var formData = new FormData();
        formData.append("username", "admin");
        formData.append("password", "admin");
        fetch('api/api-token-auth/', {method: 'POST', body: formData})
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <div className={'login'}>
            <form action={'submit'} className={'login_form'}>
                <TextField className={'login_form_username'}
                           id="outlined-basic"
                           label="Username"
                           variant="outlined"/>
                <TextField className={'login_form_pass'}
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