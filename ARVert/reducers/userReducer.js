import {
  UPDATE_JWT,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions/userActions";


const INITIAL_STATE = {
  userId: "",
  user: {},
  JWT: undefined,
  loading: false
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_JWT: {
      return {
        ...state,
        JWT: action.JWT
      }
    }
    case GET_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userId: action.payload.id,
        user: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case GET_USER_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case SAVE_USER_SUCCESS: {
      return {
        ...state,
        userId: action.payload.id,
        user: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case SAVE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userId: action.payload.id,
        user: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        userId: "",
        user: {},
        loading: false,
        error: {}
      };
    }
    case DELETE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    default:
      return state
  }
}