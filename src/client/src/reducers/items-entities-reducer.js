import actionTypes from "../actions/constants";
import ApiService from '../Api/ApiManger';
import { getItems } from "../selectors/items-entities-selectors";
import { Strings } from '../globals/Strings';

const initialState = {
  tasks: [],
  deleted: {}
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS:
      return { ...state, tasks: action.payload.tasks };
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
      return { ...state, tasks: action.payload.tasks };
    case actionTypes.SAVE_DELETED:
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

function GetTodos() {
  return async function fetchTodos(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.GetResourceRequest('task');
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.GET_TASKS, payload: response });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function AddTodo(text) {
  return async function AddTodoThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.AddNewResourceRequest(`task`, { task: text });      
      dispatch({ type: actionTypes.ADD_TASK, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.NewTodoSuccessful });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function CompleteTodo(id) {
  return async function CompleteTodoThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.PatchResourceRequest(`task/${id}`);      
      dispatch({ type: actionTypes.DONE_TASK, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.CompleteTodo(id) });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function DeleteTodo(id) {
  return async function DeleteTodoThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const tasks = getItems(getState());
      const [task_to_save] = tasks.filter((task) => task.id === id);      
      dispatch({ type: actionTypes.SAVE_DELETED, payload: task_to_save });
      const response = await ApiService.DeleteResourceRequest(`task/${id}`);
      dispatch({ type: actionTypes.DELETE_TASK, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.DeleteTodo(id) });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function EditTodo(id, text) {
  return async function EditTodoThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.PutResourceRequest(`task/${id}`, { task_text: text });
      dispatch({ type: actionTypes.EDIT_TASK, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.EditTodo(id) });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function ClearAll() {
  return async function ClearAllTodosThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.DeleteResourceRequest(`task`);
      dispatch({ type: actionTypes.CLEAR_ALL, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.ClearAll });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

function SortByName() {
  return async function SortByNameThunk(dispatch, getState) {
    try {
      dispatch({ type: actionTypes.LOADING, payload: true});
      const response = await ApiService.GetResourceRequest(`task/sortbyname`);
      dispatch({ type: actionTypes.SORT_BY_NAME, payload: response });
      dispatch({ type: actionTypes.LOADING, payload: false});
      dispatch({ type: actionTypes.SUCCESSFUL, payload: Strings.SortByName });
    } catch (error) {
      dispatch({ type: actionTypes.FAILED, payload: error.message });
    }
  }
}

export const ItemsReducers = {
  GetTodos,
  AddTodo,
  CompleteTodo,
  DeleteTodo,
  EditTodo,
  ClearAll,
  SortByName
}


export default itemsEntitiesReducer;