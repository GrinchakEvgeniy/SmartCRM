import React, {useState, useEffect} from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import EventIcon from '@material-ui/icons/Event';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

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
            <audio id="myAudio" src="/media/Goat.mp3"
                   playsInline={true} muted="muted"> </audio>
            <div className="dashBoardSidebar">
                <DashBoardSidebarElms
                    label={"Notifications"}
                    notificationRole={true}
                    link={'/dashboard/notifications'}
                    icon={<NotificationsIcon/>}/>
                <DashBoardSidebarElms
                    label={"Events"}
                    link={'/dashboard/events'}
                    icon={<EventIcon/>}/>
                <DashBoardSidebarElms
                    label={"Clients"}
                    link={'/dashboard/clients'}
                    icon={<ContactMailIcon/>}/>
                <DashBoardSidebarElms
                    label={"Projects"}
                    link={'/dashboard/projects'}
                    icon={<AccountTreeIcon/>}/>
                <DashBoardSidebarElms
                    label={"Users"}
                    link={'/dashboard/users'}
                    icon={<PeopleAltIcon/>}/>
                <DashBoardSidebarElms
                    label={"Projects Time"}
                    link={'/dashboard/projects-time'}
                    icon={<TimelapseIcon/>}/>
                <DashBoardSidebarElms
                    label={"Users Time"}
                    link={'/dashboard/users-time'}
                    icon={<AssignmentIndIcon/>}/>
                <DashBoardSidebarElms
                    label={"Salary"}
                    link={'/dashboard/salary'}
                    icon={<MonetizationOnIcon/>}/>
                <DashBoardSidebarElms
                    label={"Info"}
                    link={'/dashboard/info'}
                    icon={<InfoOutlinedIcon/>}/>
            </div>
        </div>
    );
};

export default DashBoardSidebar;

// 'https://material-ui.com/ru/components/material-icons/'