import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {CirclePicker} from "react-color";
import Button from "@material-ui/core/Button";
import {changeEventFetch, deleteEventFetch, getRolesFetch} from "../../requests";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";

const UpdateEvents = (props) => {
    const [color, setColor] = useState(props.event.backgroundColor);
    const [roles, setRoles] = useState([]);

    const [newEvent, setNewEvent] = useState({
        id: props.event.id,
        title: props.event.title,
        url: props.event.url,
        user_id: props.event.user_id,
        start: props.event.start,
        end: props.event.end,
        for_events: props.event.for_events,
        backgroundColor: props.event.backgroundColor
    });

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        setNewEvent({...newEvent, backgroundColor: color.hex})
    }

    const Update = () => {
        if(props.event.user_id != props.user_data.id) return false;
        changeEventFetch(newEvent)
            .then(data=>{
                console.log(data)
                props.setRenderUpdateEvent("")
            })

    }

    useEffect(()=>{
        getRolesFetch()
            .then(data=>setRoles(data))
    }, []);

    const Delete = () => {
        if(props.event.user_id != props.user_data.id) return false;
        deleteEventFetch({id:props.event.id})
            .then(data=>{
                console.log(data)
                props.setRenderUpdateEvent("")
            })
    }
    return (
        <div className="new_event">
            <div className="fields">
                <TextField
                    className="title"
                    type="text"
                    value={newEvent.title}
                    id="outlined-basic"
                    label="Title"
                    onChange={(event)=>{
                        setNewEvent({...newEvent, title: event.target.value})
                    }}
                    variant="outlined"/>
                <TextField
                    className="url"
                    type="text"
                    value={newEvent.url}
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
                        defaultValue={newEvent.for_events}
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
                        onClick={()=>props.setRenderUpdateEvent("")}
                >Cancel</Button>
                <Button className="btn add-btn"
                        variant="contained"
                        color="primary"
                        onClick={Update}
                >Update</Button>
                <Button className="btn add-btn"
                        variant="contained"
                        color="secondary"
                        onClick={Delete}
                >Delete</Button>
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
export default connect(putState, putDispatch)(UpdateEvents);