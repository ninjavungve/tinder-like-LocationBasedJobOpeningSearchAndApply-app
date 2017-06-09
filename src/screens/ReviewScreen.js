import React, { Component } from 'react';
import { View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import SettingsScreen from './SettingsScreen';

class ReviewScreen extends Component {

//class level function, no access to instance PROPS
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
     headerStyle: {
       marginTop: Platform.OS === 'android' ? 24 : 0
     },
    headerRight: <Button
      backgroundColor='transparent'
      iconRight
      icon={{name: 'cog', color: 'rgba(0,122,255,1)', size: 30, type: 'font-awesome'}}
      onPress={() => { navigation.navigate('settings') }} />
    })

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}


export default connect()(ReviewScreen);
