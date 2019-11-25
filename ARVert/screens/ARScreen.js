import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Image
} from 'react-native';
import { connect } from "react-redux";
import { getLocationsList, setActiveLocation, setNewLocation } from "../actions/locationActions";
import { getAdsList, setActiveAd, setNewAd } from "../actions/adActions";
import { getCategoriesList } from "../actions/categoryActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import ContainerStyles from "../styles/ContainerStyles";
import LocationStyles from "../styles/LocationStyles";
import { Ionicons } from "@expo/vector-icons";
import ButtonsStyles from "../styles/ButtonsStyles";
import { FREE } from "../constants/Values";
import { settingsBG } from "../Assets";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";

function ARScreen (props) {
  const [loaded, setLoaded] = useState({
    locations: false,
    ads: false,
    categories: false,
  });

  useEffect(() => {
    if (props.userId) {
      if (!loaded.locations) {
        props.getLocationsList({ user: props.userId });
        setLoaded({ ...loaded, locations: true })
      }
      if (!loaded.ads) {
        props.getAdsList({ user: props.userId });
        setLoaded({ ...loaded, ads: true })
      }
      if (!loaded.categories) {
        props.getCategoriesList();
        setLoaded({ ...loaded, categories: true })
      }
    }
  });

  if (props.user.IdPlan === FREE) {
    console.log(props.user.IdPlan)
    props.navigation.navigate('PlansScreen')
  }
  if (!props.loading) {
    return (
      <ImageBackground source={settingsBG} resizeMode={'stretch'}
                       style={styles.background}>
        <View style={[styles.container]}>
          <Text style={[TextStyles.headerSecondary, styles.header]}>AR Center</Text>
          <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.plansButton]}
                            onPress={() => {
                              props.navigation.navigate("PlansScreen");
                            }}>
            <View style={[ButtonsStyles.round, { backgroundColor: Colors.white }]}>
              <Ionicons
                name={'ios-cash'}
                size={16}
                color={Colors.linkColor}
              />
            </View>
          </TouchableOpacity>
          {_renderARIntro(props)}
          {_renderARList(props)}
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <Loader/>
    )
  }
}

function _renderARIntro (props) {
  return (
    <View>
      <Text style={[TextStyles.caption, styles.caption]}>You can view, add or edit locations and ads</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={ButtonsStyles.roundContainer} onPress={() => onNewLocationPress(props)}>
          <View style={ButtonsStyles.round}>
            <Ionicons
              name={'ios-map'}
              size={16}
              color={Colors.white}
            />
          </View>
          <Text style={ButtonsStyles.roundLabel}>New location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ButtonsStyles.roundContainer} onPress={() => onNewAdPress(props)}>
          <View style={ButtonsStyles.round}>
            <Ionicons
              name={'ios-cube'}
              size={16}
              color={Colors.white}
            />
          </View>
          <Text style={ButtonsStyles.roundLabel}>New ad</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function _renderARList (props) {
  return (
    <ScrollView style={[styles.locationsList, ContainerStyles.container]}
                refreshControl={<RefreshControl refreshing={props.loading}/>}>
      <Text style={[TextStyles.label, LocationStyles.groupName]}>Locations</Text>
      {(props.locationsList && props.locationsList.length !== 0) && props.locationsList.map(item => {
        return _renderARItem(props, item, 'location')
      })}
      {!props.locationsList &&
      <TouchableOpacity style={LocationStyles.group} onPress={() => onNewLocationPress(props)}>
        <Text style={LocationStyles.locationName}>{'Create new location'}</Text>
      </TouchableOpacity>
      }
      <Text style={[TextStyles.label, LocationStyles.groupName]}>Ads</Text>
      {(props.adsList && props.adsList.length !== 0) && props.adsList.map(item => {
        return _renderARItem(props, item, 'ad')
      })}
      {!props.adsList &&
      <TouchableOpacity style={LocationStyles.group} onPress={() => onNewAdPress(props)}>
        <Text style={LocationStyles.locationName}>{'Create new ad'}</Text>
      </TouchableOpacity>
      }
    </ScrollView>
  )
}

function _renderARItem (props, item, type) {
  switch (type) {
    case 'location':
      return (
        <View style={LocationStyles.group} key={item.id}>
          <View style={LocationStyles.location}>
            <Image style={[LocationStyles.locationPreview]}
                   source={{ uri: item.data.PathMarker }}/>
            <View style={{ width: Layout.window.width - 160 }}>
              <Text style={LocationStyles.locationName}>{item.data.Name}</Text>
              <Text style={LocationStyles.locationAddress}>{item.data.Address}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            onLocationPress(props, item)
          }}>
            <View style={ButtonsStyles.roundSecondary}>
              <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                color={Colors.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    case 'ad':
      return (
        <View style={LocationStyles.group} key={item.id}>
          <View style={LocationStyles.location}>
            <Image style={[LocationStyles.locationPreview]}
                   source={{ uri: item.data.Preview }}/>
            <View style={{ width: Layout.window.width - 160 }}>
              <Text style={LocationStyles.locationName}>{item.data.Name}</Text>
              {/*<Text style={LocationStyles.locationAddress}>{item.data.ForLocation}</Text>*/}
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            onAdPress(props, item)
          }}>
            <View style={ButtonsStyles.roundSecondary}>
              <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                color={Colors.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    default:
      return null
  }
}

function onNewLocationPress (props) {
  props.setNewLocation();
  props.navigation.navigate("LocationScreen");
}

function onLocationPress (props, location) {
  props.setActiveLocation(location);
  props.navigation.navigate("LocationScreen");
}

function onNewAdPress (props) {
  props.setNewAd();
  props.navigation.navigate("AdScreen");
}

function onAdPress (props, location) {
  props.setActiveAd(location);
  props.navigation.navigate("AdScreen");
}


export const ARScreenWithRedux = connect(state => ({
  ...state.userReducer,
  ...state.locationReducer,
  ...state.adReducer,
  ...state.categoryReducer,
}), {
  getAdsList,
  getLocationsList,
  setActiveLocation,
  setNewLocation,
  setActiveAd,
  setNewAd,
  getCategoriesList,
})(ARScreen);

ARScreenWithRedux.navigationOptions = {
  header: null,
  headerMode: 'none',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    marginLeft: 16,
    marginTop: 32,
    color: Colors.white
  },
  subHeader: {
    marginLeft: 16,
    marginTop: 16
  },
  caption: {
    marginLeft: 16,
    textAlign: 'left',
    color: Colors.white
  },

  locationsList: {
    paddingTop: 24,
  },

  buttonGroup: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 17,
  },
  plansButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    marginRight: 0
  }

});
