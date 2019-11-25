import {
  SET_NEW_LOCATION,
  SET_ACTIVE_LOCATION,
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  SAVE_LOCATION,
  SAVE_LOCATION_SUCCESS,
  SAVE_LOCATION_FAIL,
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  DELETE_LOCATION,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
  GET_LOCATIONS_LIST,
  GET_LOCATIONS_LIST_SUCCESS,
  GET_LOCATIONS_LIST_FAIL,
} from "../actions/locationActions";

const INITIAL_STATE = {
  locationId: "",
  location: {},
  locationsList: undefined,
  loading: false
};

export default function locationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NEW_LOCATION: {
      return {
        ...state,
        location: action.payload.data,
        locationId: action.payload.id
      };
    }
    case SET_ACTIVE_LOCATION: {
      return {
        ...state,
        location: action.payload.data,
        locationId: action.payload.id
      };
    }
    case GET_LOCATIONS_LIST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_LOCATIONS_LIST_SUCCESS: {
      return {
        ...state,
        locationsList: action.payload,
        loading: false,
        error: {}
      };
    }
    case GET_LOCATIONS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case GET_LOCATION: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_LOCATION_SUCCESS: {
      return {
        ...state,
        locationId: action.payload.id,
        location: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case GET_LOCATION_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case SAVE_LOCATION: {
      return {
        ...state,
        loading: true
      };
    }
    case SAVE_LOCATION_SUCCESS: {
      return {
        ...state,
        locationId: action.payload.id,
        location: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case SAVE_LOCATION_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case UPDATE_LOCATION: {
      return {
        ...state,
        loading: true
      };
    }
    case UPDATE_LOCATION_SUCCESS: {
      return {
        ...state,
        locationId: action.payload.id,
        location: action.payload.data,
        locationsList: action.list,
        loading: false,
        error: {}
      };
    }
    case UPDATE_LOCATION_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case DELETE_LOCATION: {
      return {
        ...state,
        loading: true
      };
    }
    case DELETE_LOCATION_SUCCESS: {
      return {
        ...state,
        locationId: "",
        location: {},
        locationsList: action.list,
        loading: false,
        error: {}
      };
    }
    case DELETE_LOCATION_FAIL: {
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