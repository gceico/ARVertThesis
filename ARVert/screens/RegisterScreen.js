import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import {placeHolderPath} from '../secret';
import firebase from '../firebase'
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {getUser, saveUser, updateUser, deleteUser} from '../actions/userActions';
import {sendMail} from '../utils/Mail'
import TextStyles from '../styles/TextStyles'
import ContainerStyles from '../styles/ContainerStyles'
import ButtonsStyles from '../styles/ButtonsStyles';
import InputStyles from "../styles/InputStyles";
import Colors from "../constants/Colors";
import {loginBG, icon} from "../Assets";
import {DismissKeyboard} from "../components/DismissKeyboard";

function RegisterScreen(props) {
  const [userData, setData] = useState({email: '', firstName: '', name: '', password: ''});
  const [canSubmit, setCanSubmit] = useState({canSubmit: false, error: 'Please complete all fields!'})
  return (
      <DismissKeyboard>
        <Image source={icon} style={styles.logo}/>
        <Text style={[TextStyles.header, styles.header]}>Register</Text>
        <Text style={[TextStyles.caption, styles.caption]}>You need an account for ARVert</Text>
        <TextInput
          style={[InputStyles.textInput, styles.textInput]}
          value={userData.firstName}
          onChangeText={firstName => setData({...userData, ...{firstName: firstName}})}
          placeholder="First name"
          blurOnSubmit={false}
        />
        <TextInput
          style={[InputStyles.textInput, styles.textInput]}
          value={userData.name}
          onChangeText={name => setData({...userData, ...{name: name}})}
          placeholder="Last Name"
          blurOnSubmit={false}
        />
        <TextInput
          style={[InputStyles.textInput, styles.textInput]}
          value={userData.email}
          onChangeText={email => setData({...userData, ...{email: email}})}
          placeholder="Email"
          blurOnSubmit={false}
        />
        <TextInput
          style={[InputStyles.textInput, styles.textInput]}
          value={userData.password}
          onChangeText={password => setData({...userData, ...{password: password}})}
          secureTextEntry={true}
          placeholder="Password"
          blurOnSubmit={false}
        />
        <TouchableOpacity style={[ButtonsStyles.primary, ButtonsStyles.loginButton]}
                          onPress={() => {
                            if (!userData.email || !userData.password.length || !userData.firstName || !userData.name) {
                              setCanSubmit({canSubmit: false, error: 'Please complete all fields!'})
                            } else {
                              setCanSubmit({canSubmit: true, error: 'Please complete all fields!'})
                            }
                            if (canSubmit.canSubmit)
                              registerWithEmail(props, userData);
                            else {
                              Alert.alert('Oops!', canSubmit.error)
                            }
                          }}>
          <Text style={ButtonsStyles.primaryText}>Register</Text>
        </TouchableOpacity>
        <View style={[ContainerStyles.containerRow, styles.registerLink]}>
          <Text style={{color: Colors.black60}}>Already on board? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("LoginScreen")}>
            <Text style={ButtonsStyles.defaultLink}>Login.</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
  );
}

async function registerWithEmail(props, data) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    if (result.user.uid) {
      onSignIn(props, data, result);
      return result
    } else {
      Alert.alert('Oops!', 'Something went wrong!')
      return {canceled: true}
    }
  } catch (e) {
    Alert.alert('Oops!', e.message);
    return {error: true}
  }
}

function onSignIn(props, data, result) {
  try {
    const user = {
      BirthDate: '',
      LastName: data.name,
      FirstName: data.firstName,
      IdPlan: 'h6SKXhyFOrnw9D2EjRBi',
      Gender: 'Select',
      IdRole: 'Sk2dnquHZGlOyGthadH8',
      Email: data.email,
      Address: '',
      Enabled: result.user.emailVerified,
      LastLoginAt: result.user.lastLoginAt,
      CreatedAt: result.user.createdAt,
      PhoneNumber: '',
      Avatar: placeHolderPath
    };
    if (result.isNewUser) {
      props.saveUser(user, result.user.uid);
      const mail = {
        To: user.Email,
        From: "ceicoschi.gabriel@gmail.com",
        Subject: "Verify email",
        Text: "Verify your email for ARVert",
        User: result.user.uid
      };
    } else {
      props.updateUser(user, result.user.uid)
    }
  } catch (e) {
    console.log(e)
  }
}


export const RegisterScreenWithRedux = connect(state => ({...state.userReducer}), {
  getUser,
  saveUser,
  updateUser,
  deleteUser
})(RegisterScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    marginTop: 32
  },
  caption: {
    marginTop: 4,
    marginBottom: 32
  },
  logo: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 64,
  },
  loginButton: {
    marginTop: 32
  },
  textInput: {
    marginBottom: 8
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 32
  },
  googleButton: {
    height: 70,
    width: 70,
    marginRight: 8
  },
  facebookButton: {
    height: 70,
    width: 70,
    marginLeft: 8
  },
  registerLink: {
    marginTop: 16,
    justifyContent: 'center'
  }
});