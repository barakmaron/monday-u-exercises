import actionTypes from "../actions/constants";
import ApiService from '../Api/ApiManger';
const initialState = {
  tasks: []
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS:
      return { tasks: action.payload.tasks };
    case actionTypes.ADD_TASK:
      return state;
    case actionTypes.DONE_TASK:
      return state;
    case actionTypes.DELETE_TASK:
      return state;
    case actionTypes.EDIT_TASK:
      return state;
    case actionTypes.CLEAR_ALL:
      return state;
    case actionTypes.SORT_BY_NAME:
      return { tasks: action.payload.tasks };
    default:
      return state;
  }
};

export function GetTodos() {
  return async function fetchTodos(dispatch, getState) {
    const response = await ApiService.GetResourceRequest('task');
    dispatch({ type: actionTypes.GET_TASKS, payload: response });
  }
}

export function AddTodo(text) {
  return async function AddTodoThunk(dispatch, getState) {
    const response = await ApiService.AddNewResourceRequest(`task`, { task: text });
    dispatch({ type: actionTypes.ADD_TASK, payload: response });
  }
}

export function CompleteTodo(id) {
  return async function CompleteTodoThunk(dispatch, getState) {
    const response = await ApiService.PatchResourceRequest(`task/${id}`);
    dispatch({ type: actionTypes.DONE_TASK, payload: response });
  }
}

export function DeleteTodo(id) {
  return async function DeleteTodoThunk(dispatch, getState) {
    const response = await ApiService.DeleteResourceRequest(`task/${id}`);
    dispatch({ type: actionTypes.DELETE_TASK, payload: response });
  }
}

export function EditTodo(id, text) {
  return async function EditTodoThunk(dispatch, getState) {
    const response = await ApiService.PutResourceRequest(`task/${id}`, { task_text: text });
    dispatch({ type: actionTypes.EDIT_TASK, payload: response });
  }
}

export function ClearAll() {
  return async function ClearAllTodosThunk(dispatch, getState) {
    const response = await ApiService.DeleteResourceRequest(`task`);
    dispatch({ type: actionTypes.CLEAR_ALL, payload: response });
  }
}

export function SortByName() {
  return async function SortByNameThunk(dispatch, getState) {
    const response = await ApiService.GetResourceRequest(`task/sortbyname`);
    dispatch({ type: actionTypes.SORT_BY_NAME, payload: response });
  }
}


export default itemsEntitiesReducer;
