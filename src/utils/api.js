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
  config => {
    // Do something before request is sent
    config.headers['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsibmFtZSI6IlRlc3QgT3JnYW5pemF0aW9uIiwiaWQiOiI1YzM0ZjIxYTBhZTU4MjAwMjIwODAyMmEifSwicHJvZmlsZVBob3RvIjpudWxsLCJpZCI6IjVjMzRmMjFhMGFlNTgyMDAyMjA4MDIyYiIsImlzRnVuZGVyIjp0cnVlLCJpc0V2YWx1YXRvciI6ZmFsc2UsImlzQ29udHJhY3RvciI6ZmFsc2UsImZpcnN0TmFtZSI6IlRlc3QiLCJwaG9uZSI6IjA4MDAwMDAiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwibGFzdE5hbWUiOiJVc2VyT25lIiwiaWF0IjoxNTQ2OTgyOTg1LCJleHAiOjE1NDcwNjkzODV9.w75TJT1PAP9F_DZyVxCTce0hT_vhq1Z55WWYleQBdA8';//this.userToken;
    return config;
  },
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
    return error.response;
    // return Promise.reject(error);
  },
);

export const login = async data => {
  try {
    const resp = await axios.post('/login', data);
    return resp;
  } catch (err) {
    return err;
  }
};

export const signUp = async data => {
  try {
    const resp = await axios.post('/register', data);
    return resp;
  } catch (err) {
    return err;
  }
};

export const addProject = async data => {
  try {
    const resp = await axios.post('/project', data);
    return resp;
  } catch (err) {
    return err;
  }
};

