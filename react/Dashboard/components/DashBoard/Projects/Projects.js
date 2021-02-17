import React, {useState, useEffect} from 'react';
import "./Projects.scss";
import {getProjectsSimpleFetch, getUsersFetch, getClientsFetch} from "../../requests";
import NewProject from "./NewProject";

const Projects = () => {
    const [projectsSimple, setProjectsSimple] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([])

    const [newProjectLayout, setNewProjectLayout] = useState(false);


    useEffect(()=>{
        getProjectsSimpleFetch()
            .then(data=>setProjectsSimple(data));
        getUsersFetch()
            .then(data=>setUsers(data));
        getClientsFetch()
            .then(data=>setClients(data));
    }, [])


    return (
        <div className="projects">
            <div className="container">
                <div className="navigation">
                    <button className="btn btn-new" onClick={()=>setNewProjectLayout(true)}>Add new</button>
                </div>
                <div className="projects_wrap">
                    {
                        projectsSimple.map((value, index)=>{
                            const users_id = value.users_list.split(',');
                            return (
                                <div className="project" key={index}>
                                    <div className="title"><h3>{value.name}</h3></div>
                                    <div className="status"><p>{value.status}</p></div>
                                    <div className="users">
                                        {
                                            users.map((value2, index)=>{
                                                for(let i = 0; i < users_id.length; i++){
                                                    if(value2.id == parseInt(users_id[i])){
                                                        return (
                                                            <div className="user" key={index}>
                                                                <img src={value2.profile.avatar.image} alt={value2.first_name}/>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                newProjectLayout ? <NewProject
                    closeLayout={setNewProjectLayout}
                    users={users}
                    setProjectsSimple={setProjectsSimple}
                    clients={clients}/> : ""
            }
        </div>
    );
};

export default Projects;