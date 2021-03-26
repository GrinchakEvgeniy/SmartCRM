import React, {useEffect, useState} from 'react';
import {getUser, newNotification, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import './Notifications.scss'
import {
    delNotificationReadFetch,
    getNotificationFetch,
    getUserFetch,
    getUsersFetch,
    readNotificationFetch
} from "../../requests";


const Notifications = (props) => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(10);
    const [users, setUsers] = useState([]);
    const defaultAva = '/static/images/userIcon.svg';

    const update = () => {
        getUsersFetch().then(data => setUsers(data))
        getUserFetch().then(data =>
            getNotificationFetch(data.id)
                .then(data => setNotifications(data)))
    }

    useEffect(() => {
        update()
    }, [props.user_data])

    useEffect(() => {
        if (props.notification) {
            update()
            props.newNotification(false)
        }
    }, [props.notification])

    const findUserItem = (arr, id) => {
        return arr.find(el => el.id === +id)
    }

    const clearAll = () => {
        const ids = []
        for (let el of notifications) {
            ids.push(el.id)
        }
        delNotificationReadFetch(ids).then(() => update())
    }

    const readAll = () => {
        const ids = []
        for (let el of notifications) {
            ids.push(el.id)
        }
        readNotificationFetch(ids).then(() => update())
    }

    return (
        <div className='notifications'>
            <div className="container">
                <div className="btns">
                    <button className='btn clear'
                            onClick={() => {
                                clearAll()
                            }}>clear all
                    </button>
                    <button className='btn read'
                            onClick={() => {
                                readAll()
                            }}>read all
                    </button>
                </div>
                <div className="notifs">
                    {
                        (notifications.length !== 0 && users.length !== 0)
                            ?
                            notifications.slice(0, notificationsCount).map((el, index) => {
                                return <div className="notif"
                                            key={index}
                                            style={
                                                el.on_read
                                                    ?
                                                    {background: "#ffffff"}
                                                    :
                                                    {background: "#b0d6ff"}
                                            }>
                                    <div className="itemNotifFrom">
                                        {findUserItem(users, el.from_notification).first_name}
                                    </div>
                                    <div className="itemNotif">{el.message}</div>
                                    <div className="del"
                                         onClick={() => {
                                             console.log(el.id)
                                             delNotificationReadFetch([el.id]).then(() => {
                                                 update()
                                             })
                                         }}
                                    >&times;
                                    </div>
                                    <div className="createdTime">
                                        <p className='time'>
                                            {el.timestamps.split('.')[0]}
                                        </p>
                                    </div>
                                    <div className="img_user">
                                        <img src={
                                            findUserItem(users, el.from_notification).profile.avatar.image
                                        } alt="ava"/>
                                    </div>
                                </div>
                            })
                            :
                            <div className='noNotif'>No notifications</div>
                    }
                </div>

                {
                    (notifications.length > notificationsCount)
                        ?
                        <div className="btns">
                            <div className="btn" onClick={() => {
                                setNotificationsCount(notificationsCount + 10)
                            }}>
                                show more
                            </div>
                        </div>
                        :
                        ''
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