import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const BACKEND_URL = 'http://rallycoding.herokuapp.com/api/tokens';


export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);

  if (previousToken) {
    return;
  }
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  const token = await Notifications.getExponentPushTokenAsync();
  await axios.post(BACKEND_URL, { token: { token } });
  AsyncStorage.setItem('pushtoken', token);
};
