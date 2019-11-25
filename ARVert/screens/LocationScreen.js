import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  Modal
} from 'react-native';
import {connect} from "react-redux";
import {updateLocation, deleteLocation} from "../actions/locationActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import ContainerStyles from "../styles/ContainerStyles";
import LocationStyles from "../styles/LocationStyles";
import {Ionicons} from "@expo/vector-icons";
import ButtonsStyles from "../styles/ButtonsStyles";
import {settingsBG} from "../Assets";
import PhotosStyles from "../styles/PhotosStyles";
import {_pickImage} from "../utils/Permissions";
import firebase from "../firebase";
import Layout from "../constants/Layout";
import InputStyles from "../styles/InputStyles";
import {MapView} from "expo";
import Loader from "../components/Loader";

function LocationScreen(props) {
  const [dataFields, setDataFields] = useState({
    ...props.location,
    ...{
      hasChanged: false,
      locationId: props.locationId
    }
  });
  if (!props.loading) {
    return (
      <ImageBackground source={settingsBG} resizeMode={'stretch'} style={styles.background}>
        <View style={[styles.container]}>
          {<LocationIntro onDeleteLocation={props.deleteLocation} navigation={props.navigation} data={dataFields}/>}
          {_renderLocationPhoto(dataFields, setDataFields)}
          {_renderFields(dataFields, setDataFields)}
        </View>
        {dataFields.hasChanged &&
        <TouchableOpacity style={[ButtonsStyles.primary, ButtonsStyles.loginButton, styles.saveButton]}
                          onPress={() => _onSave(props, dataFields, setDataFields)}>
          <Text style={ButtonsStyles.primaryText}>Save</Text>
        </TouchableOpacity>
        }
      </ImageBackground>
    );
  } else {
    return (
      <Loader/>
    )
  }
}

function LocationIntro(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.inlineHeader}>
      {props.data.Coordinates._latitude &&
      _renderLocationModal(props.data, isOpen, setIsOpen)
      }
      <View>
        <Text style={[TextStyles.headerSecondary, styles.header]}>Location</Text>
        <Text style={[TextStyles.caption, styles.caption]}>{props.data.Name}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.roundContainer]}
                          onPress={() => {props.navigation.navigate("LocationStatisticsScreen");}}>
          <View style={[ButtonsStyles.round, styles.analytics]}>
            <Ionicons
              name={'ios-analytics'}
              size={16}
              color={Colors.linkColor}
            />
          </View>
        </TouchableOpacity>
        {props.data.Coordinates._latitude &&
        <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.roundContainer]}
                          onPress={() => setIsOpen(true)}>
          <View style={[ButtonsStyles.round, styles.analytics]}>
            <Ionicons
              name={'ios-map'}
              size={16}
              color={Colors.linkColor}
            />
          </View>
        </TouchableOpacity>
        }
        {props.data.Name !== 'New Location' &&
        <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.roundContainer]}
                          onPress={() => _onDeleteConfirm(props.onDeleteLocation, props.data.locationId, props.navigation)}>
          <View style={[ButtonsStyles.round, styles.trash]}>
            <Ionicons
              name={'ios-trash'}
              size={16}
              color={Colors.warningBackground}
            />
          </View>
        </TouchableOpacity>
        }
      </View>
    </View>
  )
}

function _renderLocationModal(dataFields, isOpen, setIsOpen) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
    >
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: dataFields.Coordinates._latitude,
            longitude: dataFields.Coordinates._longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.05,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: dataFields.Coordinates._latitude,
              longitude: dataFields.Coordinates._longitude,
            }}
            title={dataFields.Name}
            description={dataFields.Address}
          />
        </MapView>
        <TouchableOpacity style={[ButtonsStyles.primary, ButtonsStyles.loginButton, styles.locationButton]}
                          onPress={() => setIsOpen(false)}>
          <Text style={ButtonsStyles.primaryText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

function _renderLocationPhoto(dataFields, setDataFields) {
  return (
    <View style={styles.locationPhoto}>
      <TouchableOpacity style={PhotosStyles.locationPhotoContainer}
                        onPress={() => _onChangePhoto(dataFields, setDataFields)}>
        <Image style={[PhotosStyles.locationPhoto]}
               source={{uri: dataFields.PathMarker}}/>
        <View style={PhotosStyles.locationPhotoEdit}>
          <Ionicons
            name={'ios-add'}
            size={18}
            style={{marginBottom: -3}}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>
      {_renderLocationDetails(dataFields, setDataFields)}
    </View>
  )
}

function _renderLocationDetails(dataFields, setDataFields) {
  return (
    <View style={styles.locationPhotoDetails}>
      <Text style={[TextStyles.caption, styles.photoCaption]}>Please specify width and height of your location.</Text>
      <View style={styles.locationPhotoValuesGroup}>
        <View style={styles.locationPhotoValues}>
          <Text style={TextStyles.label}>Width:</Text>
          <TextInput
            value={dataFields.Width}
            placeholder={'Width'}
            blurOnSubmit={false}
            editable={true}
            onChangeText={value => setDataFields({...dataFields, ...{Width: value}})}
            onBlur={() => setDataFields({...dataFields, ...{hasChanged: true}})}
          />
        </View>
        <View style={styles.locationPhotoValues}>
          <Text style={TextStyles.label}>Height:</Text>
          <TextInput
            value={dataFields.Height}
            placeholder={'Height'}
            blurOnSubmit={false}
            editable={true}
            onChangeText={value => setDataFields({...dataFields, ...{Height: value}})}
            onBlur={() => setDataFields({...dataFields, ...{hasChanged: true}})}
          />
        </View>
      </View>
    </View>
  )
}

function _renderFields(dataFields, setDataFields) {
  const valueLabels = ['Accessibility', 'Visibility', 'Value'];
  const detailsLabels = ['Name', 'Address'];
  return (
    <ScrollView style={[styles.locationsList, ContainerStyles.container]}>
      <View style={{paddingBottom: 32}}>
        <Text style={[TextStyles.label, LocationStyles.groupName]}>Details</Text>
        {detailsLabels.map(label => {
          return _renderFieldItem(dataFields, setDataFields, label, true, true)
        })}
        <Text style={[TextStyles.label, LocationStyles.groupName]}>Value</Text>
        {valueLabels.map(label => {
          return _renderFieldItem(dataFields, setDataFields, label, false, false)
        })}
      </View>
    </ScrollView>
  )
}

function _renderFieldItem(dataFields, setDataFields, label, editable, column) {
  return (
    <View style={[InputStyles.group, column ? styles.onColumn : {}]} key={label}>
      <Text style={InputStyles.groupLabel}>{label}</Text>
      <TextInput
        style={[InputStyles.groupTextInput, !editable ? {opacity: 0.5} : {}, !column ? {marginLeft: 'auto'} : {}]}
        value={dataFields[label]}
        onChangeText={value => setDataFields({...dataFields, [label]: value})}
        placeholder={label}
        blurOnSubmit={false}
        editable={editable}
        onBlur={() => setDataFields({...dataFields, ...{hasChanged: true}})}
      />
    </View>
  );
}

async function _onChangePhoto(dataFields, setDataFields) {
  try {
    const photo = await _pickImage();
    if (!photo.cancelled) {
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`locations/${dataFields.locationId}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setDataFields({...dataFields, ...{PathMarker: url, hasChanged: true}});
    }
  } catch (e) {
    console.log(e)
  }
}


function _onSave(props, dataFields, setDataFields) {
  setDataFields({...dataFields, ...{hasChanged: false}});
  props.updateLocation({...dataFields}, dataFields.locationId);
  props.navigation.navigate("ARScreen");
}

function _onDeleteConfirm(onDeleteLocation, id, navigation) {
  return (
    Alert.alert(
      'Delete location',
      'Are your sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),

          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            onDeleteLocation(id)
            navigation.navigate("ARScreen");
          },
        },
      ],
      {cancelable: false},
    )
  )
}

export const LocationScreenWithRedux = connect(state => ({
  ...state.locationReducer,
}), {
  updateLocation,
  deleteLocation,
})(LocationScreen);

LocationScreenWithRedux.navigationOptions = {
  header: null,
  headerMode: 'none',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    marginTop: 8,
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
  },
  roundContainer: {
    marginRight: 16
  },
  analytics: {
    backgroundColor: Colors.white,
    borderWidth: 0
  },
  trash: {
    backgroundColor: Colors.white,
    borderWidth: 0
  },
  locationPhoto: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 24
  },
  locationPhotoDetails: {
    width: Layout.window.width - 148,
    marginLeft: 16
  },
  locationPhotoValuesGroup: {
    marginTop: 24,
    flexDirection: 'row'
  },
  locationPhotoValues: {
    marginRight: 32,
    // alignItems: 'center',
    // flexDirection: 'row'
  },
  photoCaption: {
    color: Colors.white,
    textAlign: 'left'
  },
  saveButton: {
    position: 'absolute',
    bottom: 8,
    left: 16
  },
  onColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  locationButton: {
    backgroundColor: Colors.linkColor,
    position: 'absolute',
    bottom: 16,
    left: 16
  }
});
