import React from 'react';

const NoAccess = () => {

    const styleNoAccess = {
        width: '600px',
            height: '300px',
        position: "fixed",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '3px',
        background: 'rgba(255,255,255,0.75)',
        boxShadow: '1px 3px 10px 0px #bfbfbf'
    }
    const styleText = {
        color: '#383838',
        fontSize: '36px',
        textTransform: 'uppercase'
    }


    return (
        <div className='noAccess' style={styleNoAccess}>
            <h2 style={styleText}>
                You don't have access.
            </h2>
        </div>
    );
};

export default NoAccess;