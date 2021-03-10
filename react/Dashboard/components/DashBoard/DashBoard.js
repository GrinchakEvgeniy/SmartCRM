import React, {useState} from 'react';
import DashBoardHead from "./DashBoardHead/DashBoardHead";
import DashBoardSidebar from "./DashBoardSidebar/DashBoardSidebar";
import Profile from "./Profile/Profile";
import PopUp from "./PopUp/PopUp";
import './DashBoard.scss'
import {Switch, Route} from 'react-router-dom'
import Clients from "./Clients/Clients";
import Projects from "./Projects/Projects";
import Users from "./Users/Users";
import ProjectControl from "./ProjectControl/ProjectControl";
import Notifications from "./Notifications/Notifications";
import Events from "./Events/Events";
import ProjectsTime from "./ProjectsTime/ProjectsTime";
import Info from "./Info/Info";

const DashBoard = () => {

    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpOptions, setPopUpOptions] = useState('')
    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div>
            <div className={openSideBar ? "dashboard__wrap active" : "dashboard__wrap"}>
                <DashBoardHead openMenu={openSideBar} setOpenSideBar={setOpenSideBar}/>
                <DashBoardSidebar openSidebar={openSideBar}/>
                <Switch>
                    <Route path='/dashboard/clients' component={()=>{return <Clients/>}}/>
                    <Route path='/dashboard/notifications' component={()=>{return <Notifications/>}}/>
                    <Route path='/dashboard/events' component={()=>{return <Events/>}}/>
                    <Route path='/dashboard/users' component={()=>{return <Users/>}}/>
                    <Route path='/dashboard/projects-time' component={()=>{return <ProjectsTime/>}}/>
                    <Route path='/dashboard/projects' component={()=>{return <Projects showPopUp={showPopUp}
                                                                                       setShowPopUp={setShowPopUp}
                                                                                       setPopUpOptions={setPopUpOptions}/>}}/>
                    <Route path='/dashboard/profile' component={()=>{return <Profile showPopUp={showPopUp}
                                                                                     setShowPopUp={setShowPopUp}
                                                                                     setPopUpOptions={setPopUpOptions}/>}}/>
                    <Route path='/dashboard/project/:id' component={()=>{return <ProjectControl/>}}/>
                    <Route path='/dashboard/info' component={()=>{return <Info/>}}/>
                </Switch>
                <PopUp showPopUp={showPopUp}
                       setShowPopUp={setShowPopUp}
                       popUpOptions={popUpOptions}/>
            </div>
        </div>
    );
};

export default DashBoard;