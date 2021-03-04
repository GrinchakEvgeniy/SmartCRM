import React, {useEffect, useState} from 'react';
import './Tasks.scss'
import {getProjectFetch, getUsersFetch} from "../../requests";
import TasksGroup from "./TasksGroup";


const Tasks = () => {

    const [taskGroups, setTaskGroups] = useState([])

    useEffect(() => {
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setTaskGroups(data.project_task)
            })
        getUsersFetch()
            .then(data => console.log('users', data))
    }, [])

    const update = () => {
        getProjectFetch(window.location.href.split('/').pop())
            .then(data => {
                setTaskGroups(data.project_task)
            })
    }

    return (
        <div className='tasks'>
            {
                taskGroups.map((el, index) => {
                    return (
                        <TasksGroup tasks={el} key={index} update={update}/>
                    )
                })
            }
        </div>
    );
};

export default Tasks;


// {
//     tasks.map((el, index) => {
//         const nestedTasks = el.project_nested_task
//         return (
//             <div key={index}>
//                 <div className="tasksHeader"
//                      onClick={() => {
//                          setEditName(!editName)
//                      }}>
//                     <div className="creatorName">
//                         <h5>Creator name id {el.created_user_id}</h5>
//                     </div>
//                     <div className="taskGroupName">
//                         {
//                             editName
//                                 ?
//                                 <input type="text" value={el.name}/>
//                                 :
//                                 <h3>Project name {el.name}</h3>
//                         }
//                     </div>
//                     <div className="numberOfTasks">
//                         <h6>{el.project_nested_task.length} tasks</h6>
//                     </div>
//                     <span className='progress'></span>
//                     <EditIcon className='editIcon'
//                               onClick={() => {
//
//                               }}/>
//                 </div>
//                 <div className="allTasksProject">
//                     {
//                         nestedTasks.map((elem, ind) => {
//                             return (
//                                 <Task task={elem}
//                                       update={update}
//                                       number={index + 1}
//                                       key={ind}/>
//                             )
//                         })
//                     }
//                 </div>
//                 <button onClick={() => {
//                     console.log(tasks)
//                 }}>
//                     show task
//                 </button>
//             </div>
//         )
//     })
// }