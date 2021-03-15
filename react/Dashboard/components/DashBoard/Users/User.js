import React, {useState} from 'react';
import './User.scss';
import Button from "@material-ui/core/Button";
import {changeUserRoleFetch, deleteUserFetch} from "../../requests";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const User = (props) => {
    const [nowUser, setNowUser] = useState(false);
    const defaultAva = '/static/images/userIcon.svg';

    // console.log(props)

    // function getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    const roleColor = (role) => {
        let color
        switch (role) {
            case 'S':
                color = '#fffaa4'
                break;
            case 'G':
                color = '#ffe7d7'
                break;
            case 'Drt':
                color = '#d2edff'
                break;
            default:
                color = '#e4e4e4';
        }
        return color;
    }

    const changeRole = (event) => {

        let elems = document.querySelectorAll('.select_role_wrap')
        elems.forEach(el => el.classList.remove('active'))

        if (event.target.classList[0] === 'btn_change_role') {
            let child = event.target.querySelector('.select_role_wrap');
            if (child.classList[1] === 'active') {
                child.classList.remove('active');
            } else {
                child.classList.add('active');
            }
        }
    }

    const Change = (id) => {
        if (props.user_data.id === props.value.id) {
            // console.log(12)
            props.setAlerts({type: "warning", message: "You don`t can change your role"});
            let popups = document.getElementsByClassName('select_role_wrap');
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.remove('active');
            }
            return false;
        }
        changeUserRoleFetch({profile_id: props.value.profile.id, role_id: id})
            .then(data => {
                let popups = document.getElementsByClassName('select_role_wrap');
                for (let i = 0; i < popups.length; i++) {
                    popups[i].classList.remove('active');
                }
                props.setAlerts({type: "success", message: data.message});
            })
    }

    const Delete = (id) => {
        if (props.user_data.id === id) {
            props.setAlerts({type: "warning", message: "You don`t can delete yourself"});
            return false;
        }
        deleteUserFetch({id: id})
            .then(data => {
                props.setAlerts({type: "success", message: data.message})
            })
    }

    return (
        <div className="item">
            <div className="avatar">
                <div className='imgWrap'>
                    <img src={
                        props.value.profile.avatar.image
                            ?
                            props.value.profile.avatar.image
                            :
                            defaultAva
                    } alt="ava"/>
                </div>
            </div>
            <div className="info">
                <div className="full_name">{props.value.first_name + " " + props.value.last_name}</div>
                <div className="position"><p>{props.value.profile.position}</p></div>
                <div className='roleWrap'>
                    <div className="now_role"
                        // style={{background: getRandomColor()}}
                         style={{background: roleColor(props.value.profile.role_id.value)}}
                    >
                        {props.value.profile.role_id.value}
                    </div>
                    <div className='btn_change_roleWrap'>
                        <div className="btn_change_role"
                             onClick={
                                 (event) => {
                                     changeRole(event)
                                 }}>
                            &#9998;
                            <div className="select_role_wrap">
                                {
                                    props.roles.map((value, index) => {
                                        return (
                                            <div className="select" onClick={() => Change(value.id)}
                                                 key={index}>{value.value}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='delete-btnWrap'>
                <div className="delete-btn"
                     onClick={() => {
                         Delete(props.value.id)
                     }}>
                    &times;
                    <span className='itemBtn title'>del user</span>
                </div>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(User);