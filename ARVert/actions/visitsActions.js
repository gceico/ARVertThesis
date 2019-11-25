import axios from "axios/index";
import {APIURL} from "../secret";

export const RESET_STATISTICS = "RESET_STATISTICS";
export const GET_VISITS_LIST_LOCATION = "GET_VISITS_LIST_LOCATION";
export const GET_VISITS_LIST_LOCATION_SUCCESS = "GET_VISITS_LIST_LOCATION_SUCCESS";
export const GET_VISITS_LIST_LOCATION_FAIL = "GET_VISITS_LIST_LOCATION_FAIL";
export const GET_VISITS_LIST = "GET_VISITS_LIST";
export const GET_VISITS_LIST_SUCCESS = "GET_VISITS_LIST_SUCCESS";
export const GET_VISITS_LIST_FAIL = "GET_VISITS_LIST_FAIL";
export const GET_VISIT = "GET_VISIT";
export const GET_VISIT_SUCCESS = "GET_VISIT_SUCCESS";
export const GET_VISIT_FAIL = "GET_VISIT_FAIL";
export const SAVE_VISIT = "SAVE_VISIT";
export const SAVE_VISIT_SUCCESS = "SAVE_VISIT_SUCCESS";
export const SAVE_VISIT_FAIL = "SAVE_VISIT_FAIL";

export const getVisitsList = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_VISITS_LIST,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/visits/`, {params: params, headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          dispatch({
            type: GET_VISITS_LIST_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_VISITS_LIST_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const getVisitsListLocation = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_VISITS_LIST_LOCATION,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/visits/`, {params: params, headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          dispatch({
            type: GET_VISITS_LIST_LOCATION_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_VISITS_LIST_LOCATION_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const saveVisit = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_VISIT,
    });
    const JWT = getState().userReducer.JWT;
    axios
      .post(`${APIURL}/visits/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: SAVE_VISIT_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SAVE_VISIT_FAIL,
          payload: error,
          hasError: true,
        })
      });
  }
};
