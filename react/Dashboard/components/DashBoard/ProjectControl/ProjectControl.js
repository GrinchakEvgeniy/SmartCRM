import React, {useEffect, useState} from 'react';
import './ProjectControl.scss';
import {
    getProjectFetch,
    getUserFetch,
    getUsersFetch,
    postProjectFilesFetch,
    putAvatarFetch,
    updateProjectFetch,
    deleteProjectFilesFetch
} from "../../requests";
import ProjectField from "./ProjectField";
import DescriptionIcon from '@material-ui/icons/Description';
import Talk from "../Talk/Talk";
import UsersAll from "../UsersAll/UsersAll";
import Button from "@material-ui/core/Button";
import Tasks from "../Tasks/Tasks";
import {getUser} from "../../redux/actions/actions";
import {connect} from "react-redux";
import {isEmpty} from "../../helper";

const ProjectControl = (props) => {

    const audio = new Audio('/static/images/Goat.mp3')

    const [tabValue, setTabValue] = useState('Tasks')
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectAccesses, setProjectAccesses] = useState('')
    const [files, setFiles] = useState([])
    const [users, setUsers] = useState([]);
    const [addUserActive, setAddUserActive] = useState(false)
    const [checkedUsers, setCheckedUsers] = useState([])
    const [imgs, setImages] = useState(['png', 'jpeg', 'jpg', 'gif', 'webp'])
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentUserName, setCurrentUserName] = useState('')

    useEffect(() => {
        if (!isEmpty(props.user_data)) {
            if (props.user_data.id === 0) return;
            setCurrentUserId(props.user_data.id)
            setCurrentUserName(props.user_data.first_name)
        }
    }, [props.user_data]);


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

        const newUniq = (arr)=>{
            let res = []
            for(let str of arr){
                if(!res.includes(str)){
                    res.push(str)
                }
            }
            return res
        }

        const newProject = JSON.parse(JSON.stringify(project))
        const allUsers = newProject.users_list.concat(',' + checkedUsers).split(',')
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

    const delProjectFile = (fileId) => {
        const deletedFile = [fileId]
        const obj = {"ids": deletedFile}
        deleteProjectFilesFetch(obj).then(() => {
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
                    <div className="tab tabTasks"
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
                                </div>
                                <div className="usersAndFiles">
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
                                    <div className="projectFiles">
                                        <div className="filesWrap">
                                            {
                                                files.length
                                                    ?
                                                    files.map((el, index) => {
                                                        return (
                                                            <a className="file"
                                                               href={el.file}
                                                               download
                                                               key={index}>

                                                                <div className="fileIcon">
                                                                    {
                                                                        imgs.indexOf(el.file.split('.').pop()) !== -1
                                                                            ?
                                                                            <img src={el.file} alt=""/>
                                                                            :
                                                                            <DescriptionIcon/>
                                                                    }
                                                                </div>
                                                                <h4 className="fileName">{el.file.split('/').pop()}</h4>
                                                                <span className="delBtn"
                                                                      onClick={(e) => {
                                                                          e.preventDefault()
                                                                          delProjectFile(el.id)
                                                                      }}
                                                                      id="9">-</span>
                                                            </a>
                                                        )
                                                    })
                                                    :
                                                    ''
                                            }
                                        </div>
                                        <Button className="addFileBtn"
                                                color='secondary'
                                                variant="contained"
                                                onChange={(event) => {
                                                    postProjectFilesFetch(event.target.files, project.id)
                                                        .then(() => {
                                                            update()
                                                        })
                                                }}
                                                component="label">
                                            +
                                            <input type="file" hidden/>
                                        </Button>
                                    </div>
                                </div>
                                <div className="discussion">
                                    <Talk project={project}
                                          userId={currentUserId}
                                          currentUserName={currentUserName}
                                          update={update}/>
                                </div>
                            </div>
                            :
                            tabValue === 'Tasks'
                                ?
                                <div className="projectTasks">
                                    <div className="tasksControl">
                                        <Button className='addBtn'
                                                variant="contained"
                                                color="primary">
                                            Add single task
                                        </Button>
                                        <Button className='addBtn'
                                                variant="contained"
                                                color="primary">
                                            add task group
                                        </Button>
                                    </div>
                                    <div className="allTasks">
                                        <Tasks/>
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

            <button
                onClick={() => {
                    audio.play()
                }}
            >CLICK
            </button>

        </div>
    );
};


const putState = (state) => {
    return {user_data: state.user_data}
}
const putDispatch = (dispatch) => {
    return {updateUserData: (data) => dispatch(getUser(data))}
}
export default connect(putState, putDispatch)(ProjectControl);