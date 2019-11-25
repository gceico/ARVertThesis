import {
  GET_SPECIFIC_AD,
  GET_SPECIFIC_AD_SUCCESS,
  GET_SPECIFIC_AD_FAIL,
  GET_MODEL,
  GET_MODEL_SUCCESS,
  GET_MODEL_FAIL,
  SET_ACTIVE_AD,
  SET_NEW_AD,
  GET_ADS_LIST,
  GET_ADS_LIST_SUCCESS,
  GET_ADS_LIST_FAIL,
  GET_AD,
  GET_AD_SUCCESS,
  GET_AD_FAIL,
  SAVE_AD,
  SAVE_AD_SUCCESS,
  SAVE_AD_FAIL,
  UPDATE_AD,
  UPDATE_AD_SUCCESS,
  UPDATE_AD_FAIL,
  DELETE_AD,
  DELETE_AD_SUCCESS,
  DELETE_AD_FAIL
} from "../actions/adActions";


const INITIAL_STATE = {
  adId: "",
  ad: {},
  adsList: undefined,
  model: {},
  daePath: '',
  loading: false,
  detectedAd: '',
  loadingModel: false,
  adError: {}
};

export default function adReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SPECIFIC_AD: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_SPECIFIC_AD_SUCCESS: {
      return {
        ...state,
        detectedAd: action.payload,
        error: {},
        loading: false
      };
    }
    case GET_SPECIFIC_AD_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case GET_MODEL: {
      return {
        ...state,
        loadingModel: true
      };
    }
    case GET_MODEL_SUCCESS: {
      return {
        ...state,
        model: action.payload.model,
        daePath: action.payload.daePath,
        error: {},
        loadingModel: false
      };
    }
    case GET_MODEL_FAIL: {
      return {
        ...state,
        model: {},
        error: action.payload,
        loadingModel: false
      };
    }
    case SET_NEW_AD: {
      return {
        ...state,
        ad: action.payload.data,
        adId: action.payload.id
      };
    }
    case SET_ACTIVE_AD: {
      return {
        ...state,
        ad: action.payload.data,
        adId: action.payload.id
      };
    }
    case GET_ADS_LIST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ADS_LIST_SUCCESS: {
      return {
        ...state,
        adsList: action.payload,
        loading: false,
        error: {}
      };
    }
    case GET_ADS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case GET_AD: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_AD_SUCCESS: {
      return {
        ...state,
        adId: action.payload.id,
        ad: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case GET_AD_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case SAVE_AD: {
      return {
        ...state,
        loading: true
      };
    }
    case SAVE_AD_SUCCESS: {
      return {
        ...state,
        adId: action.payload.id,
        ad: action.payload.data,
        loading: false,
        error: {}
      };
    }
    case SAVE_AD_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case UPDATE_AD: {
      return {
        ...state,
        loading: true
      };
    }
    case UPDATE_AD_SUCCESS: {
      return {
        ...state,
        adId: action.payload.id,
        ad: action.payload.data,
        adsList: action.list,
        loading: false,
        error: {}
      };
    }
    case UPDATE_AD_FAIL: {
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    }
    case DELETE_AD: {
      return {
        ...state,
        loading: true
      };
    }
    case DELETE_AD_SUCCESS: {
      return {
        ...state,
        ad: {},
        loading: false,
        adsList: action.list,
        error: {}
      };
    }
    case DELETE_AD_FAIL: {
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