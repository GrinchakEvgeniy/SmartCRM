import React, {useState, useEffect} from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";
import IconNotificaions from "../Icons/IconNotificaions";
import IconCalendar from "../Icons/IconCalendar";
import IconClients from "../Icons/IconClients";
import IconProjects from "../Icons/IconProjects";
import IconUsers from "../Icons/IconUsers";
import IconProjectsTime from "../Icons/IconProjectsTime";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconUsersTime from "../Icons/IconUsersTime";
import IconSalary from "../Icons/IconSalary";
import IconInfo from "../Icons/IconInfo";
import ExitIcon from "../Icons/ExitIcon";
import {NavLink} from "react-router-dom";

function ExitToAppIcon() {
    return null;
}

const DashBoardSidebar = (props) => {

    const openSideBarStyle = {
        width: "198px",
    }
    const closeSideBarStyle = {
        width: "64px",
    }

    function delete_cookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.replace("/");
    }

    return (
        <div className="dashBoardSidebar__wrap"
             style={
                 props.openSidebar
                     ?
                     openSideBarStyle
                     :
                     closeSideBarStyle}>
            <audio id="myAudio" src="/media/Goat.mp3"
                   playsInline={true} muted="muted"> </audio>
            <div className="dashBoardSidebar">
                <DashBoardSidebarElms
                    label={"Notifications"}
                    notificationRole={true}
                    link={'/dashboard/notifications'}
                    icon={<IconNotificaions/>}/>
                <DashBoardSidebarElms
                    label={"My Profile"}
                    link={'/dashboard/profile'}
                    icon={<AccountCircleIcon/>}/>
                <DashBoardSidebarElms
                    label={"Events"}
                    link={'/dashboard/events'}
                    icon={<IconCalendar/>}/>
                <DashBoardSidebarElms
                    label={"Clients"}
                    link={'/dashboard/clients'}
                    icon={<IconClients/>}/>
                <DashBoardSidebarElms
                    label={"Projects"}
                    link={'/dashboard/projects'}
                    icon={<IconProjects/>}/>
                <DashBoardSidebarElms
                    label={"Users"}
                    link={'/dashboard/users'}
                    icon={<IconUsers/>}/>
                <DashBoardSidebarElms
                    label={"Projects Time"}
                    link={'/dashboard/projects-time'}
                    icon={<IconProjectsTime/>}/>
                <DashBoardSidebarElms
                    label={"Users Time"}
                    link={'/dashboard/users-time'}
                    icon={<IconUsersTime/>}/>
                <DashBoardSidebarElms
                    label={"Salary"}
                    link={'/dashboard/salary'}
                    icon={<IconSalary/>}/>
                <DashBoardSidebarElms
                    label={"Info"}
                    link={'/dashboard/info'}
                    icon={<IconInfo/>}/>
                <NavLink to={'/login'} className="elem">
                    <div className="elemWrap"
                         onClick={() => {
                             delete_cookie("userToken")
                         }}>
                        <div className="icon">
                            <ExitIcon/>
                        </div>
                        <h4 className="label">LogOut</h4>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default DashBoardSidebar;

// 'https://material-ui.com/ru/components/material-icons/'