import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        console.log('SETTING TOKEN!');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        console.log('DELETING TOKEN TOKEN!');

        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;