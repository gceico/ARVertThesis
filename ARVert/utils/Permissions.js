import {ImagePicker, Notifications} from "expo";
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";


export async function _getPermissionAsync(user) {
  const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const {notification} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  const {location} = await Permissions.askAsync(Permissions.LOCATION);
  console.log(status)
  if (status !== 'granted') {
    console.log('Sorry, we need camera roll permissions to make this work!');
  }
  if (notification !== 'granted') {
    console.log('Sorry, we need notification permission to make this work!!');
  }
  if (location !== 'granted') {
    console.log('Sorry, we need location permission to make this work!!');
  } else {
    Location.startLocationUpdatesAsync('geolocation', {
      accuracy: Location.Accuracy.Low,
      timeInterval: 10000
    }, user);
  }
}

export async function _sendNotification(title, body) {
  let notificationId = await Notifications.presentLocalNotificationAsync({
      title: title,
      body: body,
      data: {type: 'immediate'}
    },
  );
  return (notificationId);
};

export async function _pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
  });
  return result
}