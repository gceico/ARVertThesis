import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';
import Layout from "../constants/Layout";

export default StyleSheet.create({
  textInput: {
    padding: 8,
    fontSize: 14,
    height: 42,
    width: Layout.window.width - 32,
    alignSelf: 'center'
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: -16,
    marginRight: -16,
    marginBottom: 1
  },
  groupName: {
    paddingTop: 8 ,
    paddingBottom: 8
  },
  groupTextInput: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
    color: Colors.black80,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
    color: Colors.black80,
  },

  locationAddress: {
    fontFamily: 'roboto-regular',
    fontSize: 12,
    color: Colors.black60,
  },
  locationPreview: {
    height: 48,
    width: 48,
    marginRight: 16
  }
});