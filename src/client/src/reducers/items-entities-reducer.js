import actionTypes from "../actions/constants";

const initialState = {
  tasks: [],
  deleted: {}
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS:
      return { ...state, tasks: action.payload.tasks };
    case actionTypes.ADD_TASK:
      return { ...state, tasks: [...state.tasks, { id: action.payload.id, text: action.payload.text, status: false }]};
    case actionTypes.DONE_TASK:
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, status: !task.status } : task)};
    case actionTypes.DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(value => value.id !== action.payload.id)};
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

export default itemsEntitiesReducer;
