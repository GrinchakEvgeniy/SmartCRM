import React, {useState, useEffect} from 'react';
import "./Clients.scss";
import {getClientsFetch, postClientFetch} from "../../requests";

const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [popup, setPopup] = useState(false);
    const [newClientData, setNewClientData] = useState({
        name: '',
        contact_data: ''
    })

    useEffect(()=>{
        getClientsFetch()
            .then(data=>{
                setClients(data);
            })
    }, []);

    const Save = () => {
        postClientFetch(newClientData)
            .then(data=>{
                setClients(data)
                setPopup(false);
            })
    }

    return (
        <div className="clients">
            <div className="container">
                <div className="actions">
                    <button className="btn add-btn"
                    onClick={()=>{
                        setPopup(!popup);
                    }}
                    >Add new client</button>
                </div>
                <div className="navigation">
                    <div className="action_wrap">
                        <select>
                            <option>Пункт 1</option>
                            <option>Пункт 2</option>
                        </select>
                        <button className="btn select-btn">Select</button>
                    </div>
                    <div className="search_wrap">
                        <input type="text" className="search"/>
                        <button className="btn search-btn">Search</button>
                    </div>
                </div>
                <div className="content">
                    <div className="headers">
                        <div className="check_all">
                            <input type="checkbox"/>
                        </div>
                        <div className="id"><p>id</p></div>
                        <div className="name"><p>name</p></div>
                        <div className="contact_data"><p>contact data</p></div>
                    </div>
                    <div className="result">
                        {
                            clients.map((value, index)=>{
                                return <div className={index%2==0 ? "row white" : "row grey"}>
                                    <div className="check">
                                        <input type="checkbox"/>
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