import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import './Login.scss';
import {getToken} from "../requests";

const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');

    const Login = () => {
        getToken({username: username, password: password})
            .then(data => {
                if (data.token) {
                    document.cookie = "userToken=" + data.token;
                    window.location.href = '/dashboard'
                } else if (data.non_field_errors) {
                    setWarning(data.non_field_errors[0])
                }
            })
    }

    return (
        <div className={'login__wrap'}>
            <div className={'login'}>
                <form action={'submit'} className={'login_form'} autoComplete="off">
                    <input className='login_form_username'
                           placeholder='ligin'
                           autoComplete='off'
                           onChange={(event) => setUsername(event.target.value)}
                           id="outlined"/>
                    <input className='login_form_pass'
                           placeholder='password'
                           autoComplete='off'
                           type="password"
                           onChange={(event) => setPassword(event.target.value)}
                           id="basic"/>
                    <Button variant="contained"
                            className="login_form_btn"
                            onClick={Login}>
                        LOG IN
                    </Button>
                </form>
                <p className='warning'>{warning}</p>
            </div>
        </div>
    );
};

export default LogIn;