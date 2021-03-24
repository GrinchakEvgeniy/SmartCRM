import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CirclePicker } from 'react-color';
import './NewEvents.scss'
import {createEventFetch, getRolesFetch} from "../../requests";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";

const NewEvents = (props) => {
    const [color, setColor] = useState("#03a9f4");
    const [roles, setRoles] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        url: "",
        user_id: props.user_data.id,
        start: props.start,
        end: props.end,
        for_events: "myself",
        backgroundColor: '#03a9f4'
    })

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        setNewEvent({...newEvent, backgroundColor: color.hex})
    }

    const Create = () => {
        createEventFetch(newEvent)
            .then(data=>{
                console.log(data)
                props.setAddEvent("")
            })

    }

    useEffect(()=>{
        getRolesFetch()
            .then(data=>setRoles(data))
    }, []);

    return (
        <div className="new_event">
            <div className="fields">
                <TextField
                    className="title"
                    type="text"
                    id="outlined-basic"
                    label="Title"
                    onChange={(event)=>{
                        setNewEvent({...newEvent, title: event.target.value})
                    }}
                    variant="outlined"/>
                <TextField
                    className="url"
                    type="text"
                    id="outlined-basic"
                    label="Url"
                    onChange={(event)=>{
                        setNewEvent({...newEvent, url: event.target.value})
                    }}
                    variant="outlined"/>
                <FormControl variant="outlined" className="sel">
                    <InputLabel>For</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="98"
                        label="For"
                        defaultValue="myself"
                        onChange={(event)=>{
                        setNewEvent({...newEvent, for_events: event.target.value})
                    }}
                    >
                        <MenuItem value="myself"><em>Myself</em></MenuItem>
                        <MenuItem value="all"><em>All</em></MenuItem>
                        {
                            roles.map((value, index)=>{
                                return (
                                    <MenuItem key={index} value={value.value}><em>{value.name}</em></MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <CirclePicker color={ color }
        onChangeComplete={ handleChangeComplete }/>
            </div>
            <div className="actions">
                <Button className="btn add-btn"
                        variant="contained"
                        color="secondary"
                        onClick={()=>props.setAddEvent("")}
                >Cancel</Button>
                <Button className="btn add-btn"
                        variant="contained"
                        disabled={!(Boolean(newEvent.title.trim()) || Boolean(newEvent.url.trim()))}
                        color="primary"
                        onClick={Create}
                >Create</Button>
            </div>
        </div>
    );
};
const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(NewEvents);