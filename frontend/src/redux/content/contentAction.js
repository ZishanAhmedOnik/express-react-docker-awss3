const { CONTENT_SELECT } = require("./contentType")

export const selectContent = (contentKey) => {
    return {
        type: CONTENT_SELECT,
        payload: contentKey
    }
}