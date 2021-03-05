import React, {useEffect, useState} from 'react';
import {getProjectFetch} from "../../requests";

const Line = (props) => {
    const [style, setStyle] = useState({})
    const [projectName, setProjectName] = useState('');

    const init = () => {
        getProjectFetch(props.value.project_id).then(data=>setProjectName(data.name));
        const left = (props.value.start - props.lineTimeStandart.start)/(props.lineTimeStandart.finish - props.lineTimeStandart.start)*100;
        const width = (props.value.finish - props.value.start)/(props.lineTimeStandart.finish - props.lineTimeStandart.start)*100;
        setStyle({
            left: left+'%',
            width: width+'%'
        });
    }

    useEffect(()=>{
        init()
    }, [])

    useEffect(()=>{
        init()
    }, [props.value]);

    return (
        <div className='line' style={style}>

        </div>
    );
};

export default Line;