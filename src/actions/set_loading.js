import { SET_LOADING } from './types';

const set_loading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export { set_loading };
