import axios from "axios/index";
import { APIURL } from "../secret";

export const GET_CATEGORIES_LIST = "GET_CATEGORIES_LIST";
export const GET_CATEGORIES_LIST_SUCCESS = "GET_CATEGORIES_LIST_SUCCESS";
export const GET_CATEGORIES_LIST_FAIL = "GET_CATEGORIES_LIST_FAIL";
export const GET_PLANS_LIST = "GET_PLANS_LIST";
export const GET_PLANS_LIST_SUCCESS = "GET_PLANS_LIST_SUCCESS";
export const GET_PLANS_LIST_FAIL = "GET_PLANS_LIST_FAIL";

export const getPlansList = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PLANS_LIST,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/plans`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_PLANS_LIST_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_PLANS_LIST_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const getCategoriesList = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_CATEGORIES_LIST,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/categories`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_CATEGORIES_LIST_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_CATEGORIES_LIST_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};