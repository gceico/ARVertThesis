import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import {LoadingScreenWithRedux} from '../screens/LoadingScreen'
import {LoginScreenWithRedux} from '../screens/LoginScreen'
import {RegisterScreenWithRedux} from "../screens/RegisterScreen";
import { PlansScreenWithRedux } from "../screens/PlansScreen";

export default createAppContainer(
  createSwitchNavigator({
      LoadingScreen: LoadingScreenWithRedux,
      Main: MainTabNavigator,
      LoginScreen: LoginScreenWithRedux,
      RegisterScreen: RegisterScreenWithRedux,
      PlansScreen: PlansScreenWithRedux
    },
    {
      initialRouteName: 'LoadingScreen',
    })
);
