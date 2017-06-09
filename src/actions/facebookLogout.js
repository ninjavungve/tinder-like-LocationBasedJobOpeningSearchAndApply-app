import { AsyncStorage } from 'react-native';


import { CLEAR_TOKEN, FACEBOOK_LOGOUT_SUCCESS, FACEBOOK_LOGOUT_FAIL, LOGOUT } from './types';


// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogout = () => async (dispatch) => {
  try {
    const error = await AsyncStorage.removeItem('fb_token');
    console.log('AsyncStorage Error: ', error);
    if (!error) {
    // Dispatch an action saying FB login is done
      dispatch({ type: FACEBOOK_LOGOUT_SUCCESS });
      dispatch({ type: CLEAR_TOKEN });
      dispatch({ type: LOGOUT });
    } else {
    // Start up FB Login process
      dispatch({ type: FACEBOOK_LOGOUT_FAIL });
      dispatch({ type: CLEAR_TOKEN });
      dispatch({ type: LOGOUT });
    }
  } catch (err) {
    console.log(err);
  }
};
