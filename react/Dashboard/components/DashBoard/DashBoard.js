import React, {useState} from 'react';
import DashBoardHead from "./DashBoardHead/DashBoardHead";
import DashBoardSidebar from "./DashBoardSidebar/DashBoardSidebar";
import Profile from "./Profile/Profile";
import PopUp from "./PopUp/PopUp";
import './DashBoard.scss'

const DashBoard = () => {

    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpOptions, setPopUpOptions] = useState('')
    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div>
            <div className={openSideBar ? "dashboard__wrap active" : "dashboard__wrap"}>
                <DashBoardHead openMenu={openSideBar} setOpenSideBar={setOpenSideBar}/>
                <DashBoardSidebar openSidebar={openSideBar}/>
                <Profile showPopUp={showPopUp} setShowPopUp={setShowPopUp}
                         setPopUpOptions={setPopUpOptions}/>
                <PopUp showPopUp={showPopUp}
                       setShowPopUp={setShowPopUp}
                       popUpOptions={popUpOptions}/>
            </div>
        </div>
    );
};

export default DashBoard;