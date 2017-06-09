import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import * as actions from './../actions';

class AuthScreen extends Component {
  //
  // async componentWillMount(){
  // try {
  //   const {loadToken, loginScreen, mapScreen, dispatch} = this.props;
  //
  //
  //   const token = await AsyncStorage.getItem('fb_token');
  //   token ? mapScreen() : loginScreen();
  // } catch(reason){
  //   console.error(reason);
  // }
  // }
  //


  componentWillMount() {
    const { token, mapScreen, facebookLogin } = this.props;

    token ? mapScreen() : facebookLogin();
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  mapScreen: () => dispatch(NavigationActions.navigate({ routeName: 'main' })),
  facebookLogin: () => dispatch(actions.facebookLogin()),

});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
