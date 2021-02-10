import React from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";

const DashBoardSidebar = () => {
    return (
        <div className="dashBoardSidebar__wrap">
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