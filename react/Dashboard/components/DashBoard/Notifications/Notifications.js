import   React, {useEffect, useState} from 'react';
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import './Notifications.scss'
import Button from "@material-ui/core/Button";
import {getUserFetch} from "../../requests";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function getNotificationFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-notification', options);
    const result = await response.json();
    return result;
}

async function putNotificationReadFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-notification-read', options);
    const result = await response.json();
    return result;
}

const Notifications = (props) => {
    const [notifications, setNotifications] = useState([]);
    const [readInfo, setReadInfo] = useState([]);

   const click = () => {

       props.web_socket.send(JSON.stringify({
           'message': "New",
           'type_notification': "group",
           'from_notification': "1",
           'for_notification': "D",
       }));
   }
   const onRead = () => {
       const ids = [];
        readInfo.forEach(value=>{
            ids.push(value.id)
        })
        putNotificationReadFetch({'ids':ids, 'action':'readed'})
   }

    useEffect(()=>{
        props.newNotification(false);
        onRead();
    }, [])

    useEffect(()=>{
        props.newNotification(false);
        getUserFetch()
            .then(data=>{
                props.updateUserData(data);
            })
    }, [props.notification]);

    const init = () => {
       if(props.user_data.notification_read){
            const ids = [];
            props.user_data.notification_read.forEach(value=>{
                ids.push(value.notification_id)
            })
            setReadInfo(props.user_data.notification_read)
            getNotificationFetch({'ids':ids})
                .then(data=>{
                    setNotifications(data)
                })
        }
    }


    useEffect(()=>{
        init()
        onRead();
    }, [props.user_data]);

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
                {
                    notifications.map((value_notif, index)=>{
                        let readed = false;
                        readInfo.forEach((value)=>{
                            if(value_notif.id == value.notification_id){
                                readed = value.on_read;
                            }
                        });
                        return (
                                    <div key={index} className={readed?"notification":"notification not_readed"}>
                                        <div className="from">{value_notif.from_notification}</div>
                                        <div className="message">{value_notif.message}</div>
                                        <div className="type">{value_notif.type_notification}</div>
                                    </div>
                                )
                    })
                }
            </div>
        </div>
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
export default connect(putState, putDispatch)(Notifications);