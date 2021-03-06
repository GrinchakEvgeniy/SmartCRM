import React, {useEffect, useState} from 'react';
import {getUsersFetch} from "../../requests";
import './UsersAll.scss'

const UsersAll = (props) => {

    const [users, setUsers] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const defaultAva = '/static/images/userIcon.svg';

    useEffect(() => {
        getUsersFetch()
            .then(data => setUsers(data));
    }, [])

    const userCheck = (event) => {
        let result = userIds.slice()
        if (event.target.closest('.user_check_wrap').dataset.check === "true") {
            result.push(event.target.closest('.user_check_wrap').dataset.id)
        } else {
            result = userIds.filter(el => el !== event.target.closest('.user_check_wrap').dataset.id);
        }
        setUserIds(result);
        props.setCheckedUsers(result)
    }

    return (
        <div className={props.className === "undefined" ? "usersAll" : ("usersAll" + " " + props.className)}>
            <div className="usersAllWrap">
                {
                    users.map((value, index) => {
                        return (
                            <div className="user_check_wrap"
                                 data-id={value.id}
                                 data-check={false}
                                 key={index}
                                 onClick={(event) => {
                                     let elem = event.target.closest('.user_check_wrap')
                                     elem.dataset.check === 'false'
                                         ?
                                         (elem.dataset.check = "true", elem.style.background = "rgba(237,201,57,0.5)")
                                         :
                                         (elem.dataset.check = "false", elem.style.background = "#f7f7f7")
                                     userCheck(event)
                                 }}>
                                <div className="img_user">
                                    <img src={value.profile.avatar.image
                                        ?
                                        value.profile.avatar.image
                                        :
                                        defaultAva} alt="ava"/>
                                </div>
                                <div className="name_user">
                                    <p>{value.first_name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UsersAll;