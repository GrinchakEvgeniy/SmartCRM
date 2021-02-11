import React, {useState, useEffect} from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";

const DashBoardSidebar = (props) => {

    const openSideBarStyle = {
        width: "198px",
    }
    const closeSideBarStyle = {
        width: "64px",
    }

    return (
        <div className="dashBoardSidebar__wrap"
             style={
                 props.openSidebar
                     ?
                     openSideBarStyle
                     :
                     closeSideBarStyle}>
            <div className="dashBoardSidebar">
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
                <DashBoardSidebarElms/>
            </div>
        </div>
    );
};

export default DashBoardSidebar;