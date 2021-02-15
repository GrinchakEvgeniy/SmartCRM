import React, {useState} from 'react';
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import "./FamilyInfoProfile.scss"
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const FamilyInfoProfile = (props) => {

    const [] = useState()

    return (
        <div className="info">
            <div className="infoItem"><h3>Family</h3><p>{props.user_data.first_name}</p></div>
            <div className="infoItem"><h3>Company</h3><p>{props.user_data.last_name}</p></div>
            <div className="infoItem"><h3>Birthday</h3><p>02-02-2018</p></div>
            <div className="infoItem"><h3>Email</h3><p>{props.user_data.email}</p></div>
            <div className="infoItem"><h3>Tel</h3><p>+3809876543</p></div>

            <div className="infoItem edit"><h3>Family</h3>
                <TextField className="editField"
                           variant="outlined"
                           placeholder={props.user_data.first_name}/></div>
            <div className="infoItem edit"><h3>Company</h3>
                <TextField className="editField"
                           variant="outlined"
                           placeholder={props.user_data.last_name}/></div>
            <div className="infoItem edit"><h3>Birthday</h3>
                <TextField type="date"
                           defaultValue="2017-05-24"
                           variant="outlined"
                           format="dd/MM/yyyy"
                           className="editField"/></div>
            <div className="infoItem edit"><h3>Email</h3>
                <TextField className="editField"
                           variant="outlined"
                           placeholder={props.user_data.email}/></div>
            <div className="infoItem edit"><h3>Tel</h3>
                <TextField className="editField"
                           variant="outlined"
                           placeholder={"+3809876543"}/></div>
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
                            // udateState()
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