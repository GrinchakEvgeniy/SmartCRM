import React, {useState, useEffect} from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";

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
                <DashBoardSidebarElms
                    label={"Contacts"}
                    link={'/dashboard/clients'}
                    icon={<CodeRoundedIcon/>}/>
                <DashBoardSidebarElms
                    label={"Projects"}
                    link={'/dashboard/projects'}
                    icon={<CodeRoundedIcon/>}/>
            </div>
        </div>
    );
};

export default DashBoardSidebar;

'https://material-ui.com/ru/components/material-icons/'