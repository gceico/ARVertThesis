import axios from "axios/index";
import {APIURL} from "../secret";

export const UPDATE_JWT = "UPDATE_JWT";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";
export const SAVE_USER = "SAVE_USER";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAIL = "SAVE_USER_FAIL";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const updateJWT = (JWT) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_JWT,
      JWT: JWT
    })
  }
};

export const getUser = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/users/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_USER_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const saveUser = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_USER,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .post(`${APIURL}/users/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: SAVE_USER_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SAVE_USER_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};

export const updateUser = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER,
      loading: true
    });
    console.log(data);
    const JWT = getState().userReducer.JWT;
    axios
      .put(`${APIURL}/users/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_USER,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .delete(`${APIURL}/users/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: DELETE_USER_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: DELETE_USER_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};
