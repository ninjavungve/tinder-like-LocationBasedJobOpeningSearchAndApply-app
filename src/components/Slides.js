import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Slide from './Slide';


const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = {
  slideText: {
    fontSize: 30,
    color: '#fff',
    alignItems: 'center',
    marginBottom: 15
  },
  slideView: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    width: SCREEN_WIDTH
  },
  lastSlideButtonStyle: {
    backgroundColor: '#0288d1',
  }
};


class Slides extends Component {

  renderLastSlide = (index) => {
    if (index === this.props.data.length -1){
      return (
        <Button
        buttonStyle={styles.lastSlideButtonStyle}
        title="I'm ready!"
        raised
        onPress={this.props.onComplete} />);
    }
  }

  renderSlides = () => {
  const {data} = this.props;
  return data.map((page, index)=>{

    return (
      <View
        key={page.text}
        style={[styles.slideView, {backgroundColor: page.color}]}
        >
        <Text style={styles.slideText}>
          {page.text}
        </Text>
        {this.renderLastSlide(index)}
      </View>
    );


  });
  }

    render() {
      return (
        <ScrollView
          horizontal
          style={{flex:1}} showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {this.renderSlides()}
        </ScrollView>
      );
    }
}


export default Slides;
