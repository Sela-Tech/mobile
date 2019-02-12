/* eslint no-console: ["error", { allow: ["log"] }] */

import Axios from 'axios';
import { RNS3 } from 'react-native-aws3';
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
    return axios.post('/forgot-password', data);
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
