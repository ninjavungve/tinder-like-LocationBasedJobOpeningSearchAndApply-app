import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import { authReducer, loadingReducer, errorMessageReducer, navReducer, jobsReducer } from './../reducers';


const configure = (initialState = {}) => {
  const REDUCERS_OBJECT = {
    nav: navReducer,
    auth: authReducer,
    loading: loadingReducer,
    error: errorMessageReducer,
    jobs: jobsReducer,
  };

  const reducer = combineReducers(REDUCERS_OBJECT);

  const store = createStore(reducer, initialState, compose(applyMiddleware(thunk), window.devToolsExtension
        ? window.devToolsExtension()
        : f => f));

  return store;
};

export { configure };
