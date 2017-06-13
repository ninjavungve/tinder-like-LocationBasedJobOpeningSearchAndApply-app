// https://reactnavigation.org/docs/guides/redux
// https://github.com/react-community/react-navigation/blob/master/examples/ReduxExample/src/components/AuthButton.js

// sudo chown -R `whoami` ~/.atom


import React from 'react';
import { Alert } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { Notifications } from 'expo';
import * as configureStore from './reduxStore';
import { AppNavigator } from './navigationConfig';
import registerForNotifications from './services/push_notifications';


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

  componentDidMount() {
    registerForNotifications();
    // callback in listener, executes when we get a not.
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      // YOU CAN DO ANYTHING, DISPATCH ETC HERE IN CALLBACK
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }],
        );
      }
    });
  }


  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
        </Provider>
    );
  }
}

export default App;
