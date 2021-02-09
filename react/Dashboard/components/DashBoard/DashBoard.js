import React from 'react';
import './DashBoard.scss'
import DashBoardHead from "./DashBoardHead/DashBoardHead";
import DashBoardSidebar from "./DashBoardSidebar/DashBoardSidebar";

const DashBoard = () => {
    return (
        <div>
            <div className="dashboard__wrap">
                <DashBoardHead/>
                <DashBoardSidebar/>
            </div>
        </div>
    );
};

export default DashBoard;