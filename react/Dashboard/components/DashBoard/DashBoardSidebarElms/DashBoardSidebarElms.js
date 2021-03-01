import React, {useEffect} from 'react';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import "./DashBoardSidebarElms.scss";
import {Link} from "react-router-dom";
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";

const DashBoardSidebarElms = (props) => {
    useEffect(()=>{
        if(props.web_socket) {
           props.web_socket.onmessage = function (e) {
               const data = JSON.parse(e.data);
               Notification.requestPermission(function (permission) {
                   // Если пользователь разрешил, то создаем уведомление
                   if (permission === "granted") {
                       var options = {
                           sound: '/media/Goat.mp3',
                           silent: false
                       };
                       var notification = new Notification("Hi there!", options);
                   }
               });
               const audio = new Audio('/media/Goat.mp3');
               audio.play();
               props.newNotification(true);
           };
       }
    }, [props.web_socket]);
    return (
        <Link to={props.link} className={props.notificationRole ?  props.notification ? "elem new" : "elem" : "elem"}>
            <div className="elemWrap">
                <div className="icon">
                    {props.icon}
                    {/*<CodeRoundedIcon/>*/}
                </div>
                <div className="label">
                    <h4>{props.label}</h4>
                </div>
            </div>
        </Link>
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