import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import { LOAD_JOBS, SET_LOCATION, SET_SAVED_JOB, CLEAR_SAVED_JOB, CLEAR_ALL_SAVED_JOBS } from './../actions/types';


const INITIAL_STATE = {
  location: {
    latitude: 1.0,
    longitude: 1.0,
  },
  jobs: [],
  savedJobs: [],
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      return (action.payload.jobs !== undefined) ? { ...state, savedJobs: action.payload.jobs.savedJobs } : { ...state };
    case LOAD_JOBS:
      return { ...state, jobs: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_SAVED_JOB:
      return { ...state, savedJobs: _.uniqBy([...state.savedJobs, action.payload], 'jobkey') };
    case CLEAR_SAVED_JOB:
      return { ...state,
        savedJobs: state.savedJobs.filter(job => job.jobkey !== action.payload.jobkey) };
    case CLEAR_ALL_SAVED_JOBS:
      return { ...state, savedJobs: [] };
    default:
      return state;
  }
};

export { jobsReducer };
