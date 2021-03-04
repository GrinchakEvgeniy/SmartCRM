import React, {useEffect, useState} from 'react';
import {getProjectFetch} from "../../requests";

const Line = (props) => {
    const [style, setStyle] = useState({})
    const [projectName, setProjectName] = useState('');

    useEffect(()=>{
        getProjectFetch(props.value.project_id).then(data=>setProjectName(data.name));
        const left = (props.value.start - props.lineTimeStandart.start)/(props.lineTimeStandart.finish - props.lineTimeStandart.start)*100;
        const width = (props.value.finish - props.value.start)/(props.lineTimeStandart.finish - props.lineTimeStandart.start)*100;
        setStyle({
            left: left+'%',
            width: width+'%'
        });
        console.log(left, width)
    }, [])

    return (
        <div className='line' style={style}>

        </div>
    );
};

export default Line;