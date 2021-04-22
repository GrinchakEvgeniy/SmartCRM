import React, {useState, useEffect} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./Profile.scss";
import {isEmpty} from "../../helper";
import PersonalInfoProfile from "./ProfileInfo";
import {getUserFetch, putAvatarFetch} from "../../requests";
import Button from "@material-ui/core/Button";
import AutorenewIcon from '@material-ui/icons/Autorenew';

const Profile = (props) => {

    const [avatar, setAvatar] = useState('');
    const defaultAva = '/static/images/userIcon.svg';

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.avatar.length === 0) return;
            setAvatar(props.user_data.profile.avatar.image)
        }
    }, [props.user_data]);

    return (
        <div className="profile">
            <div className="container">
                <div className="profileWrap">
                    <div className="personalInfo">
                        <div className="AvaWrap">
                            <div className="Ava">
                                <img src={avatar ? avatar : defaultAva} alt="ava"/>
                            </div>
                            <Button className="changeAva"
                                    variant="contained"
                                    onChange={(event) => {
                                        putAvatarFetch(props.user_data.profile.avatar.id, event.target.files)
                                            .then(() => {
                                                getUserFetch()
                                                    .then(data => props.updateUserData(data))
                                            })
                                    }}
                                    component="label">
                                <AutorenewIcon/>
                                <input type="file" hidden/>
                            </Button>
                        </div>
                        <PersonalInfoProfile/>
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