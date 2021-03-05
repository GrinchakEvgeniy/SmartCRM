import React, {useEffect, useState} from 'react';
import {getWorkNowByDateFetch} from "../../requests";
import Line from "./Line";

const TimeLine = (props) => {
    const [lines, setLines] = useState([]);
    const [subLines, setSubLines] = useState([]);

    useEffect(()=>{
        getWorkNowByDateFetch({
            date: props.date,
            action: 'user',
            user_id: props.user_id})
            .then(data=>{
                setLines(data);
                // console.log(props.lineTimeStandart, data[0].start)
            })
        const sublines = [];
        for(let i = 0; i < 24; i++){
            sublines.push(<div className="sub_line" key={i}><p>{i+":00"}</p></div>)
        }
        setSubLines(sublines);
    }, [])

    return (
        <div className="time_lines">
            {
                lines.map((value, index)=>{
                    return (<Line key={index} lineTimeStandart={props.lineTimeStandart} value={value}/>)
                })
            }
            {subLines}
        </div>
    );
};

export default TimeLine;