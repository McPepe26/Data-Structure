import axios from 'axios';

export const clientAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
});

export const tokenAuth = token => {
    if(token) {
        clientAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clientAxios.defaults.headers.common['x-auth-token'];
    }
}

export const tokenExists = () => {
    let token = localStorage.getItem('token');
    return token !== null;
}

