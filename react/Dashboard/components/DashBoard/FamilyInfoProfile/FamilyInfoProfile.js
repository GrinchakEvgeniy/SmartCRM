import React, {useEffect, useState} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./FamilyInfoProfile.scss"
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {isEmpty} from "../../helper";
import {updateUserFetch} from "../../requests";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
        newState.profile.children = children.filter(el => JSON.stringify(el) !== '{}');
        updateUserFetch(newState).then(data => {
            props.updateUserData(data)
        })
    }


    const experienceInSmartPipl = (startDate) => {
        let current = new Date()
        let old = new Date(startDate);
        let days = Math.ceil(Math.abs(old.getTime() - current.getTime()) / (1000 * 3600 * 24))
        let year = Math.floor(days / 365)
        let months = Math.floor((days - (year * 365)) / 30)
        return <p>{year + ' years, ' + months + ' months'}</p>
    }

    return (
        <div className="info">
            <div className="infoItem"><h3>Position</h3>{position}</div>
            <div className="infoItem"><h3>Experience</h3>{experienceInSmartPipl(experience)}</div>
            <div className="infoItem"><h3>LinkedIn</h3><p>{linkedIn}</p></div>
            <div className="infoItem"><h3>GitHub</h3><p>{gitHub}</p></div>
            <div className="infoItem"><h3>TelNumber1</h3><p>{telNumber1}</p></div>
            <div className="infoItem"><h3>TelNumber2</h3><p>{telNumber2}</p></div>
            <div className="infoItem children">
                <h3>Children</h3>
                <div className="childrenWrap">
                    {children.map((el, index) => {
                        return <p key={index}>{el.name + ', ' + el.birthday}</p>
                    })}
                </div>
            </div>

            <div className="infoItem edit"><h3>Position</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setPosition(event.target.value)
                           }}
                           variant="outlined"
                           value={position}/></div>
            <div className="infoItem edit"><h3>Experience</h3>
                <TextField className="editField"
                           label="SmartPIPL career start"
                           type="date"
                           onChange={(event) => {
                               setExperience(event.target.value)
                           }}
                           variant="outlined"
                           value={experience}/></div>
            <div className="infoItem edit"><h3>LinkedIn</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setLinkedIn(event.target.value)
                           }}
                           variant="outlined"
                           value={linkedIn}/></div>
            <div className="infoItem edit"><h3>GitHub</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setGitHub(event.target.value)
                           }}
                           variant="outlined"
                           value={gitHub}/></div>
            <div className="infoItem edit"><h3>TelNumber</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setTelNumber1(event.target.value)
                           }}
                           variant="outlined"
                           value={telNumber1}/></div>
            <div className="infoItem edit"><h3>TelNumber</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setTelNumber2(event.target.value)
                           }}
                           variant="outlined"
                           value={telNumber2}/></div>
            <div className="infoItem edit child">
                <h3>Children</h3>
                {children.length > 0
                    ?
                    children.map((el, index) => {
                        return <div key={index} className="childWrap">
                            <TextField className="editField"
                                       placeholder="name"
                                       defaultValue={el.name}
                                       variant="outlined"
                                       onBlur={(event
                                       ) => {
                                           const newArr = children.slice();
                                           event.target.value !== '' ? (
                                                       newArr[index].name = event.target.value,
                                                       setChildren(newArr))
                                               :
                                               console.log('break')
                                       }}/>
                            <TextField className="editField"
                                       type="date"
                                       placeholder="birthday"
                                       defaultValue={el.birthday}
                                       variant="outlined"
                                       onBlur={(event
                                       ) => {
                                           const newArr = children.slice();
                                           event.target.value !== '' ? (
                                                       newArr[index].birthday = event.target.value,
                                                       setChildren(newArr))
                                               :
                                               (console.log('nothing'),
                                                   newArr[index].birthday = '',
                                                   setChildren(newArr))
                                           console.log('break')
                                       }}/>
                            <div className="addChild">
                                <RemoveCircleIcon color={"secondary"}
                                                  className="childBtn"
                                                  onClick={() => {
                                                      const readyArr = children.slice()
                                                      readyArr.splice(index, 1)
                                                      setChildren(readyArr)
                                                  }}
                                />
                            </div>
                        </div>
                    })
                    :
                    <div className="childWrap"></div>
                }

            </div>
            <div className="addChildren">
                <AddCircleIcon color={"primary"}
                               className="childBtn"
                               onClick={() => {
                                   const newArr = children.slice();
                                   newArr.push({});
                                   setChildren(newArr)
                               }}/>
            </div>
            <div className="popUpBtns">
                <Button variant="contained"
                        color="secondary"
                        onClick={() => {
                            //checking for the absence of empty objects
                            const newArr = children.filter(el => JSON.stringify(el) !== "{}");
                            setChildren(newArr)
                            props.setShowPopUp(false)
                        }}>
                    CANCEL
                </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={() => {

                            //checking for the absence of empty objects
                            const newArr = children.filter(el => JSON.stringify(el) !== "{}");
                            for(let elem of newArr){
                                (typeof elem['birthday'] === "undefined")
                                    ? elem['birthday'] = ''
                                    : ''
                            }
                            setChildren(newArr)
                            props.setShowPopUp(false)
                            updateState()
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