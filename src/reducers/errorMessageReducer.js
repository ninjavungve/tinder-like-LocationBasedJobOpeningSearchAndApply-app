import { SET_ERROR_MESSAGE } from './../actions/types';

const INITIAL_STATE = {};

const errorMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};


export { errorMessageReducer };
