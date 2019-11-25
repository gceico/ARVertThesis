import axios from "axios/index";
import {APIURL, placeHolderPath} from "../secret";
import {generateRandom} from "../utils/Tricks";
import firebase from "../firebase";
import * as FileSystem from "expo-file-system";
import {RESET_STATISTICS} from "./visitsActions";

export const GET_MODEL = "GET_MODEL";
export const GET_MODEL_SUCCESS = "GET_MODEL_SUCCESS";
export const GET_MODEL_FAIL = "GET_MODEL_FAIL";
export const SET_NEW_AD = "SET_NEW_AD";
export const SET_ACTIVE_AD = "SET_ACTIVE_AD";
export const GET_AD = "GET_AD";
export const GET_AD_SUCCESS = "GET_AD_SUCCESS";
export const GET_AD_FAIL = "GET_AD_FAIL";
export const SAVE_AD = "SAVE_AD";
export const SAVE_AD_SUCCESS = "SAVE_AD_SUCCESS";
export const SAVE_AD_FAIL = "SAVE_AD_FAIL";
export const UPDATE_AD = "UPDATE_AD";
export const UPDATE_AD_SUCCESS = "UPDATE_AD_SUCCESS";
export const UPDATE_AD_FAIL = "UPDATE_AD_FAIL";
export const DELETE_AD = "DELETE_AD";
export const DELETE_AD_SUCCESS = "DELETE_AD_SUCCESS";
export const DELETE_AD_FAIL = "DELETE_AD_FAIL";
export const GET_ADS_LIST = "GET_ADS_LIST";
export const GET_ADS_LIST_SUCCESS = "GET_ADS_LIST_SUCCESS";
export const GET_ADS_LIST_FAIL = "GET_ADS_LIST_FAIL";
export const GET_SPECIFIC_AD = "GET_SPECIFIC_AD";
export const GET_SPECIFIC_AD_SUCCESS = "GET_SPECIFIC_AD_SUCCESS";
export const GET_SPECIFIC_AD_FAIL = "GET_SPECIFIC_AD_FAIL";

export const setNewAd = () => {
  return (dispatch, getState) => {
    const emptyAd = {
      data: {
        Name: 'New Ad',
        AgeRange: 'Unset',
        ForGender: 'All',
        Enabled: false,
        IdUser: getState().userReducer.userId,
        Preview: placeHolderPath,
        ForLocation: 'Romania',
        IdCategory: ''
      },
      id: generateRandom()
    };
    dispatch({
      payload: emptyAd,
      type: SET_NEW_AD,
    });
  }
};

export const setActiveAd = (ad) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_AD,
      payload: ad,
    });
    dispatch({
      type: RESET_STATISTICS,
    })
  }
};

export const getModel = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_MODEL
    });
    try {
      const modelRef = firebase.storage().ref(`ads/${id}`);
      const result = await modelRef.listAll();
      let model = {};
      let daePath = '';
      for (let i = 0; i < result.items.length; i++) {
        const itemRef = result.items[i];
        const metaData = await itemRef.getMetadata();
        const downloadUrl = await itemRef.getDownloadURL();
        if (metaData.name !== 'preview') {
          const localModel = await FileSystem.downloadAsync(downloadUrl, FileSystem.cacheDirectory + metaData.name);
          const ext = localModel.uri.substr(localModel.uri.length - 3, 3);
          model[metaData.name] = localModel.uri;
          if (ext === 'dae') {
            daePath = localModel.uri
          }
        }
      }
      if (model) {
        dispatch({
          type: GET_MODEL_SUCCESS,
          payload: {model, daePath},
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MODEL_FAIL,
        payload: error,
        hasError: true,
      })
    }
  }
};

export const getAdsList = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_ADS_LIST,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/ads`, {params: params, headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_ADS_LIST_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_ADS_LIST_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const getSpecificAd = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_SPECIFIC_AD,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/ads`, {body: params, headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_SPECIFIC_AD_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_SPECIFIC_AD_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};


export const getAd = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_AD,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .get(`${APIURL}/ads/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: GET_AD_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_AD_FAIL,
          payload: error,
          hasError: true,
          loading: false
        })
      });
  }
};

export const saveAd = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_AD,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .post(`${APIURL}/ads/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          dispatch({
            type: SAVE_AD_SUCCESS,
            payload: res.data,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SAVE_AD_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};

export const updateAd = (data, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_AD,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .put(`${APIURL}/ads/${id}`, data, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          let adsList = getState().adReducer.adsList;
          let found = false;
          for (let i = 0; i < adsList.length; i++) {
            if (adsList[i].id === id) {
              adsList[i] = res.data;
              found = true;
              break;
            }
          }
          if (!found) {
            adsList.push(res.data)
          }
          dispatch({
            type: UPDATE_AD_SUCCESS,
            payload: res.data,
            list: adsList,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: UPDATE_AD_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};

export const deleteAd = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_AD,
      loading: true
    });
    const JWT = getState().userReducer.JWT;
    axios
      .delete(`${APIURL}/ads/${id}`, {headers: {'Authorization': JWT}})
      .then(res => {
        if (res.data) {
          let adsList = getState().adReducer.adsList
          for (let i = 0; i < adsList.length; i++) {
            if (adsList[i].id === id) {
              adsList.splice(i, 1)
              break;
            }
          }
          console.log(adsList, 'delete')
          dispatch({
            type: DELETE_AD_SUCCESS,
            payload: res.data,
            list: adsList,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: DELETE_AD_FAIL,
          payload: error,
          hasError: true,
          loading: true
        })
      });
  }
};
