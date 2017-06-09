import React, { Component } from 'react';
import { View, Text,Platform} from 'react-native';
import {Button} from 'react-native-elements';

class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    headerLeft: <Button
      backgroundColor='transparent'
      icon={{name: 'chevron-left', color: 'rgba(0,122,255,1)', size: 30, type: 'font-awesome'}}
      onPress={() => { navigation.navigate('review') }} />
    })

  render() {
    return (
      <View>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}


export default SettingsScreen;
