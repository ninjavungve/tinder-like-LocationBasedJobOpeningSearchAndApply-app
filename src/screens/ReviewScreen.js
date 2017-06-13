import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { clear_saved_job } from './../actions';

import SettingsScreen from './SettingsScreen';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  detailWrapper: {
    alignContent: 'center',
    marginBottom: 10,
  },
  mapViewStyle: {
    flex: 1,
    marginBottom: 10,
  },
  renderNomoreStyle: {
    marginBottom: 10,
  },
  jobCompanyStyle: {
    marginBottom: 10,
  },
  cardInnerContainerViewStyle: {
    height: 200,
    marginBottom: 10,
  },
  cardStyle: {
    height: 350,
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonContainerStyle: {
    marginBottom: 10,
  },
};

class ReviewScreen extends Component {

// class level function, no access to instance PROPS
  static navigationOptions = ({ navigation }) => ({
    title: 'Review',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    headerRight: <Button
      backgroundColor="transparent"
      iconRight
      icon={{ name: 'cog', color: 'rgba(0,122,255,1)', size: 30, type: 'font-awesome' }}
      onPress={() => { navigation.navigate('settings'); }}
    />,
    tabBarIcon: ({ tintColor }) => (
        <Icon
          name="favorite"
          size={30}
          color={tintColor}
        />),
  })

  renderLikedJobs = () => {
    const { savedJobs, clearJob } = this.props;

    const savedJobsList = savedJobs.map((job) => {
      const region = {
        longitude: job.longitude,
        latitude: job.latitude,
        longitudeDelta: 0.001,
        latitudeDelta: 0.001,
      };
      return (
        <Card key={job.jobkey} title={job.jobtitle}>
          <View style={styles.cardInnerContainerViewStyle}>
          <MapView
            initialRegion={region}
            style={styles.mapViewStyle}
            scrollEnabled={false}
            cacheEnabled={Platform.OS === 'android'}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.textCenter} >{job.company}</Text>
            <Text style={styles.textCenter}>{job.formattedRelativeTime}</Text>
          </View>
  <Button
  title="Apply"
  buttonStyle={styles.buttonContainerStyle}
  backgroundColor="#03a9f4"
  onPress={() => Linking.openURL(job.url)}
  />

  <Button
  title="Clear Job"
  buttonStyle={styles.buttonContainerStyle}

  backgroundColor="#03a9f4"
  onPress={() => clearJob(job)}
  />


        </View>
        </Card>
      );
    });
    return savedJobsList;
  }


  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  savedJobs: state.jobs.savedJobs,
});

const mapDispatchToProps = dispatch => ({
  clearJob: job => dispatch(clear_saved_job(job)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);
