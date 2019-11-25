import axios from "axios/index";
import {APIURL, placeHolderPath} from "../secret";
import {generateRandom} from "../utils/Tricks";
import {RESET_STATISTICS} from "./visitsActions";

export const SET_NEW_LOCATION = "SET_NEW_LOCATION";
export const SET_ACTIVE_LOCATION = "SET_ACTIVE_LOCATION";
export const GET_LOCATION = "GET_LOCATION";
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
export const GET_LOCATION_FAIL = "GET_LOCATION_FAIL";
export const SAVE_LOCATION = "SAVE_LOCATION";
export const SAVE_LOCATION_SUCCESS = "SAVE_LOCATION_SUCCESS";
export const SAVE_LOCATION_FAIL = "SAVE_LOCATION_FAIL";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_LOCATION_SUCCESS = "UPDATE_LOCATION_SUCCESS";
export const UPDATE_LOCATION_FAIL = "UPDATE_LOCATION_FAIL";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const DELETE_LOCATION_SUCCESS = "DELETE_LOCATION_SUCCESS";
export const DELETE_LOCATION_FAIL = "DELETE_LOCATION_FAIL";
export const GET_LOCATIONS_LIST = "GET_LOCATIONS_LIST";
export const GET_LOCATIONS_LIST_SUCCESS = "GET_LOCATIONS_LIST_SUCCESS";
export const GET_LOCATIONS_LIST_FAIL = "GET_LOCATIONS_LIST_FAIL";

export const setNewLocation = () => {
  return (dispatch, getState) => {
    const emptyLocation = {
      data: {
        Name: 'New Location',
        Accessibility: '0',
        Public: false,
        Enabled: false,
        IdUser: getState().userReducer.userId,
        PathMarker: placeHolderPath,
        Value: '0',
        Address: 'Location Address',
        Coordinates: {},
        Visibility: '0',
        Width: '0',
        Height: '0'
      },
      id: generateRandom()
    };

    dispatch({
      payload: emptyLocation,
      type: SET_NEW_LOCATION,
    });
  }
};

export const setActiveLocation = (location) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_LOCATION,
      payload: location,
    });
    dispatch({
      type: RESET_STATISTICS,
    })
  }
};

export const getLocationsList = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_LOCATIONS_LIST,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/locations`, {params: params, headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_LOCATIONS_LIST_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_LOCATIONS_LIST_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const getLocation = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_LOCATION,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/locations/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_LOCATION_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_LOCATION_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const saveLocation = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_LOCATION,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .post(`${APIURL}/locations/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: SAVE_LOCATION_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SAVE_LOCATION_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const updateLocation = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_LOCATION,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .put(`${APIURL}/locations/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          let locationsList = getState().locationReducer.locationsList
          let found = false;
          for (let i = 0; i < locationsList.length; i++) {
            if (locationsList[i].id === id) {
              locationsList[i] = res.data;
              found = true;
              break;
            }
          }
          if (!found) {
            locationsList.push(res.data)
          }
          dispatch({
            type: UPDATE_LOCATION_SUCCESS,
            payload: res.data,
            list: locationsList,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UPDATE_LOCATION_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const deleteLocation = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_LOCATION,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .delete(`${APIURL}/locations/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          let locationsList = getState().locationReducer.locationsList
          for (let i = 0; i < locationsList.length; i++) {
            if (locationsList[i].id === id) {
              locationsList.splice(i, 1)
              break;
            }
          }
          dispatch({
            type: DELETE_LOCATION_SUCCESS,
            payload: {},
            list: locationsList,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: DELETE_LOCATION_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};