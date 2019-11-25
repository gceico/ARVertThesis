import {
  GET_VISITS_LIST_LOCATION,
  GET_VISITS_LIST_LOCATION_SUCCESS,
  GET_VISITS_LIST_LOCATION_FAIL,
  GET_VISITS_LIST,
  GET_VISITS_LIST_SUCCESS,
  GET_VISITS_LIST_FAIL,
  GET_VISIT,
  GET_VISIT_SUCCESS,
  GET_VISIT_FAIL,
  SAVE_VISIT,
  SAVE_VISIT_SUCCESS,
  SAVE_VISIT_FAIL,
  RESET_STATISTICS
} from "../actions/visitsActions";


const INITIAL_STATE = {
  visitsList: undefined,
  visitsListLocation: undefined,
  loading: false,
  visitError: {}
};


export default function visitsReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_STATISTICS: {
      return {
        ...state,
        visitsList: undefined,
        visitsListLocation: undefined,
      }
    }
    case GET_VISITS_LIST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_VISITS_LIST_SUCCESS: {
      return {
        ...state,
        visitsList: action.payload,
        loading: false,
        error: {}
      };
    }
    case GET_VISITS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case GET_VISITS_LIST_LOCATION: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_VISITS_LIST_LOCATION_SUCCESS: {
      return {
        ...state,
        visitsListLocation: action.payload,
        visitedLocation: action.locationId,
        loading: false,
        error: {}
      };
    }
    case GET_VISITS_LIST_LOCATION_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case GET_VISIT: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_VISIT_SUCCESS: {
      return {
        ...state,
        visitId: action.payload.id,
        visit: action.payload.data,
        visitedAd: action.adId,
        loading: false,
        error: {}
      };
    }
    case GET_VISIT_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case SAVE_VISIT: {
      return {
        ...state,
      };
    }
    case SAVE_VISIT_SUCCESS: {
      return {
        ...state,
        visitId: action.payload.id,
        visit: action.payload.data,
        error: {}
      };
    }
    case SAVE_VISIT_FAIL: {
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