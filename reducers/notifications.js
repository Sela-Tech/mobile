import * as types from '../actions/actionTypes';

const notificationsReducer = (
  state = {
    notifications: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_ALL_USER_NOTIFICATION:
      const d = { ...state, notifications: action.notifications };
      return { ...state, notifications: action.notifications };
    case types.UPDATE_NOTIFICATION:
      const newObj = state.notifications.notifications.map(b => {
        if (b._id === action.notificationID) {
          b.action = 'NOT_REQUIRED';
          return b;
        }
        return b;
      });
      return { ...state, notifications: { notifications: newObj } };
    case types.GET_NEW_NOTIFICATION:
      const newState = Object.assign({}, state, {
        notifications: action.notifications.notifications,
      });
      return { ...state, ...newState };
    case types.NOTIFICATION_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.NOTIFICATION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default notificationsReducer;
