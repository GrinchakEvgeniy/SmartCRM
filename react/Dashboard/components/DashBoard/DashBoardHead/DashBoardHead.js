import React, {useState} from 'react';
import './DashBoardHead.scss'
import DashBoardHeadUserMenu from "../DashBoardHeadUserMenu/DashBoardHeadUserMenu";

const DashBoardHead = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [headWidth, setHeadWidth] = useState(0)
    const selectWidth = () => {
        showMenu
            ?
            setHeadWidth(0)
            :
            setHeadWidth(200)
    }

    return (
        <div className={showMenu ? "dashboard__head_wrap active" : "dashboard__head_wrap"}
             style={{width: "calc(100% - " + headWidth + "px)"}}>
            <div className="dashboard__head">
                <div className="burgerMenu"
                     onClick={() => {
                         setShowMenu(!showMenu)
                         selectWidth()
                     }}>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div className="logo">
                    <img src="/static/images/logo.png" alt="logo"/>
                </div>
                <DashBoardHeadUserMenu/>
            </div>
        </div>
    );
};

export default DashBoardHead;