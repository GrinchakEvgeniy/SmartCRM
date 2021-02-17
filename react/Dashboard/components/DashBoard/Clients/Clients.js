import React, {useState, useEffect} from 'react';
import "./Clients.scss";
import {getClientsFetch, postClientFetch, deleteClientFetch} from "../../requests";
import Button from "@material-ui/core/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [popup, setPopup] = useState(false);
    const [newClientData, setNewClientData] = useState({
        name: '',
        contact_data: ''
    })

    const [renderClients, setRenderClients] = useState([]);

    const [action, setAction] = useState('nothing');

    const [clientsId, setClientsId] = useState([]);

    useEffect(()=>{
        getClientsFetch()
            .then(data=>{
                setRenderClients(data);
                setClients(data);
            })
    }, []);

    const Save = () => {
        postClientFetch(newClientData)
            .then(data=>{
                setRenderClients(data)
                setClients(data)
                setPopup(false);
            })
    }

    const CheckAll = (event) => {
        if(event.target.checked){
            const arr = renderClients.map((value, index)=>{
                return value.id;
            });
            setClientsId(arr);
        } else {
            setClientsId([])
        }
        const checkboxes = document.getElementsByClassName('input_check');
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = event.target.checked;
        }
    }

    const Action = () => {
        if(action == "delete"){

            deleteClientFetch({'id': clientsId})
                .then(data=>{
                    setClients(data);
                    setRenderClients(data);
                    setClientsId([]);
                    const checkboxes = document.getElementsByClassName('input_check');
                    for(let i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = false;
                    }
                })
        }
    }

    const Search = (string) => {
        if(string === ''){
            setRenderClients(clients);
        } else {
            const searchArr = clients.filter(el=>{
                return el.name.toLowerCase().indexOf(string.toLowerCase()) > -1;
            })
            setRenderClients(searchArr);
        }
    }

    const Check = (id) => {
        let finded = false;
        let index = 0;
        const arr = clientsId.slice();
        for(let i = 0; i < arr.length; i++){
            if(id == arr[i]){index=i;finded = true;break}
            index=i;
        }
        if(finded){
            arr.splice(index, 1);
            setClientsId(arr);
        } else {
            setClientsId([...clientsId, id])
        }
    }

    return (
        <div className="clients">
            <div className="container">
                <div className="actions">
                    <Button className="btn add-btn"
                            variant="contained"
                            color="primary"
                            onClick={()=>{
                                setPopup(!popup);
                            }}>Add client
                    </Button>
                </div>
                <div className="navigation">
                    <div className="action_wrap">
                        <FormControl variant="outlined" className="action_wrap">
                            <InputLabel id="demo-simple-select-outlined-label">Action</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={action}
                                onChange={(event => setAction(event.target.value))}
                                label="Action">
                                <MenuItem value="nothing">Nothing</MenuItem>
                                <MenuItem value="delete">Delete Chased</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className="btn select-btn"
                                variant="contained"
                                color="primary"
                                disabled={action === 'nothing'}
                                onClick={Action}
                        >Done
                        </Button>
                    </div>
                    <div className="search_wrap">
                        <TextField
                            className="search"
                            type="text"
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            onChange={(event)=>Search(event.target.value)}/>
                    </div>
                </div>
                <div className="content">
                    <div className="headers">
                        <div className="check_all">
                            <input type="checkbox"
                                   onChange={(event)=>CheckAll(event)}/>
                        </div>
                        <div className="id"><p>id</p></div>
                        <div className="name"><p>name</p></div>
                        <div className="contact_data"><p>contact data</p></div>
                    </div>
                    <div className="result">
                        {
                            renderClients.map((value, index)=>{
                                return <div key={index}  className={index%2==0 ? "row white" : "row grey"}>
                                    <div className="check">
                                        <input type="checkbox" className="input_check" onChange={()=>{Check(value.id)}}/>
                                    </div>
                                    <div className="id_result">
                                        <p>{value.id}</p>
                                    </div>
                                    <div className="name_result">
                                        <p>{value.name}</p>
                                    </div>
                                    <div className="contact_data_result">
                                        <p>{value.contact_data}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className={popup ? "popup_add_wrap active" : "popup_add_wrap"}>
                <div className="fields">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={(event)=>{
                        setNewClientData({...newClientData, name: event.target.value})
                    }}/>
                    <label htmlFor="contact_data">Contact Data</label>
                    <input type="text" id="contact_data"onChange={(event)=>{
                        setNewClientData({...newClientData, contact_data: event.target.value})
                    }}/>
                </div>
                <div className="button_group">
                    <button className="btn cancel-btn" onClick={()=>{
                        setPopup(false);

                    }}>Cancel</button>
                    <button className="btn save-btn" onClick={Save}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Clients;