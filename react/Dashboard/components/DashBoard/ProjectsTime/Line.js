import React, {useEffect, useState} from 'react';
import {getProjectFetch} from "../../requests";

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
}

const Line = (props) => {
    const [style, setStyle] = useState({})
    const [projectName, setProjectName] = useState('');
    const [timeSpent, setTimeSpent] = useState(0);
    const [lineInfoPopup, setLineInfoPopup] = useState(false);

    const init = () => {
        getProjectFetch(props.value.project_id).then(data => setProjectName(data.name));
        let finish;
        if (props.value.finish == null) {
            finish = Date.now()
        } else {
            finish = props.value.finish
        }
        setTimeSpent(finish - props.value.start)
        const left = (props.value.start - props.lineTimeStandart.start) / (props.lineTimeStandart.finish - props.lineTimeStandart.start) * 100;
        const width = (finish - props.value.start) / (props.lineTimeStandart.finish - props.lineTimeStandart.start) * 100;
        setStyle({
            left: left + '%',
            width: width + '%'
        });
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        init()
    }, [props.value]);

    return (
        <div className='line' onClick={() => setLineInfoPopup(true)} style={style}>
            <div className="popup_line_wrap">
                {
                    lineInfoPopup ? <div className="line_popup">
                            <div className="toolbar">
                                <span className="name">{projectName}</span>
                                <div className="close" onClick={(e) => {
                                    setLineInfoPopup(false);
                                    e.stopPropagation();
                                }}>
                                    <span>&#10006;</span></div>
                            </div>
                            <div className="info">
                                <p>Time spent: </p>
                                <span>{msToTime(timeSpent)}</span>
                            </div>
                        </div>
                        :
                        ""
                }
            </div>
        </div>
    );
};

export default Line;