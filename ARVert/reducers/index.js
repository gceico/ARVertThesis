import {combineReducers} from 'redux'
import userReducer from './userReducer'
import adReducer from './adReducer'
import locationReducer from './locationReducer'
import categoryReducer from './categoryReducer'
import visitsReducer from './visitsReducer'

export default combineReducers({
  userReducer,
  adReducer,
  locationReducer,
  categoryReducer,
  visitsReducer
})