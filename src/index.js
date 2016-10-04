/**
 * @flow
 */

import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import _ from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';

import CarouselItem from './CarouselItem';

const ANIM_CONFIG = { duration: 300 };
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export type Slide = {
  imageUrl: string,
  imageHeight: number,
  caption: ?string,
};

type Props = {
  style: ?number | ?Object,
  headingStyle: ?number | ?Object,
  captionStyle: ?number | ?Object,
  slides: Array<Slide>,
  heading: ?string,
};
type State = {
  origin: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  target: {
    x: number,
    y: number,
    opacity: number,
  },
  openAnim: Animated.Value,
  pan: Animated.Value,
  fullscreen: boolean,
  selectedIdx: number,
  animating: boolean,
  panning: boolean,
  selectedImageHidden: boolean,
  slidesDown: boolean,
};

export default class ImageCarousel extends Component<any, Props, State> {
  props: Props;
  state: State;
  panResponder: PanResponder;
  carouselItems: Array<CarouselItem>;

  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object).isRequired,
    heading: PropTypes.string,
    style: View.propTypes.style,
    headingStyle: Text.propTypes.style,
    captionStyle: Text.propTypes.style,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      target: {
        x: 0,
        y: 0,
        opacity: 1,
      },
      openAnim: new Animated.Value(0),
      pan: new Animated.Value(0),
      fullscreen: false,
      selectedIdx: 0,
      animating: false,
      panning: false,
      selectedImageHidden: false,
      slidesDown: false,
    };

    this.carouselItems = _.map(null)(props.slides);
  }

  componentWillMount() {
    (this: any)._handlePanEnd = this._handlePanEnd.bind(this);
    (this: any)._handleCaroselItemPress =
      this._handleCaroselItemPress.bind(this);
    (this: any)._handleGalleryClosePress =
      this._handleGalleryClosePress.bind(this);
    (this: any)._getSwipeableStyle = this._getSwipeableStyle.bind(this);
    (this: any)._renderFullscreen = this._renderFullscreen.bind(this);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.state.animating,
      onStartShouldSetPanResponderCapture: () => !this.state.animating,
      onMoveShouldSetPanResponder: () => !this.state.animating,
      onMoveShouldSetPanResponderCapture: () => !this.state.animating,
      onPanResponderTerminationRequest: () => true,

      onPanResponderMove: (evt: Object, gestureState: Object) => {
        Animated.event([null, { dy: this.state.pan }])(evt, gestureState);
        if (Math.abs(gestureState.dy) > 15 && !this.state.panning) {
          this.state.pan.setValue(0);
          this.setState({ panning: true });
        }
      },
      onPanResponderRelease: this._handlePanEnd,
      onPanResponderTerminate: this._handlePanEnd,
    });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    if (nextState.fullscreen || this.state.fullscreen) {
      return !_.eq(nextState.origin, this.state.origin)
        || !_.eq(nextState.target, this.state.target)
        || nextState.panning !== this.state.panning
        || nextState.animating !== this.state.animating
        || nextState.selectedImageHidden !== this.state.selectedImageHidden
        || nextState.selectedIdx !== this.state.selectedIdx;
    }

    return nextProps.headingStyle !== this.props.headingStyle;
  }

  _handlePanEnd(evt: Object, gestureState: Object) {
    if (Math.abs(gestureState.dy) > 150) {
      this.setState({
        panning: false,
        target: {
          x: gestureState.dx,
          y: gestureState.dy,
          opacity: 1 - Math.abs(gestureState.dy / screenHeight),
        },
      });

      this._handleGalleryClosePress();
    } else {
      Animated.timing(
        this.state.pan,
        { toValue: 0, ...ANIM_CONFIG },
      ).start(() => this.setState({ panning: false }));
    }
  }

  _handleCaroselItemPress(selectedIdx: number) {
    StatusBar.setHidden(true, 'fade');

    this.setState({ fullscreen: true });

    this.carouselItems[selectedIdx].measure((
      rx: number, ry: number,
      width: number, height: number,
      x: number, y: number,
    ) => {
      this.setState({
        selectedIdx,
        animating: true,
        origin: { x, y, width, height },
        target: { x: 0, y: 0, opacity: 1 },
      });
      Animated.timing(this.state.openAnim,
        { ...ANIM_CONFIG, toValue: 1 },
      ).start(() => this.setState({ animating: false }));
    });
  }

  _handleGalleryClosePress() {
    StatusBar.setHidden(false, 'fade');

    this.setState({ animating: true });

    this.carouselItems[this.state.selectedIdx].measure((
      rx: number, ry: number,
      width: number, height: number,
      x: number, y: number,
    ) => {
      this.setState({
        origin: { x, y, width, height },
        slidesDown: x + width < 0 || x > screenWidth,
      });
      Animated.timing(
        this.state.openAnim,
        { ...ANIM_CONFIG, toValue: 0 },
      ).start(() =>
        this.setState({
          animating: false,
          fullscreen: false,
          selectedImageHidden: false,
          slidesDown: false,
        }));
    });
  }

  _getSwipeableStyle(idx: number): Object {
    const {
      fullscreen, openAnim, origin, selectedIdx, slidesDown, target,
    } = this.state;

    const inputRange = [0, 1];

    if (fullscreen && idx === selectedIdx) {
      return !slidesDown ? {
        left: openAnim.interpolate({
          // $FlowFixMe
          inputRange, outputRange: [origin.x, target.x],
        }),
        top: openAnim.interpolate({
          // $FlowFixMe
          inputRange, outputRange: [origin.y, target.y],
        }),
        width: openAnim.interpolate({
          // $FlowFixMe
          inputRange, outputRange: [origin.width, screenWidth],
        }),
        height: openAnim.interpolate({
          // $FlowFixMe
          inputRange, outputRange: [origin.height, screenHeight],
        }),
      } : {
        left: 0,
        right: 0,
        height: screenHeight,
        top: openAnim.interpolate({
          // $FlowFixMe
          inputRange, outputRange: [screenHeight, target.y],
        }),
      };
    }

    return { flex: 1 };
  }

  _renderFullscreen(): ReactElement<any> {
    const {
      animating,
      fullscreen,
      openAnim,
      origin,
      pan,
      panning,
      selectedIdx,
      selectedImageHidden,
      target,
    } = this.state;

    const opacity = {
      opacity: panning
        ? pan.interpolate({
          inputRange: [-screenHeight, 0, screenHeight],
          // $FlowFixMe
          outputRange: [0, 1, 0],
        })
        : openAnim.interpolate({
          inputRange: [0, 1],
          // $FlowFixMe
          outputRange: [0, target.opacity],
        }),
    };

    return (
      <Modal
        transparent
        visible={fullscreen}
        onShow={() => {
          if (!selectedImageHidden && animating) {
            this.setState({ selectedImageHidden: true });
          }
        }}
      >
        <Animated.View style={[styles.modalBackground, opacity]} />
        <SwipeableViews
          style={StyleSheet.absoluteFill}
          index={selectedIdx}
          onChangeIndex={(idx: number) => {
            this.setState({ selectedIdx: idx });
          }}
          scrollEnabled={!animating && !panning}
        >
          {
            _
              .map
              .convert({ cap: false })(
                (slide: Slide, idx: number): ReactElement<any> =>
                  <Animated.View
                    key={`${slide.imageUrl}${idx}`}
                    style={[
                      this._getSwipeableStyle(idx),
                      (selectedIdx === idx && panning) &&
                        { top: this.state.pan },
                    ]}
                  >
                    <ScrollView
                      style={{ flex: 1 }}
                      contentContainerStyle={{ flex: 1 }}
                      maximumZoomScale={2}
                      alwaysBounceVertical={false}
                    >
                      <Image
                        style={{ flex: 1 }}
                        source={{ uri: slide.imageUrl, height: origin.height }}
                        resizeMode="contain"
                        {...this.panResponder.panHandlers}
                      />
                    </ScrollView>
                  </Animated.View>,
              )(this.props.slides)
          }
        </SwipeableViews>
        <TouchableWithoutFeedback
          style={styles.closeButton}
          onPress={this._handleGalleryClosePress}
        >
          <Animated.View style={opacity}>
            <Text style={styles.closeText}>Close</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  render(): ReactElement<any> {
    const { style, headingStyle, captionStyle, heading, slides } = this.props;

    return (
      <View style={style}>
        {heading && <Text style={headingStyle}>{heading}</Text>}
        <ScrollView
          horizontal
          scrollEnabled={!this.state.animating}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          {
            _
              .map
              .convert({ cap: false })(
                (slide: Slide, idx: number): ReactElement<any> => {
                  const opacity = {
                    opacity: this.state.selectedImageHidden
                      && this.state.selectedIdx === idx ? 0 : 1,
                  };

                  return (
                    <CarouselItem
                      key={`${slide.imageUrl}${idx}`}
                      ref={(carouselItem: CarouselItem) => {
                        this.carouselItems[idx] = carouselItem;
                      }}
                      style={opacity}
                      slide={slide}
                      captionStyle={captionStyle}
                      onPress={() => this._handleCaroselItemPress(idx)}
                    />
                  );
                },
              )(slides)
          }
        </ScrollView>
        {this._renderFullscreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 10,
  },
});