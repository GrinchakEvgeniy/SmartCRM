import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import './Talk.scss'
import {createProjectMessageFetch} from "../../requests";
import {isEmpty} from "../../helper";

const Talk = (props) => {

    const [projectId, setProjectId] = useState()
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentUserName, setCurrentUserName] = useState('')
    const [message, setMessage] = useState('')
    const [projectComments, setProjectComments] = useState([])

    useEffect(() => {
        setCurrentUserId(props.userId)
        setCurrentUserName(props.currentUserName)
    }, [props])

    useEffect(() => {
        if (!isEmpty(props.project)) {
            setProjectId(props.project.id)
            setProjectComments(props.project.project_comment)
        }
    }, [props.project]);

    const newMessage = () => {
        let newMess = {}
        newMess.project_id = projectId
        newMess.user_id = currentUserId
        newMess.description = message
        createProjectMessageFetch(newMess).then(data => console.log(data))
        props.update()
    }


    console.log(props)

    return (
        <div className="talk">
            <div className="tweets">
                <div className="tweetsWrap">

                    {
                        projectComments.map((el, index) => {
                            return (
                                <div className={el.user_id === currentUserId ? 'message my' : "message"} key={index}>
                                    <h4 className="authorName">{currentUserName}</h4>
                                    <p>{el.description}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
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
                             console.log('id', currentUserId)
                             console.log('message', message)
                             console.log('project', props.project)
                             console.log('project id', props.project.id)
                             console.log('project mess from props', projectComments)
                             newMessage()
                             document.getElementById('message').value = ''
                         }}>
                        <SendIcon className='icon'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Talk;