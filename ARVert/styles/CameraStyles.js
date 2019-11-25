import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';
import Layout from "../constants/Layout";

export default StyleSheet.create({
  adContainer: {
    backgroundColor: Colors.white,
    width: Layout.window.width - 32,
    padding: 16,
    borderRadius: 8,
  },
  adHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  adBody: {
    marginTop: 16
  }
});