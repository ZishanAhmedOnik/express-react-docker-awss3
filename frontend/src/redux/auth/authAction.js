import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../../helpers/SetAuthToken';
import { listFiles } from '../files/fileAction';

import { loadingFinished, loadingStarted } from '../loadingScreen/loadingScreenAction';
import { LOGIN_USER, LOGOUT_USER } from './authTypes';

export const registerUser = (userData) =>  async (dispatch) => {
    dispatch(loadingStarted())

    try {
        await axios.post('http://localhost:8080/auth/register', userData);
    } catch(err) {
        console.log(err);
    } finally {
        dispatch(loadingFinished())
    }
}

const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const login = (credentials) => async (dispatch) => {
    dispatch(loadingStarted());

    try {
        let result = await axios.post('http://localhost:8080/auth/login', credentials);
        const { accessToken, refreshToken } = result.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        setAuthToken(accessToken);

        dispatch(loginUser(jwt.decode(accessToken)));
    } catch(err) {
        console.log(err);
    } finally {
        dispatch(loadingFinished())
    }
}

export const logout = () => (dispatch) => {
    dispatch(listFiles([]));

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setAuthToken('');

    dispatch(logoutUser());
}