import React, {useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import './Field.scss'

const Field = (props) => {

    const [focusField, setfocusField] = useState(false)

    return (
        <div className='field'>
            <h3 className='fieldLabel'>
                {props.fieldLabel}
            </h3>
            <input className='fieldText'
                   type={props.type}
                   maxLength={props.maxlength}
                   defaultValue={props.defaultValue || ''}
                   name={props.name}
                   readOnly={!focusField}
                   style={focusField ? {background: "rgba(255,255,255,0.9)"} : {background: "transparent"}}
                   onBlur={() => {
                       setfocusField(false)
                   }}
                   onClick={(e) => {
                       setfocusField(true)
                   }}
                   onChange={(e) => {
                       props.toSetValue(e.target.value)
                       props.toChange(true)
                   }}/>
        </div>
    );
};

export default Field;