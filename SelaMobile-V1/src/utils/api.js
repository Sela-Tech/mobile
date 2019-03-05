/* eslint no-console: ["error", { allow: ["log"] }] */

import Axios from 'axios';
import { RNS3 } from 'react-native-aws3';
import { BASE_URL } from './constants';
import { AsyncStorage } from 'react-native';
import NavigationService from '../services/NavigationService';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
    origin: 'https://sela-test.now.sh',
  },
});

const axios2 = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    origin: 'https://sela-test.now.sh',
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers['x-access-token'] = this.userToken;
    return config;
  },
  error => {
    // Do something with response error
    console.log('API ERR:', error.message);
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message === 'jwt expired') {
      AsyncStorage.removeItem('user');
      NavigationService.navigate('Login');
    }

    else if (error.response.data.message === 'jwt malformed') {
      try {
        AsyncStorage.removeItem('user');
        NavigationService.navigate('Login');
      }
      catch (err) {
        console.log('err', err.message);
      }

    }
    // Do something with response error
    console.log('API ERR:', error.message);
    // return error.response;
    return Promise.reject(error);
  },
);

const options = {
  keyPrefix: 'uploads/',
  // bucket: 'selamvp',
  bucket: 'iracks-dump',
  region: 'us-east-1',
  successActionStatus: 201,
};

export const uploadToAWS = (file, data, cred) => {
  options.accessKey = cred.key;
  options.secretKey = cred.secret;

  return RNS3.put(file, options)
    .then(response => {
      if (response.status !== 201) {
        return false;
      }
      return response.body;
    })
    .catch(() => false);
};

export const getPassCredentials = async () => {
  try {
    return await axios.get('/cred');
    // await axios.get('https://sela-site-backend.now.sh/credentials');
  } catch (err) {
    return err;
  }
};

export const login = async data => {
  try {
    return await axios2.post('/login', data);
  } catch (err) {
    return err;
  }
};

export const signUp = async data => {
  try {
    return await axios2.post('/register', data);
  } catch (err) {
    return err;
  }
};

export const getUserDetails = async data => {
  try {
    return await axios.post('/users/i', data);
  } catch (err) {
    return err;
  }
};

export const addProject = async data => {
  try {
    return await axios.post('/project', data);
  } catch (err) {
    return err;
  }
};

export const getSingleProject = async id => {
  try {
    return await axios.get(`/project/${id}`);
  } catch (err) {
    return err;
  }
};

export const getAllProjects = async () => {
  try {
    return await axios.get(`/projects`);
  } catch (err) {
    return err;
  }
};

// View  project  assaigned to a contractor
export const viewAssignedProject = async () => {
  try {
    return await axios.get(`/stakeholder/projects`);
  } catch (err) {
    return err;
  }
};

export const getGoogleApiKey = async () => {
  try {
    return await axios.get(`/stakeholder/projects`);
  } catch (err) {
    return err;
  }
};

// Assign evaluation agent to project
export const assignEvaluationAgentToProject = async projectId => {
  try {
    return await axios.put(`project/${projectId}/accept`, { agreed: true });
  } catch (err) {
    return err;
  }
};

// get all users
export const getAllUsers = async () => {
  try {
    return await axios.get('/users');
  } catch (err) {
    return err;
  }
};

export const getUserNotifications = async () => {
  try {
    return axios.get('/notifications');
  } catch (err) {
    return err;
  }
};

export const updateNotifications = async datum => {
  try {
    const data = {
      unreadNIds: datum,
    };
    return axios.post('/notifications/mark-as-read', data);
  } catch (err) {
    return err;
  }
};

export const forgotPassword = async data => {
  try {
    return axios.put('/forgot-password', data);
  } catch (err) {
    return err;
  }
};

export const updateProfile = async data => {
  try {
    return axios.post('/update', data);
  } catch (err) {
    return err;
  }
};

export const dashboardRequest = async (type, pageNo, limit) => {
  try {
    return axios.get(`/user/dashboard-request?cat=${type}&limit=${limit}&${pageNo}=${pageNo}`);
  } catch (err) {
    return err;
  }
};

export const getAllSavedProject = async () => true;

export const saveProject = async projectId => {
  try {
    return axios.get(`/user/project/${projectId}/save`);
  } catch (err) {
    return err;
  }
};

export const getAllfeaturedProjects = async query => {
  try {
    return Axios.get(`${BASE_URL}/projects?${query !== '' ? `limit=12&${query}` : 'limit=12'}`, {
      headers: {
        public: true,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return err;
  }
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsibmFtZSI6InRlc3QiLCJpZCI6IjVjNGVkNmYzZTdjMTM4MDAyMjI3NzY0YiJ9LCJwcm9maWxlUGhvdG8iOm51bGwsImlkIjoiNWM0ZWQ3OWFlN2MxMzgwMDIyMjc3NjRmIiwiaXNGdW5kZXIiOmZhbHNlLCJpc0V2YWx1YXRvciI6ZmFsc2UsImlzQ29udHJhY3RvciI6dHJ1ZSwiZmlyc3ROYW1lIjoiRGF2aWQiLCJwaG9uZSI6IjEyMzQ1Njc4OSIsImVtYWlsIjoiYWJpbWJvbGEuZEBzZWxhLWxhYnMuY28iLCJsYXN0TmFtZSI6IkFiaW1ib2xhIiwiYXJlYXNPZkludGVyZXN0IjpbXSwiaWF0IjoxNTQ5NjA3MzAzLCJleHAiOjE1NTAyMTIxMDN9.DCEnxDyx1drBSdaN3tBzCPk98aDJo71V8oWSheNEzQQ