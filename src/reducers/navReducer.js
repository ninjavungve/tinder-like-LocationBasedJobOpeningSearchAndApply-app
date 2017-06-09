import { AppNavigator } from './../navigationConfig';


const INITIAL_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('welcome'));

const navReducer = (state = INITIAL_STATE, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export { navReducer };
