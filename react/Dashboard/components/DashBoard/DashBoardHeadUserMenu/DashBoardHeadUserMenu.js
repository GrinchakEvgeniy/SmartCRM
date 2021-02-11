import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from "../../redux/actions/actions";
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import "./DashBoardHeadUserMenu.scss"

const DashBoardHeadUserMenu = (props) => {

    const [openMenu, setOpenMenu] = useState(false)

    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
                    <img src="/static/images/userIcon.svg" alt="ava"/>

                    <div className="userMenu">
                        <div className="userMenuItems">
                            <div className="userMenuItem">
                                <FaceRoundedIcon className="userMenuIcon"/>
                                <h4 className="userMenuIconLabel">Profile</h4>
                            </div>
                            <div className="userMenuItem">
                                <NotificationsRoundedIcon className="userMenuIcon"/>
                                <h4 className="userMenuIconLabel">Notifications</h4>
                            </div>
                            <div className="userMenuItem">
                                <HelpRoundedIcon className="userMenuIcon"/>
                                <h4 className="userMenuIconLabel">Help</h4>
                            </div>
                            <div className="userMenuItem"
                                onClick={()=>{
                                    delete_cookie("userToken")
                                    window.location.reload()
                                }}>
                                <MeetingRoomRoundedIcon className="userMenuIcon"/>
                                <h4 className="userMenuIconLabel">LogOut</h4>
                            </div>
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