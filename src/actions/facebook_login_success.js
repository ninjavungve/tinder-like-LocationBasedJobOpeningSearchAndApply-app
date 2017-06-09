import { FACEBOOK_LOGIN_SUCCESS } from './types';

const facebook_login_success = token => ({
  type: FACEBOOK_LOGIN_SUCCESS,
  payload: token,
});

export { facebook_login_success };
