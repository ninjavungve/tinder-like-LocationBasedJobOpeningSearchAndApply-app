import { LOAD_TOKEN, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, CLEAR_TOKEN, FACEBOOK_LOGOUT_FAIL, FACEBOOK_LOGOUT_SUCCESS } from './../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  token: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_TOKEN:
      return {
        ...state,
        token: '',
      };
    case FACEBOOK_LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: true,
      };
    case FACEBOOK_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOAD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
      };
    case FACEBOOK_LOGIN_FAIL:
      return {
        ...state,
        token: '',
        isLoggedIn: false,
      };
    default:
      return state;
  }
};


export { authReducer };
