import React, {useState, useEffect} from 'react';
import './DashBoardSidebar.scss'
import DashBoardSidebarElms from "../DashBoardSidebarElms/DashBoardSidebarElms";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EventIcon from '@material-ui/icons/Event';

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
                    label={"Notifications"}
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
            </div>
        </div>
    );
};

export default DashBoardSidebar;

// 'https://material-ui.com/ru/components/material-icons/'