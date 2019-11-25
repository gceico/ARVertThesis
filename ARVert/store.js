import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

import reducer from "./reducers";
import errorLoggerMiddleware from './utils/ErrorLoggingMiddleware'

export default createStore(
  reducer,
  {},
  applyMiddleware(ReduxThunk));
