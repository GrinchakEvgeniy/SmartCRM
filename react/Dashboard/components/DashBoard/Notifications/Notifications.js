import React, {useEffect} from 'react';
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import './Notifications.scss'
import Button from "@material-ui/core/Button";

const Notifications = (props) => {
   const click = () => {

       props.web_socket.send(JSON.stringify({
           'message': "HI",
           'type_notification': "group",
           'from_notification': "1",
           'for_notification': "D",
       }));
   }
   useEffect(()=>{
       if(props.web_socket) {
           props.web_socket.onmessage = function (e) {
               const data = JSON.parse(e.data);
               console.log(data)
           };
       }
   }, [props.web_socket])

    return (
        <div className="container">
            <div className="clear_btn">
                <Button variant="contained"
                            className="btn btn-new"
                            color="primary"
                        onClick={click}
                        >
                        Clear all
                    </Button>
            </div>
            <div className="wrap_notifications">
                <div className="notification not_readed">
                    <div className="from">System</div>
                    <div className="message">Hello</div>
                    <div className="type">system</div>
                </div>
                <div className="notification not_readed">
                    <div className="from">Nikolay</div>
                    <div className="message">Nice day</div>
                    <div className="type">All</div>
                </div>
                <div className="notification">
                    <div className="from">Tolya</div>
                    <div className="message">Come here</div>
                    <div className="type">user</div>
                </div>
                <div className="notification">
                    <div className="from">Events</div>
                    <div className="message">Happy birthday</div>
                    <div className="type">User</div>
                </div>
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
export default connect(putState, putDispatch)(Notifications);