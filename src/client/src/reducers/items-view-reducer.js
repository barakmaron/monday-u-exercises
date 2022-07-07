import actionTypes from "../actions/constants";

const initialState = {
  successful: '',
  failed: '',
  is_loading: false,
  search: '',
  hide_done: false
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESSFUL:
      return { ...state, successful: action.payload };
    case actionTypes.FAILED:
      return { ...state, failed: action.payload };
    case actionTypes.LOADING:
      return { ...state, is_loading: action.payload };
    case actionTypes.SEARCH:
      return { ...state, search: action.payload };
    case actionTypes.HIDE_DONE:
      return { ...state, hide_done: !state.hide_done };
    default:
      return state;
  }
};
export default itemsViewReducer;
