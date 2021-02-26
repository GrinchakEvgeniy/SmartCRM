import React, {useEffect, useState} from 'react';
import './ProjectControl.scss';
import {getProjectFetch, getUsersFetch, updateProjectFetch} from "../../requests";
import ProjectField from "./ProjectField";
import DescriptionIcon from '@material-ui/icons/Description';
import LinkIcon from '@material-ui/icons/Link';
import Talk from "../Talk/Talk";
import UsersAll from "../UsersAll/UsersAll";
import Button from "@material-ui/core/Button";

const ProjectControl = () => {

    const [tabValue, setTabValue] = useState('Project')
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectAccesses, setProjectAccesses] = useState('')
    const [files, setFiles] = useState([])
    const [users, setUsers] = useState([]);
    const [addUserActive, setAddUserActive] = useState(false)
    const [checkedUsers, setCheckedUsers] = useState([])

    const update = () => {
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setProject(data)
                setProjectName(data.name)
                setProjectDescription(data.description)
                setProjectAccesses(data.accesses)
                setFiles(data.project_file)
            })
            .then(() => {
                getUsersFetch().then(data => setUsers(data))
            });
    }

    useEffect(() => {
        update()
    }, [])


    const delUser = (id) => {
        const arrUsers = project.users_list.split(',')
        const newArrUsers = arrUsers.filter(el => parseInt(el) !== id)
        const newProject = JSON.parse(JSON.stringify(project))
        newProject.users_list = newArrUsers.join(',')
        updateProjectFetch(newProject).then(() => {
            update()
        })
    }

    const addUsers = () => {
        const newProject = JSON.parse(JSON.stringify(project))
        const allUsers = newProject.users_list.concat(checkedUsers)
        const uniqueUsers = new Set(allUsers)
        const usersToArray = [...uniqueUsers]
        const newUsers = usersToArray.map(el => parseFloat(el)).filter(el => !isNaN(el))
        newProject.users_list = newUsers.join(',')
        updateProjectFetch(newProject).then(() => {
            update()
        })
    }

    const updateProjectName = () => {
        const newProject = JSON.parse(JSON.stringify(project))
        newProject.name = projectName
        newProject.description = projectDescription
        newProject.accesses = projectAccesses
        updateProjectFetch(newProject).then(() => {
            update()
        })
    }

    return (
        <div className="projectControl">
            <div className="container">
                <div className={tabValue === 'Project' ? 'tabs first' : 'tabs second'}>
                    <div className="tab project"
                         onClick={() => {
                             setTabValue('Project')
                         }}>
                        Project
                    </div>
                    <div className="tab tasks"
                         onClick={() => {
                             setTabValue('Tasks')
                         }}>
                        Tasks
                    </div>
                    <span className='activeTab'></span>
                </div>
                <div className="tabValue">
                    {
                        tabValue === 'Project'
                            ?
                            <div className="project">
                                <div className="projectWrap">

                                    <div className="users">

                                        {
                                            users.map((arr, index) => {
                                                const users_id = project.users_list.split(',')
                                                for (let i = 0; i < users_id.length; i++) {
                                                    if (arr.id === parseInt(users_id[i])) {
                                                        return (
                                                            <div className="userWrap"
                                                                 key={index}>
                                                                <div className="user">
                                                                    <img src={arr.profile.avatar.image}
                                                                         alt={arr.first_name}/>
                                                                </div>
                                                                <p className="userName">{arr.first_name}</p>
                                                                <span className='delBtn'
                                                                      id={arr.id}
                                                                      onClick={() => {
                                                                          delUser(arr.id)
                                                                      }}
                                                                >-</span>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })
                                        }
                                        <div className='addUserBtn'
                                             onClick={() => {
                                                 setAddUserActive(!addUserActive)
                                             }}>
                                            <span>+</span>
                                        </div>
                                    </div>
                                    <ProjectField value={project.name}
                                                  edit={setProjectName}
                                                  update={updateProjectName}
                                                  uniqId={'asd0'}
                                                  rows={1}/>
                                    <ProjectField value={project.description}
                                                  edit={setProjectDescription}
                                                  update={updateProjectName}
                                                  uniqId={'asd1'}
                                                  rows={6}/>
                                    <ProjectField value={project.accesses}
                                                  edit={setProjectAccesses}
                                                  update={updateProjectName}
                                                  uniqId={'asd3'}
                                                  rows={6}/>
                                    <div className="projectFiles">
                                        <div className="filesWrap">


                                            {
                                                files.length
                                                    ?
                                                    files.map((el, index)=>{
                                                        return(
                                                            <div className="file" key={index}>
                                                                <LinkIcon className="fileIcon"/>
                                                                <h4 className="fileName">{el.file}</h4>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    ''
                                            }


                                            <div className="file">
                                                <DescriptionIcon className="fileIcon"
                                                                 onClick={() => {
                                                                     console.log('file')
                                                                 }}/>
                                                <h4 className="fileName">File Name.png</h4>
                                            </div>



                                            <div className="file">
                                                <LinkIcon className="fileIcon"/>
                                                <h4 className="fileName">File Name.png</h4>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                                <div className="discussion">
                                    <Talk/>
                                </div>
                            </div>
                            :
                            tabValue === 'Tasks'
                                ?
                                <div className="projectTasks">
                                    <div className="projectTasksWrap">

                                    </div>
                                </div>
                                :
                                ''
                    }
                </div>
            </div>
            {
                addUserActive
                    ?
                    <div className='addUserWrap active'>
                        <div className='box'>
                            <UsersAll className="addUser" checkedUsers={checkedUsers}
                                      setCheckedUsers={setCheckedUsers}/>
                            <div className='btns'>
                                <Button className='cancel'
                                        variant='contained'
                                        onClick={() => {
                                            setAddUserActive(!addUserActive)
                                        }}
                                        color='secondary'>Cancel</Button>
                                <Button className='save'
                                        variant='contained'
                                        onClick={() => {
                                            addUsers()
                                            setAddUserActive(!addUserActive)

                                        }}
                                        color='primary'>Save</Button>
                            </div>
                        </div>
                    </div>
                    :
                    ''
            }
            <button onClick={() => {
                console.log('click', project)
            }}>564
            </button>
        </div>
    );
};

export default ProjectControl;