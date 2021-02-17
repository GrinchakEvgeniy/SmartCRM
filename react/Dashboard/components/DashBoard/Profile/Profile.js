import React, {useState, useEffect} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import "./Profile.scss";
import {isEmpty} from "../../helper";
import PersonalInfoProfile from "../PersonalInfoProfile/PersonalInfoProfile";
import FamilyInfoProfile from "../FamilyInfoProfile/FamilyInfoProfile";
import {getUserFetch, putAvatarFetch} from "../../requests";

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
                        <Fab color="primary"
                             aria-label="edit"
                             className="editBtn"
                             onClick={() => {
                                 props.setPopUpOptions('PersonalInfoProfile')
                                 props.setShowPopUp(true)
                             }}>
                            <EditIcon/>
                        </Fab>
                        <PersonalInfoProfile/>
                        <div className="AvaWrap">
                            <div className="Ava">
                                <img src={avatar ? avatar : defaultAva} alt="ava"/>
                            </div>
                            <input type="file"
                                   className="changeAva"
                                   onChange={(event) => {
                                       putAvatarFetch(props.user_data.profile.avatar.id, event.target.files).then((data) => {
                                           console.log(data)
                                       }).then(() => {
                                           getUserFetch().then(data => props.updateUserData(data))
                                       })

                                   }}/>

                        </div>
                    </div>
                    <div className="familyInfo">
                        <Fab color="primary"
                             aria-label="edit"
                             className="editBtn"
                             onClick={() => {
                                 props.setPopUpOptions('FamilyInfoProfile')
                                 props.setShowPopUp(true)
                             }}>
                            <EditIcon/>
                        </Fab>
                        <FamilyInfoProfile/>
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