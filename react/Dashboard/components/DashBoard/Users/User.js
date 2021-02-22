import React from 'react';
import './User.scss';
import {changeUserRoleFetch, updateUserFetch} from "../../requests";

const User = (props) => {

    const changeRole = (event) => {
        if(event.target.classList[0] == 'btn_change_role'){
            let child = event.target.querySelector('.select_role_wrap');
            if(child.classList[1] == 'active'){
                child.classList.remove('active');
            } else {
                child.classList.add('active');
            }
        }
    }

    const Change = (id) => {
        changeUserRoleFetch({profile_id:props.value.profile.id, role_id:id})
            .then(data=>{
                console.log(data)
            })
    }

    return (
        <div className="item" >
            <div className="avatar"><img src={props.value.profile.avatar.image} alt=""/></div>
            <div className="info">
                <div className="full_name">{props.value.first_name + " " + props.value.last_name}</div>
                <div className="position"><p>{props.value.profile.position}</p></div>
            </div>
            <div className="now_role">
                {props.value.profile.role_id.value}
            </div>
            <div className="btn_change_role" onClick={(event)=>changeRole(event)}>
                Change role
                <div className="select_role_wrap">
                    {
                        props.roles.map((value, index)=>{
                            return (
                                <div className="select" onClick={()=>Change(value.id)} key={index}>{value.value}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default User;