import { CLEAR_SAVED_JOB } from './types';

const clear_saved_job = job => ({
  type: CLEAR_SAVED_JOB,
  payload: job,
});

export { clear_saved_job };
