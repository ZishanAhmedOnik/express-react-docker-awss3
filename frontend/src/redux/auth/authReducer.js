import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "./authTypes";

const initalState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }

        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: { }
            }

        default:
            return {
                ...state
            }
    }
}

export default authReducer;