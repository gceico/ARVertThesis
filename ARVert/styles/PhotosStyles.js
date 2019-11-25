import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

export default StyleSheet.create({
  avatarContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    padding: 4,
    backgroundColor: Colors.white
  },
  avatar: {
    height: 92,
    width: 92,
    borderRadius: 46,
  },
  avatarEdit:{
    backgroundColor: Colors.linkColor,
    height: 24,
    width: 24,
    borderRadius: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 8
  },
  locationPhotoContainer: {
    height: 100,
    width: 100,
    padding: 4,
    backgroundColor: Colors.white
  },
  locationPhoto: {
    height: 92,
    width: 92,
  },
  locationPhotoEdit:{
    backgroundColor: Colors.linkColor,
    height: 24,
    width: 24,
    borderRadius: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 8,
    bottom: 8
  }
});