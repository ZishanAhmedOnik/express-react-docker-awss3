import { combineReducers } from 'redux';
import fileReducer from './files/fileReducer';

const rootReducer = combineReducers({
    fileReducer: fileReducer
})

export default rootReducer;