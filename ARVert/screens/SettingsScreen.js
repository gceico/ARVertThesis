import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  Alert,

} from "react-native";
import firebase from "../firebase";
import { connect } from "react-redux";
import { getUser, saveUser, updateUser, deleteUser } from "../actions/userActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import ContainerStyles from "../styles/ContainerStyles";
import PhotosStyles from "../styles/PhotosStyles";
import InputStyles from "../styles/InputStyles";
import { Ionicons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import {settingsBG} from "../Assets";
import {_pickImage} from "../utils/Permissions";
import ButtonsStyles from "../styles/ButtonsStyles";
import Loader from "../components/Loader";


export default function SettingsScreen (props) {
  if (!props.loading) {
    return (
      <ImageBackground source={settingsBG} resizeMode={'stretch'}
                       style={styles.background}>
        <View style={[styles.container]}>
          <Text style={[TextStyles.headerSecondary, styles.header]}>Settings</Text>
          {_renderProfile(props)}
          {_renderSettingsList(props)}
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <Loader/>
    )
  }
}

function _renderProfile (props) {
  return (
    <View style={styles.profile}>
      <TouchableOpacity style={[PhotosStyles.avatarContainer, styles.profileAvatar]}
                        onPress={() => _onChangePhoto(props)}>
        <Image style={[PhotosStyles.avatar]}
               source={{ uri: props.user.Avatar }}/>
        <View style={PhotosStyles.avatarEdit}>
          <Ionicons
            name={'ios-add'}
            size={18}
            style={{ marginBottom: -3 }}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.profileDetails}>
        <Text
          style={[TextStyles.subHeader, styles.profileName]}>{`${props.user.FirstName} ${props.user.LastName}`}</Text>
        <TouchableOpacity onPress={_onSignOut}>
          <Text style={[TextStyles.caption, styles.profileTitle]}>{`Logout`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function _renderSettingsList (props) {
  const accountLabels = ['Email', 'FirstName', 'LastName'];
  const contactLabels = ['Address', 'Phone'];
  return (
    <ScrollView style={ContainerStyles.container}>
      <View style={styles.settingsList}>
        <Text style={[TextStyles.label, InputStyles.groupName]}>Account</Text>
        {
          accountLabels.map(label => {
            return _renderSettingsItem(props, props.user[label], label, 'text', false)
          })
        }
        <Text style={[TextStyles.label, InputStyles.groupName]}>Profile</Text>
        {
          _renderSettingsItem(props, props.user['BirthDate'], 'BirthDate', 'text', true)
        }
        {
          _renderSettingsItem(props, props.user['Gender'], 'Gender', 'gender', true)
        }
        <Text style={[TextStyles.label, InputStyles.groupName]}>Contact</Text>
        {
          contactLabels.map(label => {
            return _renderSettingsItem(props, props.user[label], label, 'text', true)
          })
        }
        <Text style={[TextStyles.label, InputStyles.groupName]}>Delete Account</Text>
        <View style={InputStyles.group}>
          <TouchableOpacity onPress={() => _onDeleteConfirm(props)}>
            <Text style={[InputStyles.groupLabel, { color: Colors.errorBackground }]}>Delete!</Text>
          </TouchableOpacity>
          <Text style={[InputStyles.groupLabel]}>Use it carefully</Text>
        </View>
      </View>
    </ScrollView>
  )
}

function _renderSettingsItem (props, item, label, type, editable) {
  const [value, setValue] = useState(item);
  const [confirmChange, setConfirmChange] = useState(false);
  switch (type) {
    case 'text':
      return (
        <View style={InputStyles.group} key={label}>
          <Text style={InputStyles.groupLabel}>{label}</Text>
          <TextInput
            style={[InputStyles.groupTextInput, { marginLeft: 'auto' }, !editable ? { opacity: 0.5 } : {}]}
            value={value}
            onChangeText={value => setValue(value)}
            placeholder={label}
            blurOnSubmit={false}
            editable={editable}
            // onBlur={() => _onUpdateUserData(props, label, value)}
            onBlur={() => setConfirmChange(true)}
          />
          {confirmChange &&
          <View style={ButtonsStyles.confirmGroup}>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setValue(item);
                setConfirmChange(false);
              }}>
              <Ionicons
                name={'ios-close-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.errorBackground}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setConfirmChange(false);
                _onUpdateUserData(props, label, value)
              }}>
              <Ionicons
                name={'ios-checkmark-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.successColor}
              />
            </TouchableOpacity>
          </View>
          }
        </View>
      );
    case 'datepicker':
      return (
        <View style={styles.datePickerContainer} key={label}>
          <Text style={InputStyles.groupLabel}>{label}</Text>
          <DatePickerIOS
            date={new Date()}
            onDateChange={(value) => {
              setValue(value.toString())
              _onUpdateUserData(props, label, value.toString())
            }}
            maximumDate={new Date()}
            mode={'date'}
          />
          {confirmChange &&
          <View style={ButtonsStyles.confirmGroup}>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setValue(item);
                setConfirmChange(false);
              }}>
              <Ionicons
                name={'ios-close-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.errorBackground}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setConfirmChange(false);
                _onUpdateUserData(props, label, value)
              }}>
              <Ionicons
                name={'ios-checkmark-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.successColor}
              />
            </TouchableOpacity>
          </View>
          }
        </View>
      );
    case 'gender':
      const data = [
        { key: 'male', label: 'Male' },
        { key: 'female', label: 'Female' }
      ]
      return (
        <View style={InputStyles.group}>
          <Text style={InputStyles.groupLabel}>{label}</Text>
          <ModalSelector
            data={data}
            initValue={value}
            onChange={(option) => {
              setValue(option.label);
              setConfirmChange(true)
            }}
          >
            <TextInput
              style={[InputStyles.groupTextInput, { marginLeft: 'auto' }, !editable ? { opacity: 0.5 } : {}]}
              value={value}
            />
          </ModalSelector>
          {confirmChange &&
          <View style={ButtonsStyles.confirmGroup}>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setValue(item);
                setConfirmChange(false);
              }}>
              <Ionicons
                name={'ios-close-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.errorBackground}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={ButtonsStyles.confirmButton}
              onPress={() => {
                setConfirmChange(false);
                _onUpdateUserData(props, label, value)
              }}>
              <Ionicons
                name={'ios-checkmark-circle'}
                size={28}
                style={{ marginBottom: -3 }}
                color={Colors.successColor}
              />
            </TouchableOpacity>
          </View>
          }
        </View>
      );
    default:
      return null
  }
}

export async function _onChangePhoto (props) {
  try {
    const photo = await _pickImage();
    if (!photo.cancelled) {
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`users/${props.userId}`);
      const upload = await ref.put(blob);
      const url = await ref.getDownloadURL()
      props.updateUser({ ...props.user, ...{ Avatar: url } }, props.userId)
    }
  } catch (e) {
    console.log(e)
  }
}

function _onUpdateUserData (props, label, value) {
  let data = props.user
  data[label] = value
  props.updateUser(data, props.userId)
}

function _onDeleteConfirm (props) {
  return (
    Alert.alert(
      'Delete account',
      'Are your sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          // onPress: () => props.deleteUser(props.user.uid),
          onPress: () => console.log('Yes Pressed'),
        },
      ],
      { cancelable: false },
    )
  )
}

function _onSignOut () {
  firebase.auth().signOut()
}

export const SettingsScreenWithRedux = connect(state => ({ ...state.userReducer }), {
  getUser,
  saveUser,
  updateUser,
  deleteUser
})(SettingsScreen);

SettingsScreenWithRedux.navigationOptions = {
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
  profile: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },

  profileAvatar: {
    marginRight: 16
  },

  profileDetails: {
    paddingTop: 16
  },

  profileName: {
    marginBottom: 4
  },

  profileTitle: {
    color: Colors.white,
    textAlign: 'left'
  },

  settingsList: {
    paddingTop: 32,
    paddingBottom: 16
  },

  datePickerContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginLeft: -16,
    marginRight: -16,
    marginBottom: 1
  },
});
