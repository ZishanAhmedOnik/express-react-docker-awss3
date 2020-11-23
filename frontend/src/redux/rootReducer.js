import { combineReducers } from 'redux';
import contentReducer from './content/contentReducer';
import fileReducer from './files/fileReducer';
import loadingReducer from './loadingScreen/loadingScreenReducer';

const rootReducer = combineReducers({
    fileReducer: fileReducer,
    contentReducer: contentReducer,
    loadingReducer: loadingReducer
})

export default rootReducer;