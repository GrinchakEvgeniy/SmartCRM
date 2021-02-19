import React from 'react';
import './User.scss';

const User = (props) => {
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
            <div className="btn_change_role">Change role</div>
        </div>
    );
};

export default User;