import React from 'react';
import './Info.scss'
import Statute from "./Statute";
import About from "./About";

const Info = () => {
    return (
        <div className='info'>
            <div className='container'>
                <h1>INFO COMPONENT</h1>
                <Statute/>
                <About/>
            </div>
        </div>
    );
};

export default Info;