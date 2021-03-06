function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function getToken(data) {
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formData
    }
    const response = await fetch('/api/api-token-auth/', options);
    const result = await response.json();
    return result;
}

export async function getUserFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-user', options);
    const result = await response.json();
    return result;
}

export async function getRolesFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-roles', options);
    const result = await response.json();
    return result;
}

export async function getProjectsSimpleFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-projects-simple', options);
    const result = await response.json();
    return result;
}

export async function getUsersFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-users', options);
    const result = await response.json();
    return result;
}

export async function updateUserFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-user', options);
    const result = await response.json();
    return result;
}

export async function changeUserRoleFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/change-user-role', options);
    const result = await response.json();
    return result;
}

export async function getClientsFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-clients', options);
    const result = await response.json();
    return result;
}

export async function postClientFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-clients', options);
    const result = await response.json();
    return result;
}

export async function postProjectSimpleFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-projects-simple', options);
    const result = await response.json();
    return result;
}

export async function delProjectSimpleFetch(id) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: id}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-projects-simple', options);
    const result = await response.json();
    return result;
}

export async function createUserFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-user', options);
    const result = await response.json();
    return result;
}

export async function deleteClientFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-client', options);
    const result = await response.json();
    return result;
}

export async function deleteUserFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-user', options);
    const result = await response.json();
    return result;
}

export async function putAvatarFetch(id, files) {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("image", files[0], files[0].name);
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: formData
    }
    const response = await fetch('/api/put-avatar', options);
    const result = await response.json();
    return result;
}

export async function getProjectFetch(id) {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-project/' + id, options);
    const result = await response.json();
    return result;
}


export async function updateProjectFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-projects-simple', options);
    const result = await response.json();
    return result;
}

export async function getEventsFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-events', options);
    const result = await response.json();
    return result;
}

export async function createEventFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-events', options);
    const result = await response.json();
    return result;
}

export async function deleteEventFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-events', options);
    const result = await response.json();
    return result;
}

export async function changeEventFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-events', options);
    const result = await response.json();
    return result;
}

export async function postProjectFilesFetch(file, projectId) {
    let formData = new FormData();
    formData.append("file", file[0], file[0].name);
    formData.append("project_id", projectId);
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formData
    }
    const response = await fetch('/api/post-files-project', options);
    const result = await response.json();
    return result;
}


export async function deleteProjectFilesFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-files-project', options);
    const result = await response.json();
    return result;
}

export async function createProjectMessageFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-project-comments', options);
    const result = await response.json();
    return result;
}

export async function createWorkNowFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-work-now', options);
    const result = await response.json();
    return result;
}

export async function putWorkNowFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-work-now', options);
    const result = await response.json();
    return result;
}

export async function deleteWorkNowFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-work-now', options);
    const result = await response.json();
    return result;
}

export async function getWorkNowByDateFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-work-now-by-date', options);
    const result = await response.json();
    return result;
}

export async function postProjectNestedTaskFilesFetch(file, projectNestedTaskId) {
    let formData = new FormData();
    formData.append("file", file[0], file[0].name);
    formData.append("project_nested_task_id", projectNestedTaskId);
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formData
    }
    const response = await fetch('/api/post-nested-task-file', options);
    const result = await response.json();
    return result;
}

export async function delProjectNestedTaskFilesFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-nested-task-file', options);
    const result = await response.json();
    return result;
}

export async function postProjectTaskNameFetch(taskId, taskName) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: taskId, name: taskName}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-task', options);
    const result = await response.json();
    return result;
}

export async function postProjectNestedTaskNameFetch(taskId, taskName, status, worker) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: taskId, name: taskName, status: status, worked_user_id: worker}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-nested-task', options);
    const result = await response.json();
    return result;
}

export async function postProjectNestedTaskDescriptionFetch(taskId, description) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: taskId, description: description}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-nested-task', options);
    const result = await response.json();
    return result;
}

export async function postProjectNestedTaskWorkerFetch(taskId, worker) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: taskId, worked_user_id: worker}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-nested-task', options);
    const result = await response.json();
    return result;
}

export async function postNewTaskGroupFetch(project_id, created_user_id, name) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({project_id: project_id, created_user_id: created_user_id, name: name}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-task', options);
    const result = await response.json();
    return result;
}

export async function delTaskGroupFetch(taskId) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: taskId}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-task', options);
    const result = await response.json();
    return result;
}

export async function postNewNestedTaskFetch(name, status, project_task_id, created_user_id) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
            name: name,
            status: status,
            project_task_id: project_task_id,
            created_user_id: created_user_id,
        }),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-nested-task', options);
    const result = await response.json();
    return result;
}

export async function delNestedTaskFetch(project_task_id) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
            id: project_task_id,
        }),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-nested-task', options);
    const result = await response.json();
    return result;
}

export async function getStatuteFetch() {
    const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-company-info', options);
    const result = await response.json();
    return result;
}

export async function postStatuteFetch(data) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({description: data}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/post-company-info', options);
    const result = await response.json();
    return result;
}

export async function putStatuteFetch(data, id) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({id: id, description: data}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-company-info', options);
    const result = await response.json();
    return result;
}


export async function getNotificationFetch(id) {
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({"user_id": id}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/get-notification-read', options);
    const result = await response.json();
    return result;
}


export async function delNotificationReadFetch(data) {
    const options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({"ids": data}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/delete-notification-read', options);
    const result = await response.json();
    return result;
}

export async function readNotificationFetch(data) {
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({"ids": data, "action": "readed"}),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie('userToken'),
        }
    }
    const response = await fetch('/api/put-notification-read', options);
    const result = await response.json();
    return result;
}