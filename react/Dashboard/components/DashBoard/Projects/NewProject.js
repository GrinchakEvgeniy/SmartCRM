import React, {useState, useEffect} from 'react';

const NewProject = (props) => {
    const [newProject, setNewProject] = useState({
        
    })
    
    return (
        <div className="new_project">
            <div className="pr_new_title"><p>New Project</p></div>
            <div className="new_project_fields">
                <div className="field">
                    <label htmlFor="">Name</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="field">
                    <label htmlFor="">Description</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Accesses</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Users</label>
                    <select name="" id="">
                        {
                            props.users.map((value, index)=>{
                                return (
                                    <option value={value.id}>{value.first_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="">Client</label>
                    <select name="" id="">
                        {
                            props.clients.map((value, index)=>{
                                return (
                                    <option value={value.id}>{value.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="">Status</label>
                    <input type="text"/>
                </div>
            </div>
            <div className="new_project_buttons">
                <button className="btn-cancel"
                onClick={()=>props.closeLayout(false)}
                >Cancel</button>
                <button className="btn-create">Create</button>
            </div>
        </div>
    );
};

export default NewProject;