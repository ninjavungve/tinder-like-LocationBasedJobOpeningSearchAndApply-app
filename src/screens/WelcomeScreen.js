import React, { Component } from 'react';
import Expo, { AppLoading } from 'expo';
import { View, Text ,AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Slides from './../components/Slides';
import { NavigationActions } from 'react-navigation';
import * as actions from './../actions';


const SLIDE_DATA = [
  { text: 'Welcome to jobTinder', color: '#03a9f4' },
  { text: 'Set your location, then swipe!', color: '#009688' },
  { text: 'Don\'t forget to allow location data in privacy settings.', color: '#03a9f4' },
];


class WelcomeScreen extends Component {


async componentWillMount(){
try {
  const {loadToken, loginScreen, mapScreen, dispatch} = this.props;


  const token = await AsyncStorage.getItem('fb_token');
  token ? mapScreen() : loginScreen();
} catch(reason){
  console.error(reason);
}
}




  onComplete = () => {

    const {token, loginScreen, mapScreen, dispatch} = this.props;
    //NavigationActions has actions for navigation , choose a string from your routes

    token ? mapScreen()  :  loginScreen();

  //pass
  }
  // check token instead!!
  //
  render() {
    const { token } = this.props;
    if(!token){
      return(
        <AppLoading />
      );
    }
    return(
        <Slides data={SLIDE_DATA} onComplete={this.onComplete}/>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({

  logout: () => dispatch({ type: 'Logout' }),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'auth' })),
  mapScreen: () => dispatch(NavigationActions.navigate({routeName: 'main'})),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
