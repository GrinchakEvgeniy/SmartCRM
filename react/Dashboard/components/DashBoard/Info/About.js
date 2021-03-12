import React, {useEffect, useState} from 'react';
import './About.scss'

const About = () => {

    const [nowYear, setNowYear] = useState('')

    useEffect(() => {
        let now = new Date()
        setNowYear(now.getFullYear())
    }, [])

    return (
        <div className='about'>
            <h2>About CRM</h2>
            <p className='versionSmartCRM'>Version: 1.0</p>
            <p className="lastRelease">Fresh release: ---</p>
            <p className='copyright'>Copyright © {nowYear} SmartPipl.</p>
        </div>
    );
};

export default About;