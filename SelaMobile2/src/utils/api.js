import Axios from 'axios';
import { BASE_URL } from './constants';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axios2 = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers['x-access-token'] = this.userToken;
    // config.headers['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsibmFtZSI6IlRlc3QgT3JnYW5pemF0aW9uIiwiaWQiOiI1YzM0ZjIxYTBhZTU4MjAwMjIwODAyMmEifSwicHJvZmlsZVBob3RvIjoiaHR0cHM6Ly9zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9zZWxhbXZwL3VzZXItYXZhdGFycy80YTdmNzgwMC04MTdmLTRhZmUtYmYzNi03NjNlYmVjYmJiMjNfcGV4ZWxzLXBob3RvLTQ2MjY4MC5qcGVnIiwiaWQiOiI1YzM0ZjIxYTBhZTU4MjAwMjIwODAyMmIiLCJpc0Z1bmRlciI6dHJ1ZSwiaXNFdmFsdWF0b3IiOmZhbHNlLCJpc0NvbnRyYWN0b3IiOmZhbHNlLCJmaXJzdE5hbWUiOiJUZXN0IiwicGhvbmUiOiIwODAwMDAwIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiSmFtaWUiLCJpYXQiOjE1NDc4NDcwNTMsImV4cCI6MTU0NzkzMzQ1M30.J_qE-qYMqzCwTsv73-68NBGwoeQWnz5hQ1dKTMTuRvg'
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
    const resp = await axios2.post('/login', data);
    return resp;
  } catch (err) {
    return err;
  }
};

export const signUp = async data => {
  try {
    const resp = await axios2.post('/register', data);
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

export const getSingleProject = async id => {
  try {
    const resp = await axios.get(`/project/${id}`);
    return resp;
  } catch (err) {
    return err;
  }
};

export const getAllProjects = async () => {
  try {
    const resp = await axios.get(`/projects`);
    // console.log('get -user project', resp.data)
    return resp;
  } catch (err) {
    return err;
  }
};

// View  project  assaigned to a contractor
export const viewAssignedProject = async () => {
  try {
    const resp = await axios.get(`/stakeholder/projects`);
    // console.log('get -contractor project', resp.data)
    return resp;
  } catch (err) {
    return err;
  }
};

export const getGoogleApiKey = async () => {
  try {
    const resp = await axios.get(`/stakeholder/projects`);
    return resp;
  } catch (err) {
    return err;
  }
};

// Assign evaluation agent to project
export const assignEvaluationAgentToProject = async projectId => {
  try {
    const resp = await axios.put(`project/${projectId}/accept`, { agreed: true });
    return resp;
  } catch (err) {
    return err;
  }
};

// get all users
export const getAllUsers = async () => {
  try {
    const resp = axios.get('/users');
    return resp;
  } catch (err) {
    return err;
  }
};

export const getUserNotifications = async () => {
  try {
    const resp = axios.get('/notifications');
    return resp;
  } catch (err) {
    return err;
  }
};

export const updateNotifications = async datum => {
  try {
    const data = {
      unreadNIds: datum,
    };
    console.log('data,i am sending', data);
    const resp = axios.post('/notifications/mark-as-read', data);
    return resp;
  } catch (err) {
    return err;
  }
};
