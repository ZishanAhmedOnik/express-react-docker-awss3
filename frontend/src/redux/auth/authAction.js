import axios from 'axios';
import { loadingFinished, loadingStarted } from '../loadingScreen/loadingScreenAction';

export const registerUser = (userData) =>  async (dispatch) => {
    dispatch(loadingStarted())

    try {
        let result = await axios.post('http://localhost:8080/auth/register', userData);

        console.log("result of action ", result.data);

    } catch(err) {
        console.log(err);
    } finally {
        dispatch(loadingFinished())
    }
}