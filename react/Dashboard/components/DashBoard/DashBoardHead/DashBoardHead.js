import React, {useState, useEffect} from 'react';
import './DashBoardHead.scss'
import {connect} from 'react-redux';
import {getUser} from "../../redux/actions/actions";
import {getUserFetch} from "../../requests";
import DashBoardHeadUserMenu from "../DashBoardHeadUserMenu/DashBoardHeadUserMenu";

const DashBoardHead = (props) => {

    useEffect(() => {
        getUserFetch().then(data => {
            props.updateUserData(data)
        })
    }, [])

    useEffect(()=>{
        console.log(props.user_data)
    })

    const [showMenu, setShowMenu] = useState(props.openMenu)
    const [headWidth, setHeadWidth] = useState(0)
    const selectWidth = () => {
        showMenu
            ?
            setHeadWidth(0)
            :
            setHeadWidth(200)
    }

    return (
        <div className={showMenu ? "dashboard__head_wrap active" : "dashboard__head_wrap"}
             style={{width: "calc(100% - " + headWidth + "px)"}}>
            <div className="dashboard__head">
                <div className="burgerMenu"
                     onClick={() => {
                         setShowMenu(!showMenu)
                         props.update(!showMenu)
                         selectWidth()
                     }}>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div className="logo">
                    <img src="/static/images/logo.png" alt="logo"/>
                </div>
                <DashBoardHeadUserMenu/>
            </div>
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
    }
}
export default connect(putState, putDispatch)(DashBoardHead);