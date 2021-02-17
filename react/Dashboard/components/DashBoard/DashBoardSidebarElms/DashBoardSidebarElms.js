import React from 'react';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import "./DashBoardSidebarElms.scss";
import {Link} from "react-router-dom";

const DashBoardSidebarElms = (props) => {
    return (
        <Link to={props.link} className="elem">
            <div className="elemWrap">
                <div className="icon">
                    {props.icon}
                    {/*<CodeRoundedIcon/>*/}
                </div>
                <div className="label">
                    <h4>{props.label}</h4>
                </div>
            </div>
        </Link>
    );
};

export default DashBoardSidebarElms;