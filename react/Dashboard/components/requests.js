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

export async function getToken(data){
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formData
    }
    const response = await fetch('api/api-token-auth/', options);
    const result = await response.json();
    return result;
}