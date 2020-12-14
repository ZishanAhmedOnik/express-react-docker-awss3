import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import contentReducer from './content/contentReducer';
import fileReducer from './files/fileReducer';
import loadingReducer from './loadingScreen/loadingScreenReducer';

const rootReducer = combineReducers({
    fileReducer: fileReducer,
    contentReducer: contentReducer,
    loadingReducer: loadingReducer,
    authReducer: authReducer
})

export default rootReducer;