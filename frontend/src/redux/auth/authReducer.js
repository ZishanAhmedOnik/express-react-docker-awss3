import { REGISTER_USER } from "./authTypes";

const initalState = {
    user: {}
}

const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default authReducer;