import React, {useState} from 'react';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import "./DashBoardHeadUserMenu.scss"

const DashBoardHeadUserMenu = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className="dashBoardUser">
            <div className="userMenu">
                <h3>Hello ...</h3>
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
                            <div className="userMenuItem">
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

export default DashBoardHeadUserMenu;