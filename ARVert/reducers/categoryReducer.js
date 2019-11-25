import {
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_LIST_SUCCESS,
  GET_CATEGORIES_LIST_FAIL,
  GET_PLANS_LIST,
  GET_PLANS_LIST_SUCCESS,
  GET_PLANS_LIST_FAIL,
} from "../actions/categoryActions";


const INITIAL_STATE = {
  categoriesList: undefined,
  plansList: undefined,
  loading: false
};

export default function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PLANS_LIST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_PLANS_LIST_SUCCESS: {
      return {
        ...state,
        plansList: action.payload,
        loading: false,
        error: {}
      };
    }
    case GET_PLANS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case GET_CATEGORIES_LIST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_CATEGORIES_LIST_SUCCESS: {
      return {
        ...state,
        categoriesList: action.payload,
        loading: false,
        error: {}
      };
    }
    case GET_CATEGORIES_LIST_FAIL: {
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