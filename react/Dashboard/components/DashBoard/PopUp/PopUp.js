import React, {useEffect, useState} from 'react';
import "./PopUp.scss"
import Button from "@material-ui/core/Button";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import FamilyInfoProfile from "../FamilyInfoProfile/FamilyInfoProfile";
import PersonalInfoProfile from "../PersonalInfoProfile/PersonalInfoProfile";

const PopUp = (props) => {

    const [component, setComponent] = useState('')

    useEffect(() => {
        switch (props.popUpOptions) {
            case 'PersonalInfoProfile':
                setComponent(<PersonalInfoProfile setShowPopUp={props.setShowPopUp}/>)
                break
            case 'FamilyInfoProfile':
                setComponent(<FamilyInfoProfile  setShowPopUp={props.setShowPopUp}/>)
                break
            default:
                setComponent(<h2>Hello world!</h2>)
        }
    }, [props.popUpOptions])

    return (
        <div className={props.showPopUp ? "popUp active" : "popUp"}>
            <div className={props.showPopUp ? "popUpWrap active" : "popUpWrap"}>
                <div className="content">
                    {component}
                </div>
                {/*<div className="popUpBtns">*/}
                {/*    <Button variant="contained"*/}
                {/*            color="secondary"*/}
                {/*            onClick={() => {*/}
                {/*                props.setShowPopUp(false)*/}
                {/*            }}>*/}
                {/*        CANCEL*/}
                {/*    </Button>*/}
                {/*    <Button>DONE</Button>*/}
                {/*</div>*/}
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
export default connect(putState, putDispatch)(PopUp);