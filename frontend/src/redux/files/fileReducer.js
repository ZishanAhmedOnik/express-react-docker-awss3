const { FETCH_LIST_FILES, FILE_UPLOADED } = require("./fileType")

const initialState = {
    files: []
}

const fileReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LIST_FILES:
            return {
                ...state,
                files: action.payload
            }

        case FILE_UPLOADED:
            return {
                ...state,
                files: [...state.files, action.payload]
            }

        default: return state;
    }
}

export default fileReducer;