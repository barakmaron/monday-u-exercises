import { ItemsReducers } from '../reducers/items-entities-reducer';

export const GetTasksAction = () => {
    return dispatch => {
        dispatch(ItemsReducers.GetTodos());
    };
}

export const SetCompleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(ItemsReducers.CompleteTodo(id))).then(() => {
            dispatch(ItemsReducers.GetTodos());
        })
    };
}

export const SetDeleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(ItemsReducers.DeleteTodo(id))).then(() => {
            dispatch(ItemsReducers.GetTodos());
        });
    };
}

export const EditAction = (id, text) => {
    return dispatch => {
        Promise.resolve(dispatch(ItemsReducers.EditTodo(id, text))).then(() => {
            dispatch(ItemsReducers.GetTodos());
        });
    }
}

export const AddAction = (task) => {
    return dispatch => {
        Promise.resolve(dispatch(ItemsReducers.AddTodo(task))).then(() => {
            dispatch(ItemsReducers.GetTodos());
        });
    }
}

export const ClearAllAction = () => {
    return dispatch => {
        Promise.resolve(dispatch(ItemsReducers.ClearAll())).then(() => {
            dispatch(ItemsReducers.GetTodos());
        });
    }
}

export const SortByNameAction = () => {
    return dispatch => {
       dispatch(ItemsReducers.SortByName());
    }
}