import { LOAD_JOBS } from './types';

const load_jobs = jobs => ({
  type: LOAD_JOBS,
  payload: jobs,
});

export { load_jobs };
