import React, {useState} from 'react';
import './DashBoard.scss'
import DashBoardHead from "./DashBoardHead/DashBoardHead";
import DashBoardSidebar from "./DashBoardSidebar/DashBoardSidebar";
import Profile from "./Profile/Profile";

const DashBoard = () => {

    const [openSideBar, setOpenSideBar] = useState(false)
    const updateOpenMenu = (val) => {
        setOpenSideBar(val)
    }


    return (
        <div>
            <div className={openSideBar ? "dashboard__wrap active" : "dashboard__wrap"}>
                <DashBoardHead openMenu={openSideBar} update={updateOpenMenu} />
                <DashBoardSidebar openSidebar={openSideBar}/>
                <Profile/>
            </div>
        </div>
    );
};

export default DashBoard;