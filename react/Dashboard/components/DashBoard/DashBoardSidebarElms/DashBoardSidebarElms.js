import React, {useEffect, useState} from 'react';
import "./DashBoardSidebarElms.scss";
import {Link, NavLink} from "react-router-dom";
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";


const DashBoardSidebarElms = (props) => {

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (props.web_socket) {
            props.web_socket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                Notification.requestPermission(function (permission) {
                    // Если пользователь разрешил, то создаем уведомление
                    if (permission === "granted") {
                        let options = {
                            sound: '/media/Goat.mp3',
                            silent: false
                        };
                        let notification = new Notification("Hi there!", options);
                    }
                });
                const audio = new Audio('/media/Goat.mp3');
                audio.play();
                props.newNotification(true);
            };
        }
    }, [props.web_socket]);

    return (
        <NavLink to={props.link}
                 className={props.notificationRole ? props.notification ? "elem new" : "elem" : "elem"}>
            <div className="elemWrap">
                <div className="icon">
                    {props.icon}
                </div>
                <div className="label">
                    <h4>{props.label}</h4>
                </div>
            </div>
        </NavLink>
    );
};
const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket,
        notification: state.notification
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data)),
        newNotification: (data) => dispatch(newNotification(data))
    }
}
export default connect(putState, putDispatch)(DashBoardSidebarElms);