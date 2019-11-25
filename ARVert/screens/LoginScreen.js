import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {iosClientId, facebookConfig} from '../secret';
import {Google} from 'expo';
import * as Facebook from 'expo-facebook'
import firebase from '../firebase'
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {saveUser, updateUser} from '../actions/userActions';
import TextStyles from '../styles/TextStyles'
import ContainerStyles from '../styles/ContainerStyles'
import ButtonsStyles from '../styles/ButtonsStyles';
import InputStyles from "../styles/InputStyles";
import Colors from "../constants/Colors";
import {loginBG, icon, facebookIcon, googleIcon} from "../Assets";
import {DismissKeyboard} from "../components/DismissKeyboard";

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <DismissKeyboard>
      <Image source={icon} style={styles.logo}/>
      <Text style={[TextStyles.header, styles.header]}>Login</Text>
      <Text style={[TextStyles.caption, styles.caption]}>Please Login first!</Text>
      <TextInput
        style={[InputStyles.textInput, styles.textInput]}
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder="Email"
        blurOnSubmit={false}
      />
      <TextInput
        style={[InputStyles.textInput, styles.textInput]}
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
        placeholder="Password"
        blurOnSubmit={false}
      />
      <TouchableOpacity style={[ButtonsStyles.primary, ButtonsStyles.loginButton]}
                        onPress={() => signInWithEmail(props, email, password)}>
        <Text style={ButtonsStyles.primaryText}>Login</Text>
      </TouchableOpacity>
      <View style={[ContainerStyles.containerRow, styles.registerLink]}>
        <Text style={{color: Colors.black60}}>Do you need an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("RegisterScreen")}>
          <Text style={ButtonsStyles.defaultLink}>Register.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity onPress={() => signInWithGoogleAsync(props)}>
          <ImageBackground
            source={googleIcon}
            style={styles.googleButton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signInWithFacebookAsync(props)}>
          <ImageBackground
            source={facebookIcon}
            style={styles.facebookButton}
          />
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
}

async function signInWithEmail(props, email, password) {
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    if (result.user.uid) {
      return result
    } else {
      Alert.alert('Oops!', 'Something went wrong!');
      return {canceled: true}
    }
  } catch (e) {
    Alert.alert('Oops!', e.message);
    return {error: true}
  }
}

function isUserEqual(providerUser, firebaseUser, provider) {
  if (firebaseUser) {
    let providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (provider === 'google') {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === providerUser.getBasicProfile().getId()) {
          return true;
        }
      }
      if (provider === 'facebook') {
        if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === providerUser.getBasicProfile().getId()) {
          return true;
        }
      }

    }
  }
  return false;
}

async function signInWithFacebookAsync(props) {
  try {
    const result = await Facebook.logInWithReadPermissionsAsync(
      facebookConfig.appId,
      {permissions: ['public_profile', 'email']}
    );
    if (result.type === 'success') {
      onFacebookSignIn(result, props);
      return result.token;
    } else {
      return {canceled: true}
    }
  } catch (e) {
    return {error: true}
  }
}

async function signInWithGoogleAsync(props) {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      iosClientId: iosClientId,
      scopes: ['profile', 'email']
    });

    if (result.type === 'success') {
      onGoogleSignIn(result, props);
      return result.accessToken
    } else {
      return {canceled: true}
    }
  } catch (e) {
    return {error: true}
  }
}

function onFacebookSignIn(facebookUser, props) {
  // console.log('Facebook Auth Response', facebookUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(facebookUser, firebaseUser, 'facebook')) {
      // Build Firebase credential with the Facebook ID token.
      let credential = firebase.auth.FacebookAuthProvider.credential(facebookUser.token,);
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential)
        .then(async (result) => {
          // console.log(result, 'cool user')
          const user = {
            BirthDate: '',
            LastName: result.additionalUserInfo.profile.name,
            FirstName: result.additionalUserInfo.profile.first_name,
            IdPlan: 'h6SKXhyFOrnw9D2EjRBi',
            Gender: 'Select',
            IdRole: 'Sk2dnquHZGlOyGthadH8',
            Email: result.additionalUserInfo.profile.email,
            Address: '',
            Enabled: result.user.emailVerified,
            LastLoginAt: result.user.lastLoginAt,
            CreatedAt: result.user.createdAt,
            PhoneNumber: result.user.phoneNumber,
            Avatar: result.additionalUserInfo.profile.picture.url
          };
          if (result.additionalUserInfo.isNewUser) {
            props.saveUser(user, result.user.uid)
          } else {
            props.updateUser(user, result.user.uid)
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', error.message)
        });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

function onGoogleSignIn(googleUser, props) {
  console.log('Google Auth Response', googleUser);

  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser, 'google')) {
      // Build Firebase credential with the Google ID token.
      let credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential)
        .then(async (result) => {
          // console.log(result);
          const user = {
            BirthDate: '',
            LastName: result.additionalUserInfo.profile.family_name,
            FirstName: result.additionalUserInfo.profile.given_name,
            IdPlan: 'h6SKXhyFOrnw9D2EjRBi',
            Gender: 'Select',
            IdRole: 'Sk2dnquHZGlOyGthadH8',
            Email: result.user.email,
            Address: '',
            Enabled: result.user.emailVerified,
            LastLoginAt: result.user.lastLoginAt,
            CreatedAt: result.user.createdAt,
            PhoneNumber: result.user.phoneNumber,
            Avatar: result.user.photoURL
          };
          if (result.isNewUser) {
            props.saveUser(user, result.user.uid)
          } else {
            props.updateUser(user, result.user.uid)
          }
        })
        .catch((error) => {
          console.log(error)
          Alert.alert('Error', error.message)
        });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

export const LoginScreenWithRedux = connect(state => ({...state.userReducer}), {
  saveUser,
  updateUser
})(LoginScreen);

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
    marginTop: 32,
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
    justifyContent: 'center',
  }
});