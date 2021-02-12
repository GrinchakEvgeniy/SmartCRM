import React from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./Profile.scss";

const Profile = (props) => {

    const profileUser = props.user_data.profile
    console.log(profileUser)

    return (
        <div className="profile">
            <div className="container">
                <div className="profileWrap">
                    <div className="profileInfo">
                        <div className="profileInfoItem"><h3>FirstName</h3><p>{props.user_data.first_name}</p></div>
                        <div className="profileInfoItem"><h3>LastName</h3><p>{props.user_data.last_name}</p></div>
                        <div className="profileInfoItem"><h3>Birthday</h3><p>Roman</p></div>
                        <div className="profileInfoItem"><h3>Email</h3><p>{props.user_data.email}</p></div>
                    </div>
                    <div className="profileAva">
                        <img src="" alt="ava"/>
                    </div>
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
export default connect(putState, putDispatch)(Profile);