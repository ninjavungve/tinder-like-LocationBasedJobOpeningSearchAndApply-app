// https://reactnavigation.org/docs/guides/redux
// https://github.com/react-community/react-navigation/blob/master/examples/ReduxExample/src/components/AuthButton.js

// sudo chown -R `whoami` ~/.atom


import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import * as configureStore from './reduxStore';
import * as actions from './actions';
import { AppNavigator } from './navigationConfig';


class Root extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(Root);


const store = configureStore.configure();

// store.dispatch(actions.facebookLogout());

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
        </Provider>
    );
  }
}

export default App;
