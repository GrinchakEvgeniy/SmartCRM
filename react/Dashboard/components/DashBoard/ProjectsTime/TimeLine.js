import React, {useEffect, useState} from 'react';
import {getWorkNowByDateFetch} from "../../requests";
import Line from "./Line";

const TimeLine = (props) => {
    const [lines, setLines] = useState([]);
    const [subLines, setSubLines] = useState([]);

    const init = () => {
        getWorkNowByDateFetch({
            date: props.date,
            action: 'user',
            user_id: props.user_id
        })
            .then(data => {
                setLines(data);
            })
    }

    useEffect(() => {
        init()
        const sublines = [];
        for (let i = 0; i < 24; i++) {
            sublines.push(<div className="sub_line" key={i}><p>{i + ":00"}</p></div>)
        }
        setSubLines(sublines);
    }, [])

    useEffect(() => {
        init()
    }, [props.date])

    // console.log('lines', lines)

    return (
        <div className="time_lines">
            {
                lines.map((value, index) => {
                    if (((+value.finish) - (+value.start)) > 60000) {
                        return (<Line key={index} lineTimeStandart={props.lineTimeStandart} value={value}/>)
                    }
                })
            }
            {subLines}
        </div>
    );
};

export default TimeLine;