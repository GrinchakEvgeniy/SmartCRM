import React from 'react';
import './Info.scss'
import Statute from "./Statute";
import About from "./About";

const Info = () => {
    return (
        <div className='info'>
            <div className='container'>
                <Statute/>
                <About/>
            </div>
        </div>
    );
};

export default Info;