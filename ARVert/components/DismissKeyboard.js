import React from 'react'
import {View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground} from "react-native";
import {loginBG} from "../Assets";
import ContainerStyles from "../styles/ContainerStyles";

export function DismissKeyboard({children}) {
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      <ImageBackground source={loginBG} style={ContainerStyles.container} resizeMode={'stretch'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            {children}
            <View style={{flex: 1}}/>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}


export function DismissKeyboardScroll({children}) {
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            {children}
          </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}