import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import allReducers from "./reducers";
import logger from 'redux-logger';

export const store = configureStore({
  reducer: allReducers,
  middleware: [thunkMiddleware, logger],
  preloadedState: {}
});
