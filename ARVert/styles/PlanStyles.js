import { StyleSheet } from "react-native";
import Colors from '../constants/Colors';
import Layout from "../constants/Layout";

export default StyleSheet.create({
  plansHeader: {
    color: Colors.mainColor,
    textAlign: 'left',
    marginTop: 32
  },
  plansCaption: {
    textAlign: 'left',
    marginTop: 8
  },
  planIntro: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 32
  },
  planWrapper: {
    width: Layout.window.width - 64,
    flex: 1,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: Colors.mainColor,
    alignItems: 'center'
  },
  planCarouselWrapper: {
    marginBottom: 32,
    flex: 1
  },
  planName: {
    textTransform: 'uppercase',
    fontFamily: 'roboto-bold',
    fontSize: 26,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  planBorder: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
  },
  planIconWrapper: {
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white95,
    borderRadius: 36,
  },
  separator:
    {
      height: 1,
      width: Layout.window.width - 96,
      backgroundColor: Colors.white40,
      marginBottom: 16,
      marginTop: 16

    },
  button: {
    width: Layout.window.width - 96,
  },
  buttonText: {
    marginTop: 8,
    marginBottom: 16,
    width: Layout.window.width - 96,
  },
  listItem: {
    width: Layout.window.width - 96,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listText: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'left',
    marginLeft: 8,
  },
  Close: {
    position: 'absolute',
    right: 16,
    top: 36,
  }
});