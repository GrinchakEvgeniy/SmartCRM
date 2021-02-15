import React, {useState, useEffect} from 'react';
import "./Clients.scss";

const Clients = (props) => {
    const [clients, setClients] = useState([
    {
        "id": 1,
        "timestamps": "2021-02-11 08:23:19.647145",
        "name": "Robert",
        "contact_data": "0988888888"
    },
    {
        "id": 2,
        "timestamps": "2021-02-11 10:42:07.048324",
        "name": "Игорь Иванович Петров",
        "contact_data": "0988888888"
    }
])


    return (
        <div className="clients">
            <div className="container">
                <div className="actions">
                    <button className="btn add-btn">Add new client</button>
                </div>
                <div className="navigation">
                    <input type="text" className="search"/>
                    <button className="btn search-btn">Search</button>
                </div>
                <div className="content">
                    <div className="headers">
                        <div className="id"><p>id</p></div>
                        <div className="name"><p>name</p></div>
                        <div className="contact_data"><p>contact data</p></div>
                    </div>
                    <div className="result">
                        {
                            clients.map((value, index)=>{
                                return <div className="row">
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
        </div>
    );
};

export default Clients;