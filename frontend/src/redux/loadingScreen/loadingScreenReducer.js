const { LOADING_STARTED, LOADING_FINISHED } = require("./loadingScreenTypes")

const initialState = {
    showLoading: false
}

const loadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_STARTED:
            return {
                ...state,
                showLoading: true
            }

        case LOADING_FINISHED:
            return {
                ...state,
                showLoading: false
            }

        default:
            return { ...state }
    }
}

export default loadingReducer;