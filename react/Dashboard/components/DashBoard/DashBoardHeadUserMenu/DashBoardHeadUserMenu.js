import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from "../../redux/actions/actions";
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import "./DashBoardHeadUserMenu.scss"
import {Link} from "react-router-dom";
import {isEmpty} from "../../helper";

const DashBoardHeadUserMenu = (props) => {

    const [openMenu, setOpenMenu] = useState(false)
    const [avatar, setAvatar] = useState('')
    const defaultAva = '/static/images/userIcon.svg';

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.avatar.length === 0) return;
            setAvatar(props.user_data.profile.avatar.image)
        }
    }, [props.user_data]);

    function delete_cookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.replace("/");
    }

    return (
        <div className="dashBoardUser">
            <div className="userMenu">
                <h3>Hello {props.user_data.first_name
                    ?
                    props.user_data.first_name
                    :
                    "User"}
                </h3>
                <div className={openMenu ? "userAva active" : "userAva"}
                     onClick={() => {
                         setOpenMenu(!openMenu)
                     }}>

                    <div className='imgWrap'>
                        <img src={avatar ? avatar : defaultAva} alt="ava"/>
                    </div>

                    <div className="userMenu">
                        <div className="userMenuItems">
                            <Link to={'/dashboard/profile'} className="link">
                                <div className="userMenuItem">
                                    <FaceRoundedIcon className="userMenuIcon"/>
                                    <h4 className="userMenuIconLabel">Profile</h4>
                                </div>
                            </Link>
                            <Link to={'/dashboard'} className="link">
                                <div className="userMenuItem">
                                    <NotificationsRoundedIcon className="userMenuIcon"/>
                                    <h4 className="userMenuIconLabel">Notifications</h4>
                                </div>
                            </Link>
                            <Link to={'/login'} className="link">
                                <div className="userMenuItem"
                                     onClick={() => {
                                         delete_cookie("userToken")
                                     }}>
                                    <MeetingRoomRoundedIcon className="userMenuIcon"/>
                                    <h4 className="userMenuIconLabel">LogOut</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
    }
}
export default connect(putState, putDispatch)(DashBoardHeadUserMenu);