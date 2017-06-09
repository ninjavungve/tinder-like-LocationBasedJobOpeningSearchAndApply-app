import { SET_LOCATION } from './types';

const set_location = location => ({
  type: SET_LOCATION,
  payload: location,
});


export { set_location };
