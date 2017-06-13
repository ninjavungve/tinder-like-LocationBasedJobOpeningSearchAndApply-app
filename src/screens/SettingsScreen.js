import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { clear_all_saved_jobs, clear_saved_job } from './../actions';

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },

    tabBarIcon: ({ tintColor }) => (
        <Icon
          name="settings"
          size={30}
          color={tintColor}
        />),

  });

  clearAllSavedJobs = () => {
    const { clearAll, goBackToMap } = this.props;
    clearAll();
    goBackToMap();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Button
          title="Clear All Saved Jobs"
          backgroundColor="#f44336"
          onPress={this.clearAllSavedJobs}
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  clearAll: () => dispatch(clear_all_saved_jobs()),
  goBackToMap: () => dispatch(NavigationActions.navigate({ routeName: 'map' })),
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
