import * as types from '../actions/actionTypes';

const projectReducer = (
  state = {
    projects: {},
    loading: true,
    error: null,
    contrProjects: {},
  },
  action,
) => {
  switch (action.type) {
    case types.GET_PROJECTS:
      return { ...state, projects: action.projects };
    case types.GET_CONTRACTOR_PROJECTS:
      return { ...state, contrProjects: action.contrProjects };
    case types.PROJECT_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.HANDLE_PROJECT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default projectReducer;
