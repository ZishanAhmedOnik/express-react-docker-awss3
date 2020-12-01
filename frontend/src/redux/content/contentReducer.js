const { CONTENT_SELECT } = require("./contentType");

const initalState = {
    selectedContent: {  }
}

const contentReducer = (state = initalState, action) => {
    switch(action.type) {
        case CONTENT_SELECT:
            return {
                ...state,
                selectedContent: action.payload
            }

        default:
            return state;
    }
}

export default contentReducer;