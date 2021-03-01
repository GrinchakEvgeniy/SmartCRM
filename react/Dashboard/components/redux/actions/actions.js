import * as types from "../constants/constants";


export function newNotification(data){
    return {
        type: types.NOTIFICATION,
        data
    }
}

export function getUser(data){
    return {
        type: types.GET_USER,
        data
    }
}

export function setSocket(data){
    return {
        type: types.SOCKET,
        data
    }
}