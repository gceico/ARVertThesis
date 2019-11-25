import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';

export default StyleSheet.create({
  header: {
    textTransform: 'uppercase',
    fontFamily: 'oswald',
    fontSize: 42,
    color: Colors.black80,
    textAlign: 'center'
  },
  headerSecondary: {
    textTransform: 'uppercase',
    fontFamily: 'oswald',
    fontSize: 36,
    color: Colors.white,
    textAlign: 'left'
  },
  caption: {
    fontFamily: 'roboto-light',
    fontSize: 14,
    color: Colors.black60,
    textAlign: 'center'
  },
  subHeader: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    color: Colors.white,
    textAlign: 'left'
  },
  subHeaderBlack: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    color: Colors.black80,
    textAlign: 'left'
  },
  label: {
    fontFamily: 'roboto-bold',
    fontSize: 12,
    textTransform: 'uppercase',
    color: Colors.black60
  },
  body: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
    color: Colors.black60,
  }
});