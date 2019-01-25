import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import projects from './project';
import notifications from './notifications';


const rootReducer = combineReducers({
  token,
  userInfo,
  projects,
  notifications,
});

export default rootReducer;
