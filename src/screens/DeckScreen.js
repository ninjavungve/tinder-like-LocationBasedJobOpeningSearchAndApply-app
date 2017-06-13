import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Card, Button, Icon } from 'react-native-elements';
import { set_saved_job } from './../actions';
import Deck from './../components/Deck';

const KEYPROP = 'jobkey';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  detailWrapper: {
    marginBottom: 10,
  },
  mapViewStyle: {
    flex: 1,
  },
  renderNomoreStyle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  jobCompanyStyle: {
    marginBottom: 10,
  },
  cardInnerContainerViewStyle: {
    height: 300,
  },
  cardStyle: {
    height: 350,
  },
  textCenter: {
    textAlign: 'center',
  },
};

class DeckScreen extends Component {

  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
        <Icon
          name="description"
          size={30}
          color={tintColor}
        />),
  }


  onSwipeLeft = () => {
    console.log('swiped left. not adding job to selected array.');
  }

  onSwipeRight = (job) => {
    const { acceptJob } = this.props;
    acceptJob(job);
  }

  renderCard = (job) => {
    const region = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.005,
      latitudeDelta: 0.005,
    };
    return (
      <Card title={job.jobtitle} wrapperStyle={styles.cardStyle}>
        <View style={styles.cardInnerContainerViewStyle}>
        <MapView
          initialRegion={region}
          style={styles.mapViewStyle}
          scrollEnabled={false}
          cacheEnabled={Platform.OS === 'android'}
        />
        <View style={styles.detailWrapper}>
        <Text style={[styles.jobCompanyStyle, styles.textCenter]}>{job.company}</Text>
        <Text style={styles.textCenter} >{job.formattedRelativeTime}</Text>
        </View>

        <Text style={styles.textCenter}>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
        </View>
      </Card>
    );
  }

  renderNomoreCards = () => (
      <Card>

        <Text style={styles.renderNomoreStyle}>
          Nomore jobs to swipe in this region..
        </Text>

        <Button
          title="Back to Map"
          backgroundColor="#009688"
          onPress={this.props.goBackToMap}
        />
      </Card>
    )


  render() {
    const { jobs: DATA } = this.props;
    return (
      <View style={styles.container}>
        <Deck
          renderCard={this.renderCard}
          renderNomoreCards={this.renderNomoreCards}
          data={DATA}
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}
          keyProp={KEYPROP}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = dispatch => ({
  acceptJob: job => dispatch(set_saved_job(job)),
  goBackToMap: () => dispatch(NavigationActions.navigate({ routeName: 'map' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
