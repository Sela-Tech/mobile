import * as API from '../src/utils/api';
import * as types from './actionTypes';

export const getFunderProjects = projects => ({
  type: types.GET_PROJECTS,
  projects,
});

export const saveContractorProjects = contrProjects => ({
  type: types.GET_CONTRACTOR_PROJECTS,
  contrProjects,
});

export const projectIsLoading = bool => ({
  type: types.PROJECT_IS_LOADING,
  isLoading: bool,
});

export const projectIsLoadingError = error => ({
  type: types.HANDLE_PROJECT_ERROR,
  error,
});

export const getUserProject = () => dispatch =>
  API.getAllProjects()
    .then(resp => {
      dispatch(projectIsLoading(false));
      dispatch(getFunderProjects(resp.data));
    })
    .catch(err => {
      dispatch(projectIsLoading(false));
      dispatch(projectIsLoadingError(err.message || 'ERROR'));
    });

export const getContractorProject = () => dispatch =>
  API.viewAssignedProject()
    .then(resp => {
      dispatch(projectIsLoading(false));
      dispatch(saveContractorProjects(resp.data));
    })
    .catch(err => {
      dispatch(projectIsLoading(false));
      dispatch(projectIsLoadingError(err.message || 'ERROR'));
    });
