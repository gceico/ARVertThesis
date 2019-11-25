import React from 'react';
import firebase from '../firebase';
import { connect } from "react-redux";
import { getUser, updateJWT } from "../actions/userActions";
import { _getPermissionAsync } from "../utils/Permissions";
import Loader from "../components/Loader";

function LoadingScreen (props) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      _getPermissionAsync(user);
      props.updateJWT(firebase.auth().currentUser.getIdToken());
      if (!props.userId) {
        props.getUser(user.uid);
      }
      props.navigation.navigate("Main")
    } else {
      props.navigation.navigate("LoginScreen")
    }
  });

  return (
    <Loader/>
  );
}


export const LoadingScreenWithRedux = connect(state => ({
  ...state.userReducer,
}), {
  getUser,
  updateJWT
})(LoadingScreen);