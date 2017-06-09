import { SET_SAVED_JOB } from './types';

const set_saved_job = job => ({
  type: SET_SAVED_JOB,
  payload: job,
});


export { set_saved_job };
