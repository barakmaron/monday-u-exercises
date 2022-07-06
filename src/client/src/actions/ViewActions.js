import actionType from './constants/index';

export const FailedAction = (text) => {
    return dispatch => {
       dispatch({ type: actionType.FAILED, payload: text});
    }
}

export const SearchAction = (text) => {
    return dispatch => {
        dispatch({ type: actionType.SEARCH, payload: text});
    }
}

export const HideDoneAction = () => {
    return dispatch => {
        dispatch({ type: actionType.HIDE_DONE });
    }
}