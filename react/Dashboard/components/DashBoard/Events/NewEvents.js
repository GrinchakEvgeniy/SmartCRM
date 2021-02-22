import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CirclePicker } from 'react-color';
import './NewEvents.scss'

const NewEvents = (props) => {
    const [color, setColor] = useState("#03a9f4");
    const [newEvent, setNewEvent] = useState({
        title: "",
        url: "",
        start: props.start,
        end: props.end,
        for: "myself",
        backgroundColor: '#03a9f4'
    })

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        setNewEvent({...newEvent, backgroundColor: color.hex})
    }

    const Create = () => {
        props.setEvents([...props.events, newEvent])
        props.setAddEvent("")
    }

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
                        setNewEvent({...newEvent, for: event.target.value})
                    }}
                    >
                        <MenuItem value="myself"><em>Myself</em></MenuItem>
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
                        color="primary"
                        onClick={Create}
                >Create</Button>
            </div>
        </div>
    );
};

export default NewEvents;