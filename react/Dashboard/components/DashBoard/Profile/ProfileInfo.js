import React, {useState, useEffect} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./ProfileInfo.scss"
import Button from "@material-ui/core/Button";
import {isEmpty} from "../../helper";
import {updateUserFetch} from "../../requests";
import Field from "./Field";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";


const ProfileInfo = (props) => {

        const [changeFields, setChangaFields] = useState(false)
        const [editChildName, setEditChildName] = useState(false)
        const [editChildBirthday, setEditChildBirthday] = useState(false)

        const [firstName, setFirstName] = useState(props.user_data.first_name)
        const [lastName, setLastName] = useState(props.user_data.last_name)
        const [birthday, setBirthDay] = useState()
        const [email, setEmail] = useState(props.user_data.email)

        const [position, setPosition] = useState('')
        const [experience, setExperience] = useState('')
        const [linkedIn, setLinkedIn] = useState('')
        const [gitHub, setGitHub] = useState('')
        const [telNumber1, setTelNumber1] = useState('')
        const [telNumber2, setTelNumber2] = useState('')
        const [children, setChildren] = useState([])

        useEffect(() => {
            if (!isEmpty(props.user_data)) {
                setBirthDay(props.user_data.profile.birthday)
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
            newState.first_name = firstName;
            newState.last_name = lastName;
            newState.profile.birthday = birthday;
            newState.email = email;
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
            return year + ' years, ' + months + ' months'
        }

        return (
            <div className="info">

                <Field fieldLabel={"FirstName"}
                       type={'text'}
                       maxlength={'12'}
                       defaultValue={props.user_data.first_name}
                       toSetValue={setFirstName}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"LastName"}
                       type={'text'}
                       defaultValue={props.user_data.last_name}
                       toSetValue={setLastName}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"Email"}
                       type={'text'}
                       defaultValue={props.user_data.email}
                       toSetValue={setEmail}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"Birthday"}
                       type={'date'}
                       defaultValue={birthday}
                       toSetValue={setBirthDay}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"Position"}
                       type={'text'}
                       defaultValue={position}
                       toSetValue={setPosition}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"Experience"}
                       type={'date'}
                       defaultValue={experience}
                       toSetValue={setExperience}
                       calcExperience={experienceInSmartPipl}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"LinkedIn"}
                       type={'text'}
                       defaultValue={linkedIn}
                       toSetValue={setLinkedIn}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"GitHub"}
                       type={'text'}
                       defaultValue={gitHub}
                       toSetValue={setGitHub}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"TelNumber1"}
                       type={'tel'}
                       defaultValue={telNumber1}
                       toSetValue={setTelNumber1}
                       toChange={setChangaFields}/>

                <Field fieldLabel={"TelNumber2"}
                       type={'tel'}
                       defaultValue={telNumber2}
                       toSetValue={setTelNumber2}
                       toChange={setChangaFields}/>

                <div className="children">
                    <h3 className='fieldLabel'>Children</h3>
                    <div className="childrenWrap">

                        {children.length > 0
                            ?
                            children.map((el, index) => {
                                return <div key={index} className="childWrap">
                                    <input className="editField"
                                           type='text'
                                           readOnly={!editChildName}
                                           style={editChildName ? {background: "white"} : {background: "transparent"}}
                                           placeholder="name"
                                           defaultValue={el.name}
                                           onChange={() => {
                                               setChangaFields(true)
                                           }}
                                           onClick={() => {
                                               setEditChildName(true)
                                           }}
                                           onBlur={(event
                                           ) => {
                                               const newArr = children.slice();
                                               event.target.value !== '' ? (
                                                       newArr[index].name = event.target.value,
                                                           setChildren(newArr))
                                                   :
                                                   console.log('break')
                                               setEditChildName(false)
                                           }}/>
                                    <input className="editField"
                                           type="date"
                                           readOnly={!editChildBirthday}
                                           style={editChildBirthday ? {background: "white"} : {background: "transparent"}}
                                           placeholder="birthday"
                                           defaultValue={el.birthday}
                                           onChange={() => {
                                               setChangaFields(true)
                                           }}
                                           onClick={() => {
                                               setEditChildBirthday(true)
                                           }}
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
                                               setEditChildBirthday(false)
                                           }}/>
                                    <RemoveCircleIcon className="removeChildFields"
                                                      onClick={() => {
                                                          const readyArr = children.slice()
                                                          readyArr.splice(index, 1)
                                                          setChildren(readyArr)
                                                          setChangaFields(true)
                                                      }}
                                    />
                                </div>
                            })
                            :
                            <div className="childWrap"> </div>
                        }
                        <div className="addChild">
                            <AddCircleIcon className="childBtn"
                                           onClick={() => {
                                               const newArr = children.slice();
                                               newArr.push({});
                                               setChildren(newArr)
                                           }}/>
                        </div>
                    </div>
                </div>
                <Button className='saveChanges'
                        disabled={!changeFields}
                        style={changeFields ? {opacity: '1'} : {opacity: '0'}}
                        onClick={() => {
                            updateState()
                            setChangaFields(false)
                        }}>
                    Save changes
                </Button>
            </div>
        );
    }
;

const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(ProfileInfo);