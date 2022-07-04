import actionTypes from "../actions/constants";
import ApiService from '../Api/ApiManger';
const initialState = {
  tasks: []
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS:
      return { tasks: action.payload };
    default:
      return state;
  }
};

export async function fetchTodos(dispatch, getState) {
  const response = await ApiService.GetResourceRequest('task');
  dispatch({ type: actionTypes.GET_TASKS, payload: response.tasks })
}

export default itemsEntitiesReducer;
