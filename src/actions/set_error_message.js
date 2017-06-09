import { SET_ERROR_MESSAGE } from './types';

const set_error_message = error_message => ({
  type: SET_ERROR_MESSAGE,
  payload: error_message,
});

export { set_error_message };
