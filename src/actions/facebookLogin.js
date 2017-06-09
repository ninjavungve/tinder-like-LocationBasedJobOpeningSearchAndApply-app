import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { APPID } from './../config/facebookConfig';
import { LOAD_TOKEN, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';


// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
    // Dispatch an action saying FB login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
    // Start up FB Login process
      doFacebookLogin(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

const doFacebookLogin = async (dispatch) => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(APPID, {
      permissions: ['public_profile'],
    });


    if (type === 'cancel') {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } catch (error) {
    console.log(error);
  }
};
