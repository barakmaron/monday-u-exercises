import actionTypes from '../actions/constants/index';
import ApiService from '../Api/ApiManger';
import { getItems } from "../selectors/items-entities-selectors";
import { Strings } from '../globals/Strings';

export function GetTodos() {
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
  
  
const GetTasksAction = () => {
    return dispatch => {
        dispatch(GetTodos());
    };
}

const SetCompleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(CompleteTodo(id))).then(() => {
            dispatch(GetTodos());
        })
    };
}

const SetDeleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(DeleteTodo(id))).then(() => {
            dispatch(GetTodos());
        });
    };
}

const EditAction = (id, text) => {
    return dispatch => {
        Promise.resolve(dispatch(EditTodo(id, text))).then(() => {
            dispatch(GetTodos());
        });
    }
}

const AddAction = (task) => {
    return dispatch => {
        Promise.resolve(dispatch(AddTodo(task))).then(() => {
            dispatch(GetTodos());
        });
    }
}

const ClearAllAction = () => {
    return dispatch => {
        Promise.resolve(dispatch(ClearAll())).then(() => {
            dispatch(GetTodos());
        });
    }
}

const SortByNameAction = () => {
    return dispatch => {
       dispatch(SortByName());
    }
}


const ItemsActions = {
  GetTodos,
  GetTasksAction,
  SetCompleteAction,
  SetDeleteAction,
  EditAction,
  AddAction,
  ClearAllAction,
  SortByNameAction
};

export default ItemsActions;