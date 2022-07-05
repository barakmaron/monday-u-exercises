import actionTypes from "../actions/constants";

const initialState = {
  successful: '',
  failed: '',
  is_loading: false
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESSFUL:
      return { ...state, successful: action.payload };
    case actionTypes.FAILED:
      return { ...state, failed: action.payload };
    case actionTypes.LOADING:
      return { ...state, is_loading: action.payload };
    default:
      return state;
  }
};
export default itemsViewReducer;
