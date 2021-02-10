import React from 'react';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import "./DashBoardSidebarElms.scss";

const DashBoardSidebarElms = () => {
    return (
        <div className="elemWrap">
            <div className="icon">
                <CodeRoundedIcon/>
            </div>
            <div className="label">
                <h4>Menu Item</h4>
            </div>
        </div>
    );
};

export default DashBoardSidebarElms;