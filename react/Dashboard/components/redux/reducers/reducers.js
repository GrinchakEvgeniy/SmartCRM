import * as types from "../constants/constants";

const initialState = {
    user_data: {},
    web_socket: null
}

const rootReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            return { ...state, user_data: action.data };
            break;
        case types.SOCKET:
            return { ...state, web_socket: action.data };
            break;
        default:
            return state;
    }
}
export default rootReducer;