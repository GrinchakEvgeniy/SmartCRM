import React, {useState, useEffect} from 'react';
import "./Clients.scss";
import {getClientsFetch, postClientFetch, deleteClientFetch, getUserFetch} from "../../requests";
import Button from "@material-ui/core/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {getAccess, isEmpty} from "../../helper";
import {getUser, setSocket} from "../../redux/actions/actions";
import {connect} from "react-redux";
import NoAccess from "../NoAccess/NoAccess";

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
    const [clientName, setClientName] = useState('')
    const [clientInfo, setClientInfo] = useState('')
    const [currentUserRole, setCurrentUserRole] = useState('')
    const allowedUsersHere = ['S', 'PM']

    useEffect(() => {
        getClientsFetch()
            .then(data => {
                setRenderClients(data);
                setClients(data);
            })
    }, []);

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.profile.length === 0) return;
            setCurrentUserRole(props.user_data.profile.role_id.value)
        }
    }, [props.user_data])

    const Save = () => {
        postClientFetch(newClientData)
            .then(data => {
                setRenderClients(data)
                setClients(data)
                setPopup(false);
                props.web_socket.send(JSON.stringify({
                    'message': props.user_data.first_name + " add client " + clientName,
                    'type_notification': "group",
                    'from_notification': props.user_data.id,
                    'for_notification': "S",
                }));
                props.web_socket.send(JSON.stringify({
                    'message': props.user_data.first_name + " add client " + clientName,
                    'type_notification': "group",
                    'from_notification': props.user_data.id,
                    'for_notification': "PM",
                }));
            })
    }

    const CheckAll = (event) => {
        if (event.target.checked) {
            const arr = renderClients.map((value, index) => {
                return value.id;
            });
            setClientsId(arr);
        } else {
            setClientsId([])
        }
        const checkboxes = document.getElementsByClassName('input_check');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = event.target.checked;
        }
    }

    const Action = () => {
        if (action === "delete") {

            deleteClientFetch({'id': clientsId})
                .then(data => {
                    setClients(data);
                    setRenderClients(data);
                    setClientsId([]);
                    const checkboxes = document.getElementsByClassName('input_check');
                    for (let i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = false;
                    }
                }).then(() => {
                let delClientNames = []
                for (let el of clientsId) {
                    for (let elem of clients) {
                        if (el === elem.id) {
                            delClientNames.push(elem.name)
                        }
                    }
                }
                props.web_socket.send(JSON.stringify({
                    'message': props.user_data.first_name + " delete client: " + delClientNames.join(', '),
                    'type_notification': "group",
                    'from_notification': props.user_data.id,
                    'for_notification': "S",
                }));
                props.web_socket.send(JSON.stringify({
                    'message': props.user_data.first_name + " delete client: " + delClientNames.join(', '),
                    'type_notification': "group",
                    'from_notification': props.user_data.id,
                    'for_notification': "PM",
                }));
            })
        }
    }

    const Search = (string) => {
        if (string === '') {
            setRenderClients(clients);
        } else {
            const searchArr = clients.filter(el => {
                return el.name.toLowerCase().indexOf(string.toLowerCase()) > -1;
            })
            setRenderClients(searchArr);
        }
    }

    const Check = (id, name) => {
        let finded = false;
        let index = 0;
        const arr = clientsId.slice();
        for (let i = 0; i < arr.length; i++) {
            if (id === arr[i]) {
                index = i;
                finded = true;
                break
            }
            index = i;
        }
        if (finded) {
            arr.splice(index, 1);
            setClientsId(arr);
        } else {
            setClientsId([...clientsId, id])
        }
        console.log('clientsId', clientsId)
    }

    return (
        <div className="clients">
            {
                getAccess(currentUserRole, allowedUsersHere)
                    ?
                    <div className="container">
                        <div className="clientsWrap">
                            <div className="actions">
                                <div className={popup ? "createNewClient active" : "createNewClient"}>
                                    <div className="createNewClientFields">
                                        <input id="name"
                                               placeholder='name'
                                               value={clientName}
                                               onChange={(event) => {
                                                   setClientName(event.target.value)
                                                   setNewClientData({...newClientData, name: event.target.value})
                                               }}/>
                                        <input id="contact_data"
                                               placeholder='contact'
                                               value={clientInfo}
                                               onChange={(event) => {
                                                   setClientInfo(event.target.value)
                                                   setNewClientData({
                                                       ...newClientData,
                                                       contact_data: event.target.value
                                                   })
                                               }}/>
                                    </div>
                                    <div className="button_group">
                                        <Button variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    setClientName('')
                                                    setClientInfo('')
                                                    setPopup(false);
                                                }}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained"
                                                color="primary"
                                                disabled={!(clientName.trim() && clientInfo.trim())}
                                                onClick={() => {
                                                    Save()
                                                    setClientName('')
                                                    setClientInfo('')
                                                }}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="navigation">
                                <div className="action_wrap action">
                                    <FormControl className="action_wrap">
                                        {/*<InputLabel id="demo-simple-select-outlined-label">Action!!!!!!</InputLabel>*/}
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={action}
                                            onChange={(event => setAction(event.target.value))}>
                                            <MenuItem value="nothing">Action</MenuItem>
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
                                    <input
                                        className="search"
                                        type="text"
                                        id="outlined-basic"
                                        placeholder="Search"
                                        onChange={(event) => Search(event.target.value)}/>
                                </div>
                                <div className="action_wrap addClient">
                                    <Button className="btn add-btn"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setPopup(!popup);
                                            }}>Add client
                                    </Button>
                                </div>
                            </div>
                            <div className="content">
                                <div className="headers">
                                    <div className="check_all">
                                        <input type="checkbox"
                                               onChange={(event) => CheckAll(event)}/>
                                    </div>
                                    <div className="id"><p>id</p></div>
                                    <div className="name"><p>name</p></div>
                                    <div className="contact_data"><p>contact data</p></div>
                                </div>
                                <div className="result">
                                    {
                                        renderClients.map((value, index) => {
                                            return <div key={index}
                                                        className={index % 2 === 0 ? "row white" : "row grey"}>
                                                <div className="check">
                                                    <input type="checkbox" className="input_check" onChange={() => {
                                                        Check(value.id, value.name)
                                                    }}/>
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
                    </div>
                    :
                    <NoAccess/>
            }
        </div>
    );
};

const putState = (state) => {
    return {
        user_data: state.user_data,
        web_socket: state.web_socket
    }
}
const putDispatch = (dispatch) => {
    return {
        updateUserData: (data) => dispatch(getUser(data)),
        setSocket: (data) => dispatch(setSocket(data))
    }
}
export default connect(putState, putDispatch)(Clients);