import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

// console.log(SCREEN_WIDTH); // 320
// console.log(SCREEN_HEIGHT); // 568
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_TRESHOLD = Dimensions.get('window').width / 2;
const SWIPE_OUT_DURATION = 200;
const DEFAULT_POSITON_X = 0;
const DEFAULT_POSITON_Y = 0;
const CARD_STACK_MULTIPLIER = 10;

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
};

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    data: [],
    renderCard: () => {},
    keyProp: 'id',
  };

  constructor(props) {
    super(props);

    this.state = {
      cardIndex: 0,
    };

    this.position = new Animated.ValueXY({
      x: DEFAULT_POSITON_X,
      y: DEFAULT_POSITON_Y,
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // move right left only, x axis
        Animated.spring(this.position, {
          toValue: {
            x: gesture.dx,
            y: 0,
          },
        }).start();
      },
      onPanResponderRelease: (event, gesture) => {
        // switch to find out if the card is pulled right/left far enough to like/dislike
        switch (true) {
          case gesture.dx > SWIPE_TRESHOLD:
            this.forceSwipe('right');
            break;
          case gesture.dx < -SWIPE_TRESHOLD:
            this.forceSwipe('left');
            break;
          case gesture.dx < SWIPE_TRESHOLD && gesture.dx > -SWIPE_TRESHOLD:
            this.forceSwipe('center');
            break;
          default:
            break;
        }
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data !== this.props.data ? this.setState({ cardIndex: 0 }) : null;
  }

  componentWillUpdate() {
    // android compatibility code
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  onSwipeComplete = (direction) => {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    // current item we are swiping
    const card = data[this.state.cardIndex];
    // use switch?
    direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card);
    // reset this.position NOT THROUGH STATE!
    this.position.setValue({ x: 0, y: 0 });
    // increment the data[member] to render through state
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  }

  getCardStyle = () => {
    const position = this.position;
    // Transform takes this constant
    // interpolate position.x where screen_width/2 corellates to -30deg. This is a react-native API
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '30deg'],
    });
    // interpolate opacity!
    // const opacity = position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: [0.25, 1, 0.25],
    // });
  // opacity: opacity
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }
  // throw the card right/left
  forceSwipe= (direction) => {
    // animate out in the duration specified
    switch (direction) {
      case 'right':
        Animated.timing(this.position, {
          toValue: {
            x: 2 * SCREEN_WIDTH,
            y: 0,
          },
          duration: SWIPE_OUT_DURATION,
        }).start(() => this.onSwipeComplete(direction));
        break;
      case 'left':
        Animated.timing(this.position, {
          toValue: {
            x: 2 * -SCREEN_WIDTH,
            y: 0,
          },
          duration: SWIPE_OUT_DURATION,
        }).start(() => this.onSwipeComplete(direction));
        break;
      default:
        Animated.spring(this.position, {
          toValue: {
            x: DEFAULT_POSITON_X,
            y: DEFAULT_POSITON_Y,
          },
        }).start();
        break;
    }
  }

  renderCards = () => {
    const { keyProp } = this.props;

    if (this.state.cardIndex >= this.props.data.length) {
      return this.props.renderNomoreCards();
    }
    // only add animation to the first card..
    // reverse, otherwise last member is on top when stacked
    const deck = this.props.data.map((card, index) => {
        // If index=cardIndex, return animated,
        // if index < cardIndex, it's swiped, null
        // else return normally

      const top = CARD_STACK_MULTIPLIER * (index - this.state.cardIndex);
      const left = CARD_STACK_MULTIPLIER * (index - this.state.cardIndex);

      switch (true) {
        case index === this.state.cardIndex:
          return (
              <Animated.View
                key={card[keyProp]}
                style={[this.getCardStyle(), styles.cardStyle]}
                {...this.panResponder.panHandlers}
              >
                {this.props.renderCard(card)}
              </Animated.View>
          );
        case index < this.state.cardIndex:
          return null;
        default:
          return (
              <Animated.View
                key={card[keyProp]}
                style={[styles.cardStyle, { top, left }]}
              >
                {this.props.renderCard(card)}
              </Animated.View>
          );
      }
    });


    return Platform.OS === 'android' ? deck : deck.reverse();


    // REVERSE AT THE END!!! or nothing will work
  }
  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
