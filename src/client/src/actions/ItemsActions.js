import { CompleteTodo, GetTodos, DeleteTodo, EditTodo, AddTodo, ClearAll, SortByName } from '../reducers/items-entities-reducer';

function SetAdd(task){
    return AddTodo(task);
}

function SetDelete(id){
    return DeleteTodo(id);
}

function SetComplete(id){
    return CompleteTodo(id);
}

function SetEditTodo(id, text) {
    return EditTodo(id, text);
}

function SetClearAll(){
    return ClearAll();
}

function SetSortByName(){
    return SortByName();
}

export const GetTasksAction = () => {
    return dispatch => {
        dispatch(GetTodos());
    };
}

export const SetCompleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(SetComplete(id))).then(() => {
            dispatch(GetTodos());
        })
    };
}

export const SetDeleteAction = (id) => {
    return dispatch => {
        Promise.resolve(dispatch(SetDelete(id))).then(() => {
            dispatch(GetTodos());
        });
    };
}

export const EditAction = (id, text) => {
    return dispatch => {
        Promise.resolve(dispatch(SetEditTodo(id, text))).then(() => {
            dispatch(GetTodos());
        });
    }
}

export const AddAction = (task) => {
    return dispatch => {
        Promise.resolve(dispatch(SetAdd(task))).then(() => {
            dispatch(GetTodos());
        });
    }
}

export const ClearAllAction = () => {
    return dispatch => {
        Promise.resolve(dispatch(SetClearAll())).then(() => {
            dispatch(GetTodos());
        });
    }
}

export const SortByNameAction = () => {
    return dispatch => {
       dispatch(SetSortByName());
    }
}