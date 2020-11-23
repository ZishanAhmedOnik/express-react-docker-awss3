import { LOADING_FINISHED, LOADING_STARTED } from "./loadingScreenTypes"

export const loadingStarted = () => {
    return {
        type: LOADING_STARTED
    }
}

export const loadingFinished = () => {
    return {
        type: LOADING_FINISHED
    }
}