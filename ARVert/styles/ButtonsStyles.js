import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

export default StyleSheet.create({
  primary: {
    backgroundColor: Colors.tintColor,
    width: Layout.window.width - 32,
    height: 48,
    padding: 8,
    alignSelf: 'center',
    borderRadius: 24,
  },

  primaryText: {
    fontSize: 16,
    lineHeight: 32,
    fontFamily: 'roboto-regular',
    color: Colors.white,
    textAlign: 'center',
  },
  defaultLink: {
    color: Colors.linkColor
  },
  roundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32
  },
  roundLabel: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    color: Colors.white,
    textTransform: 'uppercase',
    textAlign: 'left',
    marginLeft: 8
  },
  round: {
    height: 32,
    width: 32,
    backgroundColor: Colors.tintColor,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundSecondary: {
    height: 32,
    width: 32,
    backgroundColor: Colors.linkColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  confirmGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 64,
    marginLeft: 8
  }
});