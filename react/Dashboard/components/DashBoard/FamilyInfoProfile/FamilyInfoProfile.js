import React, {useEffect, useState} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./FamilyInfoProfile.scss"
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {isEmpty} from "../../helper";
import {updateUserFetch} from "../../requests";

const FamilyInfoProfile = (props) => {

    const [position, setPosition] = useState('')
    const [experience, setExperience] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [gitHub, setGitHub] = useState('')
    const [telNumber1, setTelNumber1] = useState('')
    const [telNumber2, setTelNumber2] = useState('')
    const [children, setChildren] = useState([])

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            setPosition(props.user_data.profile.position)
            setExperience(props.user_data.profile.experience)
            setLinkedIn(props.user_data.profile.linkedin)
            setGitHub(props.user_data.profile.github)
            setTelNumber1(props.user_data.profile.tel_1)
            setTelNumber2(props.user_data.profile.tel_2)
            setChildren(props.user_data.profile.children)
        }
    }, [props.user_data]);

    const updateState = () => {
        const newState = JSON.parse(JSON.stringify(props.user_data))
        newState.profile.position = position;
        newState.profile.experience = experience;
        newState.profile.linkedin = linkedIn;
        newState.profile.github = gitHub;
        newState.profile.tel_1 = telNumber1;
        newState.profile.tel_2 = telNumber2;
        newState.profile.children[0] = children[0];
        newState.profile.children[1] = children[1];
        newState.profile.children[2] = children[2];
        updateUserFetch(newState).then(data => {
            props.updateUserData(data)
        })
    }

    return (
        <div className="info">
            <div className="infoItem"><h3>Position</h3><p>{position}</p></div>
            <div className="infoItem"><h3>Experience</h3><p>{experience}</p></div>
            <div className="infoItem"><h3>LinkedIn</h3><p>{linkedIn}</p></div>
            <div className="infoItem"><h3>GitHub</h3><p>https://github.com</p></div>
            <div className="infoItem"><h3>TelNumber1</h3><p>+380987654321</p></div>
            <div className="infoItem"><h3>TelNumber2</h3><p>+380123456789</p></div>
            <div className="infoItem">
                <h3>Children</h3>
                {children.map((el, index) => {
                    return <p key={index}>{el}</p>
                })}
            </div>


            <div className="infoItem edit"><h3>Position</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setPosition(event.target.value)
                           }}
                           variant="outlined"
                           placeholder={position}/></div>
            <div className="infoItem edit"><h3>Experience</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setExperience(event.target.value)
                           }}
                           variant="outlined"
                           placeholder={experience}/></div>
            <div className="infoItem edit"><h3>LinkedIn</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setLinkedIn(event.target.value)
                           }}
                           variant="outlined"
                           pl={linkedIn}/></div>
            <div className="infoItem edit"><h3>GitHub</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setGitHub(event.target.value)
                           }}
                           variant="outlined"
                           defaultValue={gitHub}/></div>
            <div className="infoItem edit"><h3>TelNumber</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setTelNumber1(event.target.value)
                           }}
                           variant="outlined"
                           defaultValue={telNumber1}/></div>
            <div className="infoItem edit"><h3>TelNumber</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setTelNumber2(event.target.value)
                           }}
                           variant="outlined"
                           defaultValue={telNumber2}/></div>
            <div className="infoItem edit child"><h3>Children</h3>
                <TextField className="editField"
                           id="child1"
                           onBlur={(event) => {
                               let newArr = children
                               newArr[0]=event.target.value
                               setChildren(newArr)
                           }}
                           variant="outlined"
                           defaultValue=""
                           placeholder="name, birthday"/>
                <TextField className="editField"
                           id="child2"
                           onBlur={(event) => {
                               let newArr = children
                               newArr[1]=event.target.value
                               setChildren(newArr)
                           }}
                           variant="outlined"
                           defaultValue=""
                           placeholder="name, birthday"/>
                <TextField className="editField"
                           id="child3"
                           onBlur={(event) => {
                               let newArr = children
                               newArr[2]=event.target.value
                               setChildren(newArr)
                           }}
                           variant="outlined"
                           defaultValue=""
                           placeholder="name, birthday"/></div>


            <div className="popUpBtns">
                <Button variant="contained"
                        color="secondary"
                        onClick={() => {
                            props.setShowPopUp(false)
                        }}>
                    CANCEL
                </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={() => {
                            updateState()
                            console.log(props)
                            props.setShowPopUp(false)
                        }}>
                    DONE
                </Button>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(FamilyInfoProfile);