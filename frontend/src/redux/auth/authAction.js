import axios from 'axios';
import { loadingFinished, loadingStarted } from '../loadingScreen/loadingScreenAction';

export const registerUser = (userData) =>  async (dispatch) => {
    dispatch(loadingStarted())

    try {
        let result = await axios.post('http://localhost:8080/auth/register', userData);
    } catch(err) {
        console.log(err);
    } finally {
        dispatch(loadingFinished())
    }
}

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loadingStarted());

    try {
        let result = await axios.post('http://localhost:8080/auth/login', credentials);

        console.log(result.data);
    } catch(err) {
        console.log(err);
    } finally {
        dispatch(loadingFinished())
    }
}