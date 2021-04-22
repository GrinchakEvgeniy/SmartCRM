import React, {useState, useEffect} from 'react';
import './DashBoardHead.scss'
import {connect} from 'react-redux';
import {getUser, setSocket} from "../../redux/actions/actions";
import {getUserFetch} from "../../requests";
import DashBoardHeadUserMenu from "../DashBoardHeadUser/DashBoardHeadUser";
import WorkNow from "../WorkNow/WorkNow";
import WorkTimeToday from "../WorkTimeToday/WorkTimeToday";
import IconWorkNow from "../Icons/IconWorkNow";
import IconWorkPlace from "../Icons/IconWorkPlace";
import CRM_Logo from "../Icons/CRM_Logo";

const DashBoardHead = (props) => {
    const [workNowPopup, setWorkNowPopup] = useState(false);
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [hour, setHour] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [workTimeToday, setWorkTimeToday] = useState(false);
    const [workNowObject, setWorkNowObject] = useState({});
    const [selfEducation, setSelfEducation] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);
                const hourCounter = Math.floor(counter / 60 / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
                const computedHour = String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

                setSecond(computedSecond);
                if (computedMinute === '60') {
                    setMinute('00');
                } else {
                    setMinute(computedMinute);
                }
                setHour(computedHour);

                setCounter(counter => counter + 1);
            }, 1000)
        } else {
            setSecond('00');
            setMinute('00');
            setHour('00');
            setCounter(0);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter])

    useEffect(() => {
        getUserFetch().then(data => {
            props.updateUserData(data)
            props.setSocket(new WebSocket(
                'ws://'
                + window.location.host
                + '/ws/notification/'
                + data.id
                + '/'
            ))
        })
    }, [])

    const [showMenu, setShowMenu] = useState(props.openMenu)
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
                         props.setOpenSideBar(!showMenu)
                         selectWidth()
                     }}>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div className="logo">
                    <CRM_Logo/>
                </div>
                <div className='actionIconsWrap'>
                    <div className="work_now">
                        <div className='icon_wrap' onClick={() => {
                            setWorkNowPopup(!workNowPopup)
                        }}>
                            <IconWorkNow className='work_now_icon'/>
                        </div>
                        {
                            workNowPopup ?
                                <WorkNow time={{'hour': hour, 'minute': minute, 'second': second}}
                                         id='popup'
                                         setIsActive={setIsActive}
                                         isActive={isActive}
                                         workNowObject={workNowObject}
                                         setWorkNowObject={setWorkNowObject}
                                         selfEducation={selfEducation}
                                         setSelfEducation={setSelfEducation}
                                         setWorkNowPopup={setWorkNowPopup}
                                />
                                : ""
                        }
                    </div>
                    <div className="work_time_today">
                        <div className='icon_wrap'
                             onClick={() => setWorkTimeToday(!workTimeToday)}>
                            <IconWorkPlace className="work_time_today_icon"/>
                        </div>
                        {
                            workTimeToday
                                ?
                                <WorkTimeToday setWorkTimeToday={setWorkTimeToday}
                                               user={props.user_data}/>
                                :
                                ""
                        }
                    </div>
                </div>
                <DashBoardHeadUserMenu/>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data))
    }
}
export default connect(putState, putDispatch)(DashBoardHead);