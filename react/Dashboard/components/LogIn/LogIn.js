import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import login from './login.scss';

const LogIn = () => {
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
                        color="primary">
                    LOG IN
                </Button>
            </form>
        </div>
    );
};

export default LogIn;