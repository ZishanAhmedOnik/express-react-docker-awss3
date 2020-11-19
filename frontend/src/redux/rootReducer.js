import { combineReducers } from 'redux';
import contentReducer from './content/contentReducer';
import fileReducer from './files/fileReducer';

const rootReducer = combineReducers({
    fileReducer: fileReducer,
    contentReducer: contentReducer
})

export default rootReducer;