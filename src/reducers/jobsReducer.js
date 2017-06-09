import { LOAD_JOBS, SET_LOCATION, SET_SAVED_JOB } from './../actions/types';


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
    case LOAD_JOBS:
      return { ...state, jobs: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_SAVED_JOB:
      return { ...state, savedJobs: [...state.savedJobs, action.payload] };
    default:
      return state;
  }
};

export { jobsReducer };
