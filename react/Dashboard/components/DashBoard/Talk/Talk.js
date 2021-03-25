import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import './Talk.scss'
import {createProjectMessageFetch, getUsersFetch} from "../../requests";
import {isEmpty} from "../../helper";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";

const Talk = (props) => {

    const [projectId, setProjectId] = useState()
    const [projectName, setProjectName] = useState()
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentUserName, setCurrentUserName] = useState('')
    const [message, setMessage] = useState('')
    const [projectComments, setProjectComments] = useState([])
    const [users, setUsers] = useState([])
    const [attachUsers, setAttachUsers] = useState('')

    useEffect(() => {
        getUsersFetch()
            .then(data => setUsers(data));
    }, [])

    useEffect(() => {
        setCurrentUserId(props.userId)
        setCurrentUserName(props.currentUserName)
    }, [props])

    useEffect(() => {
        if (!isEmpty(props.project)) {
            setProjectId(props.project.id)
            setProjectName(props.project.name)
            setProjectComments(props.project.project_comment)
            setAttachUsers(props.project.users_list)
        }
    }, [props.project]);

    const newMessage = () => {
        let newMess = {}
        newMess.project_id = projectId
        newMess.user_id = currentUserId
        newMess.description = message
        createProjectMessageFetch(newMess).then(data => console.log(data))
        props.update()
        for (let el of attachUsers.split(',')) {
            props.web_socket.send(JSON.stringify({
                'message': `New message in project ${projectName}`,
                'type_notification': "user",
                'from_notification': currentUserId,
                'for_notification': el,
            }));
        }
    }

    return (
        <div className="talk">
            <div className="tweets">
                <div className="tweetsWrap">
                    {
                        projectComments.map((el, index) => {
                            let searchUser = ''
                            if (users.length !== 0) {
                                searchUser = users.find(user => user.id === el.user_id).first_name
                            }
                            return (
                                <div className={el.user_id === currentUserId ? 'message my' : "message"} key={index}>
                                    <h4 className="authorName">{searchUser}</h4>
                                    <p>{el.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                (attachUsers.split(',').indexOf(String(currentUserId)) !== -1)
                    ?
                    <div className="createTweet">
                        <TextField className='inputField'
                                   id="message"
                                   label="Message"
                                   fullWidth
                                   multiline
                                   rows={5}
                                   rowsMax={5}
                                   defaultValue=""
                                   variant="outlined"
                                   onChange={() => {
                                       setMessage(document.getElementById('message').value)
                                   }}
                        />
                        <div className="sendIcon">
                            <div className='sendIconWrap'
                                 onClick={() => {
                                     newMessage()
                                     document.getElementById('message').value = ''
                                 }}>
                                <SendIcon className='icon'/>
                            </div>
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket,
    }
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(Talk);