import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';

import { set_saved_job } from './../actions';

import Deck from './../components/Deck';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
};

class DeckScreen extends Component {

  onSwipeLeft= ()=>  {
    console.log('swiped left. not adding job to selected array.');
  }

  onSwipeRight = (job)=>  {
    console.log('selected job object', job);
    const { acceptJob } = this.props;
    acceptJob(job);
  }

  renderCard = (job)=>  {
    // blabla
    return (
      <Card title={job.jobtitle} >
        <Text style={{ marginBottom: 10 }}>
        {job.company} | {job.city}
        </Text>
        <Text>
          {job.snippet}
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03a9f4"
          title="View!"
        />
      </Card>
    );
  }

  renderNomoreCards = ()=>  {
    return (
      <Card
        image={{
          uri: 'http://www.shunvmall.com/data/out/199/47401714-sad-face-images.jpeg',
        }}
      >
        <Text style={{ marginBottom: 10 }}>
          Nomore jobs to swipe..
        </Text>

      </Card>
    );
  }


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
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
