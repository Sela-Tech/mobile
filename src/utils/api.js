import Axios from 'axios';
import { BASE_URL } from './constants';

const axios = Axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axios.interceptors.request.use(
    config => config,
    error => {
        // Do something with request error
        // Do something with response error
        console.log('API ERR:', error.message);
        return Promise.reject(error);
    },
);

// Add a response interceptor
axios.interceptors.response.use(
    response => response,
    error => {
        // Do something with response error
        console.log('API ERR:', error.message);
        return Promise.reject(error);
    },
);
