import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';


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

  const store = createStore(reducer, initialState, compose(applyMiddleware(thunk), autoRehydrate(), window.devToolsExtension ? window.devToolsExtension() : f => f));


// WHITELIST OR BLACKLIST STORE OBJECTS auth, job.. = INITIAL_STATE !!
  persistStore(store, { storage: AsyncStorage });

// ,

  return store;
};

export { configure };
