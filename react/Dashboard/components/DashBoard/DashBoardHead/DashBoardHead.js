import React, {useState} from 'react';
import './DashBoardHead.scss'

const DashBoardHead = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [headWidth, setHeadWidth] = useState(0)
    const [active, setActive] = useState('')
    const selectWidth = () => {

        if(showMenu){
            setHeadWidth(0)
            setActive('')
        } else {
            setHeadWidth(200)
            setActive(' active')
        }
    }

    return (
        <div className={"dashboard__head_wrap" + active}
             style={{width: "calc(100% - " + headWidth + "px)"}}>
            <div className="dashboard__head">
                <div className="burgerMenu"
                     onClick={() => {
                         setShowMenu(!showMenu)
                         selectWidth()
                     }}>
                    <span/>
                    <span/>
                    <span/>
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
        </div>
    );
};

export default DashBoardHead;