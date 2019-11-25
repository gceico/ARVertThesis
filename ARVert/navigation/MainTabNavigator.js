import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {ARScreenWithRedux} from '../screens/ARScreen';
import {SettingsScreenWithRedux} from '../screens/SettingsScreen';
import {CameraScreenWithRedux} from "../screens/CameraScreen";
import { LocationScreenWithRedux } from "../screens/LocationScreen";
import { AdScreenWithRedux } from "../screens/AdScreen";
import { AdStatisticsScreenWithRedux } from "../screens/AdStatisticsScreen";
import { LocationStatisticsScreenWithRedux } from "../screens/LocationStatisticsScreen";

const CameraStack = createStackNavigator({
  CameraScreen: CameraScreenWithRedux,
  // CameraScreen: ARScreenWithRedux,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const ARStack = createStackNavigator({
  ARScreen: ARScreenWithRedux,
  LocationScreen: LocationScreenWithRedux,
  AdScreen: AdScreenWithRedux,
  AdStatisticsScreen: AdStatisticsScreenWithRedux,
  LocationStatisticsScreen: LocationStatisticsScreenWithRedux
});

ARStack.navigationOptions = {
  tabBarLabel: 'AR Center',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cube' : 'md-cube'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  SettingsScreen: SettingsScreenWithRedux,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  SettingsStack,
  ARStack,
  CameraStack,
});
