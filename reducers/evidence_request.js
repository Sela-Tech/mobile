import * as types from '../actions/actionTypes';

const requestReducer = (
  state = {
    request: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_EVIDENCE_REQUEST:
      return { ...state, request: action.request };
    case types.UPDATE_REQUEST:
      const req = state.request.map(c => {
        if (c._id === action.id) {
          c.status = 'Completed';
          return c;
        }
        return c;
      });
      return { ...state, request: req };
    case types.GET_EVIDENCE_REQUEST_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.GET_EVIDENCE_REQUEST_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default requestReducer;
