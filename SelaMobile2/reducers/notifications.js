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
            console.log('got to this reducer side', action.notifications)
            return { ...state, notifications: action.notifications };
        case types.UPDATE_NOTIFICATION:
            return { ...state, notifications: action.notifications };
        case types.NOTIFICATION_IS_LOADING:
            return { ...state, loading: action.isLoading };
        case types.NOTIFICATION_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default notificationsReducer;
