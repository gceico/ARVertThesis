import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import { connect } from "react-redux";
import { updateAd, deleteAd } from "../actions/adActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import ContainerStyles from "../styles/ContainerStyles";
import LocationStyles from "../styles/LocationStyles";
import AdStyles from "../styles/LocationStyles";
import { Ionicons } from "@expo/vector-icons";
import ButtonsStyles from "../styles/ButtonsStyles";
import { settingsBG } from "../Assets";
import PhotosStyles from "../styles/PhotosStyles";
import { _pickImage } from "../utils/Permissions";
import firebase from "../firebase";
import Layout from "../constants/Layout";
import InputStyles from "../styles/InputStyles";
import Loader from "../components/Loader";

function AdScreen (props) {
  const [dataFields, setDataFields] = useState({
    ...props.ad,
    ...{
      hasChanged: false,
      adId: props.adId
    }
  });
  if (!props.loading) {
    return (
      <ImageBackground source={settingsBG} resizeMode={'stretch'} style={styles.background}>
        <View style={[styles.container]}>
          {_renderAdIntro(props, dataFields)}
          {_renderAdPhoto(dataFields, setDataFields)}
          {_renderFields(props, dataFields, setDataFields)}
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

function _renderAdIntro (props, dataFields) {
  return (
    <View style={styles.inlineHeader}>
      <View>
        <Text style={[TextStyles.headerSecondary, styles.header]}>ADWARE</Text>
        <Text style={[TextStyles.caption, styles.caption]}>{dataFields.Name}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.roundContainer]}
                          onPress={() => {props.navigation.navigate("AdStatisticsScreen");}}>
          <View style={[ButtonsStyles.round, styles.analytics]}>
            <Ionicons
              name={'ios-analytics'}
              size={16}
              color={Colors.linkColor}
            />
          </View>
        </TouchableOpacity>
        {dataFields.Name !== 'New Ad' &&
        <TouchableOpacity style={[ButtonsStyles.roundContainer, styles.roundContainer]}
                          onPress={() => _onDeleteConfirm(props, dataFields)}>
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

function _renderAdPhoto (dataFields, setDataFields) {
  return (
    <View style={styles.locationPhoto}>
      <TouchableOpacity style={PhotosStyles.locationPhotoContainer}
                        onPress={() => _onChangePhoto(dataFields, setDataFields)}>
        <Image style={[PhotosStyles.locationPhoto]}
               source={{ uri: dataFields.Preview }}/>
        <View style={PhotosStyles.locationPhotoEdit}>
          <Ionicons
            name={'ios-add'}
            size={18}
            style={{ marginBottom: -3 }}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

function _renderFields (props, dataFields, setDataFields) {
  const modelsLabels = ['Model'];
  const selectorData = [];
  let selectedCategory = 'Chose a category';
  const infoLabels = ['Text', "Link"];

  props.categoriesList.map(item => {
    if (item.id === dataFields.IdCategory) {
      selectedCategory = item.data.Name;
    }
    selectorData.push({ key: item.id, label: item.data.Name })
  });
  const genderData = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'both', label: 'Both' }
  ]
  let locationSelector = [];
  let selectedLocation = 'Chose a location'
  props.locationsList.map(item => {
    if (item.id === dataFields.ForLocation) {
      selectedLocation = item.data.Address
    }
    locationSelector.push({
      key: item.id,
      label: item.data.Address,
      preview: item.data.PathMarker,
      component: _locationSelectorItem(item)
    })
  })
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={[styles.locationsList, ContainerStyles.container]}>
        <View>
          <Text style={[TextStyles.label, AdStyles.groupName]}>Details</Text>
          {
            _renderFieldItem(dataFields, setDataFields, 'Name', true, true)
          }
          <View style={[InputStyles.group, styles.onColumn]}>
            <Text style={InputStyles.groupLabel}>For Location</Text>
            <ModalSelector
              data={locationSelector}
              initValue={selectedLocation}
              onChange={(option) => setDataFields({
                ...dataFields, ...{
                  ForLocation: option.key,
                  PathMarker: option.preview,
                  hasChanged: true
                }
              })}>
              <TextInput
                style={[InputStyles.groupTextInput, { marginLeft: 'auto' }]}
                value={selectedLocation}
                editable={false}
              />
            </ModalSelector>
          </View>
        </View>
        <View>
          <Text style={[TextStyles.label, AdStyles.groupName]}>Model</Text>
          {modelsLabels.map(label => {
            return _renderFieldItem(dataFields, setDataFields, label, true, true)
          })}
        </View>
        <View>
          <Text style={[TextStyles.label, AdStyles.groupName]}>Public target</Text>
          {
            _renderFieldItem(dataFields, setDataFields, 'AgeRange', true, true)
          }
          <View style={[InputStyles.group, styles.onColumn]}>
            <Text style={InputStyles.groupLabel}>Category</Text>
            <ModalSelector
              data={selectorData}
              initValue={selectedCategory}
              onChange={(option) => setDataFields({ ...dataFields, ...{ IdCategory: option.key, hasChanged: true } })}>
              <TextInput
                style={[InputStyles.groupTextInput, { marginLeft: 'auto' }]}
                value={selectedCategory}
                editable={false}
              />
            </ModalSelector>
          </View>
          <View>
            <View style={[InputStyles.group, styles.onColumn]}>
              <Text style={InputStyles.groupLabel}>Gender</Text>
              <ModalSelector
                data={genderData}
                initValue={dataFields.ForGender}
                onChange={(option) => setDataFields({
                  ...dataFields, ...{
                    ForGender: option.label,
                    hasChanged: true
                  }
                })}>
                <TextInput
                  style={[InputStyles.groupTextInput, { marginLeft: 'auto' }]}
                  value={dataFields.ForGender}
                  editable={false}
                />
              </ModalSelector>
            </View>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Text style={[TextStyles.label, AdStyles.groupName]}>Ad info</Text>
            {infoLabels.map(label => {
              return _renderFieldItem(dataFields, setDataFields, label, true, true)
            })}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function _locationSelectorItem (item) {
  return (
    <View style={LocationStyles.group} key={item.id}>
      <View style={LocationStyles.location}>
        <Image style={[LocationStyles.locationPreview]}
               source={{ uri: item.data.PathMarker }}/>
        <View>
          <Text style={LocationStyles.locationName}>{item.data.Name}</Text>
          <Text style={LocationStyles.locationAddress}>{item.data.Address}</Text>
        </View>
      </View>
    </View>
  )
}

function _renderFieldItem (dataFields, setDataFields, label, editable, onColumn) {
  return (
    <View style={[InputStyles.group, styles.onColumn]} key={label}>
      <Text style={InputStyles.groupLabel}>{label}</Text>
      <TextInput
        style={[InputStyles.groupTextInput, !editable ? { opacity: 0.5 } : {}]}
        value={dataFields[label]}
        onChangeText={value => setDataFields({ ...dataFields, [label]: value })}
        placeholder={label}
        blurOnSubmit={false}
        editable={editable}
        onBlur={() => setDataFields({ ...dataFields, ...{ hasChanged: true } })}
      />
    </View>
  );
}

async function _onChangePhoto (dataFields, setDataFields) {
  try {
    const photo = await _pickImage();
    if (!photo.cancelled) {
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`ads/${dataFields.adId}/preview`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setDataFields({ ...dataFields, ...{ Preview: url, hasChanged: true } });
    }
  } catch (e) {
    console.log(e)
  }
}

function _onSave (props, dataFields, setDataFields) {
  setDataFields({ ...dataFields, ...{ hasChanged: false } });
  props.updateAd({ ...dataFields }, dataFields.adId);
  props.navigation.navigate("ARScreen");
}

function _onDeleteConfirm (props, dataFields) {
  return (
    Alert.alert(
      'Delete ad',
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
            props.deleteAd(dataFields.adId);
            props.navigation.navigate("ARScreen");
          },
        },
      ],
      { cancelable: false },
    )
  )
}

export const AdScreenWithRedux = connect(state => ({
  ...state.adReducer, ...state.categoryReducer, ...state.locationReducer
}), {
  updateAd,
  deleteAd
})(AdScreen);

AdScreenWithRedux.navigationOptions = {
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
  }
});
