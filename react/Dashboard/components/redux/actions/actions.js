import * as types from "../constants/constants";
import {GET_USER} from "../constants/constants";


export function getUser(data){
    return {
        type: GET_USER,
        data
    }
}