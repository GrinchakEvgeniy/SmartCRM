import React from 'react';
import './DashBoardHead.scss'

const DashBoardHead = () => {
    return (
        <div className="dashboard__head">
            <div className="burgerMenu">
                <div className="line__wrap">
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
            <div className="logo">
                <img src="/static/images/logo.png" alt="logo"/>
            </div>
            <div className="userMenu">
                <h3>hello user</h3>
                <div className="userAva">
                    <img src="/static/images/userIcon.svg" alt="ava"/>
                </div>
            </div>
        </div>
    );
};

export default DashBoardHead;