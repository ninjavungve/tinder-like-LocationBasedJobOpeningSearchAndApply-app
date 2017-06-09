import { SET_LOADING } from './../actions/types';

const INITIAL_STATE = {
  loading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};


export { loadingReducer };
