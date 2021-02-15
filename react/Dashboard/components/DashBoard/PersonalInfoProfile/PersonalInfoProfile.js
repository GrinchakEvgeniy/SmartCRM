import React, {useState, useEffect} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./PersonalInfoProfile.scss"
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {isEmpty} from "../../helper";
import {updateUserFetch} from "../../requests";


const PersonalInfoProfile = (props) => {

    const [firstName, setFirstName] = useState(props.user_data.first_name)
    const [lastName, setLastName] = useState(props.user_data.last_name)
    const [birthday, setBirthDay] = useState()
    const [email, setEmail] = useState(props.user_data.email)

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            setBirthDay(props.user_data.profile.birthday)
        }
    }, [props.user_data]);

    const udateState = () => {
        const newState = JSON.parse(JSON.stringify(props.user_data))
        newState.first_name = firstName;
        newState.last_name = lastName;
        newState.profile.birthday = birthday;
        newState.email = email;
        updateUserFetch(newState).then(data => {
            props.updateUserData(data)
        })
    }

    return (
        <div className="info">
            <div className="infoItem"><h3>FirstName</h3><p>{props.user_data.first_name}</p></div>
            <div className="infoItem"><h3>LastName</h3><p>{props.user_data.last_name}</p></div>
            <div className="infoItem"><h3>Birthday</h3><p> <time>{birthday}</time></p></div>
            <div className="infoItem"><h3>Email</h3><p>{props.user_data.email}</p></div>

            <div className="infoItem edit"><h3>FirstName</h3>
                <TextField id="firstName"
                           onChange={(event) => {
                               setFirstName(event.target.value)
                           }}
                           className="editField"
                           variant="outlined"
                           defaultValue={props.user_data.first_name}/></div>
            <div className="infoItem edit"><h3>LastName</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setLastName(event.target.value)
                           }}
                           variant="outlined"
                           defaultValue={props.user_data.last_name}/></div>
            <div className="infoItem edit"><h3>Birthday</h3>
                <TextField type="date"
                           onChange={(event) => {
                               setBirthDay(event.target.value)
                           }}
                           placeholder={birthday}
                           variant="outlined"
                           className="editField"/></div>
            <div className="infoItem edit"><h3>Email</h3>
                <TextField className="editField"
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }}
                           variant="outlined"
                           defaultValue={props.user_data.email}/></div>
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
                            udateState()
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
export default connect(putState, putDispatch)(PersonalInfoProfile);