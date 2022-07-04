import actionTypes from './constants/index';
 
function GetTasks(){
    return {
        type: actionTypes.GET_TASKS
    }
}


export const GetTasksAction = () => {
    return dispatch => {
        dispatch(GetTasks());
    }
}