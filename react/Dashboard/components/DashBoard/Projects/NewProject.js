import React, {useState, useEffect} from 'react';
import './NewProject.scss';
import {postProjectSimpleFetch} from "../../requests";

const NewProject = (props) => {
    const [userIds, setUserIds] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        users_list: "",
        description: "",
        accesses: "",
        status: "Active",
        client_id: ""
    });

    const userCheck = (event) => {
        let result = userIds.slice()
        if(event.target.checked){
            result.push(event.target.value)
        } else {
            result = userIds.filter(el=>el !== event.target.value);
        }
        setUserIds(result);
        setNewProject({...newProject, users_list: result.join()});
    }

    const Create = () => {
        postProjectSimpleFetch(newProject)
            .then(data=>{
                props.setProjectsSimple(data);
                props.closeLayout(false);
            })
    }
    
    return (
        <div className="new_project">
            <div className="pr_new_title"><p>New Project</p></div>
            <div className="new_project_fields">
                <div className="field">
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={(event)=>{
                        setNewProject({...newProject, name: event.target.value})
                    }}/>
                </div>
                <div className="field">
                    <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30" rows="10" onChange={(event)=>{
                        setNewProject({...newProject, description: event.target.value})
                    }}></textarea>
                </div>
                <div className="field">
                    <label htmlFor="">Accesses</label>
                    <textarea name="" id="" cols="30" rows="10"
                        onChange={(event)=>{
                            setNewProject({...newProject, accesses: event.target.value})
                        }}
                    ></textarea>
                </div>
                <div className="field">
                    <label htmlFor="">Users</label>
                    {
                        props.users.map((value, index)=>{
                            return (
                                <div className="user_check_wrap" key={index}>
                                    <input type="checkbox" value={value.id} onChange={(event => userCheck(event))}/>
                                    <div className="img_user"><img src={value.profile.avatar.image} alt=""/></div>
                                    <div className="name_user">
                                        <p>{value.first_name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="field">
                    <label htmlFor="">Client</label>
                    <select name="" id="" onChange={(event)=>{
                        setNewProject({...newProject, client_id: event.target.value})
                    }}>
                        <option value="">Nothing</option>
                        {
                            props.clients.map((value, index)=>{
                                return (
                                    <option key={index} value={value.id}>{value.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="">Status</label>
                    <select name="" id="" onChange={(event)=>{
                        setNewProject({...newProject, status: event.target.value})
                    }}>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                    </select>
                </div>
            </div>
            <div className="new_project_buttons">
                <button className="btn-cancel"
                onClick={()=>props.closeLayout(false)}
                >Cancel</button>
                <button className="btn-create" onClick={Create}>Create</button>
            </div>
        </div>
    );
};

export default NewProject;