/* @flow */

import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views-native';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

const ANIM_CONFIG = {duration: 300};
const screenSize = Dimensions.get('window');
const screenWidth = screenSize.width;
const screenHeight =
  screenSize.height -
  Platform.select({ios: 0, android: StatusBar.currentHeight});

type PropsType = {|
  style?: ?StyleObj,
  contentContainerStyle?: ?StyleObj,
  activeProps?: ?{[key: string]: mixed},
  activeComponents?: $ReadOnlyArray<React.Element<*>>,
  children?: React.Element<*> | $ReadOnlyArray<React.Element<*>>,
  zoomEnabled: boolean,
  hideStatusBarOnOpen: boolean,
  renderHeader?: ?() => React.Element<*>,
  renderFooter?: ?() => React.Element<*>,
  renderContent?: ?(idx: number) => React.Element<*>,
  onIdxChange?: ?(idx: number) => void,
  onOpen?: ?() => void,
  onClose?: ?() => void,
  horizontal?: boolean,
|};
type StateType = {|
  origin: {|
    x: number,
    y: number,
    width: number,
    height: number,
  |},
  target: {|
    x: number,
    y: number,
    opacity: number,
  |},
  fullscreen: boolean,
  selectedIdx: number,
  animating: boolean,
  panning: boolean,
  selectedImageHidden: boolean,
  slidesDown: boolean,
|};

class ImageCarousel extends React.Component<PropsType, StateType> {
  static defaultProps = {
    zoomEnabled: true,
    hideStatusBarOnOpen: true,
  };

  panResponder: Object; // eslint-disable-line flowtype/no-weak-types
  openAnim = new Animated.Value(0);
  pan = new Animated.Value(0);
  carouselItems: $ReadOnlyArray<?React.Element<*>> = Array.isArray(
    this.props.children,
  )
    ? this.props.children.map(() => null)
    : [null];

  state = {
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
    fullscreen: false,
    selectedIdx: 0,
    animating: false,
    panning: false,
    selectedImageHidden: false,
    slidesDown: false,
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.state.animating,
      onStartShouldSetPanResponderCapture: () => !this.state.animating,
      onMoveShouldSetPanResponder: () => !this.state.animating,
      onMoveShouldSetPanResponderCapture: () => !this.state.animating,
      onPanResponderTerminationRequest: () => true,
      // eslint-disable-next-line flowtype/no-weak-types
      onPanResponderMove: (evt: Object, gestureState: Object) => {
        this.pan.setValue(gestureState.dy);

        // eslint-disable-next-line no-magic-numbers
        if (Math.abs(gestureState.dy) > 15 && !this.state.panning) {
          this.pan.setValue(0);
          this.setState({panning: true});
        }
      },
      onPanResponderRelease: this.handlePanEnd,
      onPanResponderTerminate: this.handlePanEnd,
    });
  }

  open = (startIdx: number) => {
    const activeComponent = this.getComponentAtIdx(startIdx);

    if (!activeComponent) return;

    const {hideStatusBarOnOpen, onIdxChange, onOpen} = this.props;

    if (hideStatusBarOnOpen && Platform.OS === 'ios') {
      StatusBar.setHidden(true, 'fade');
    }

    (activeComponent: $FlowFixMe).measure(
      // eslint-disable-next-line max-params
      (
        rx: number,
        ry: number,
        width: number,
        height: number,
        x: number,
        y: number,
      ) => {
        this.setState(
          {
            fullscreen: true,
            selectedIdx: startIdx,
            animating: true,
            origin: {x, y, width, height},
            target: {x: 0, y: 0, opacity: 1},
          },
          () => {
            if (onIdxChange) {
              onIdxChange(startIdx);
            }

            this.animateOpenAnimToValue(1, onOpen);
          },
        );
      },
    );
  };

  close = () => {
    const activeComponent = this.getComponentAtIdx(this.state.selectedIdx);

    if (!activeComponent) return;

    const {hideStatusBarOnOpen, onClose} = this.props;

    if (hideStatusBarOnOpen && Platform.OS === 'ios') {
      StatusBar.setHidden(false, 'fade');
    }

    this.setState({animating: true});

    (activeComponent: $FlowFixMe).measure(
      // eslint-disable-next-line max-params
      (
        rx: number,
        ry: number,
        width: number,
        height: number,
        x: number,
        y: number,
      ) => {
        this.setState({
          origin: {x, y, width, height},
          slidesDown: x + width < 0 || x > screenWidth,
        });

        this.animateOpenAnimToValue(0, () => {
          this.setState({
            fullscreen: false,
            selectedImageHidden: false,
            slidesDown: false,
          });

          if (onClose) {
            onClose();
          }
        });
      },
    );
  };

  captureCarouselItem = (ref: ?React.Component<typeof View>, idx: number) => {
    // $FlowFixMe
    this.carouselItems[idx] = ref;
  };

  getChildren = (): $ReadOnlyArray<React$Element<*>> => {
    const {children} = this.props;

    if (Array.isArray(children)) {
      return children;
    } else if (children) {
      return [children];
    }

    return [];
  };

  getComponentAtIdx = (idx: number): React.Node => {
    const {activeComponents} = this.props;

    return activeComponents ? activeComponents[idx] : this.carouselItems[idx];
  };

  animateOpenAnimToValue = (toValue: number, onComplete?: ?() => void) =>
    Animated.timing(this.openAnim, {
      ...ANIM_CONFIG,
      toValue,
    }).start(() => {
      this.setState({animating: false});
      if (onComplete) {
        onComplete();
      }
    });

  // eslint-disable-next-line flowtype/no-weak-types
  handlePanEnd = (evt: Object, gestureState: {dx: number, dy: number}) => {
    // eslint-disable-next-line no-magic-numbers
    if (Math.abs(gestureState.dy) > 150) {
      this.setState({
        panning: false,
        target: {
          x: gestureState.dx,
          y: gestureState.dy,
          opacity: 1 - Math.abs(gestureState.dy / screenHeight),
        },
      });

      this.close();
    } else {
      Animated.timing(this.pan, {
        toValue: 0,
        ...ANIM_CONFIG,
      }).start(() => this.setState({panning: false}));
    }
  };

  getSwipeableStyle = (idx: number): StyleObj => {
    const {fullscreen, origin, selectedIdx, slidesDown, target} = this.state;

    if (!fullscreen || idx !== selectedIdx) {
      return {flex: 1};
    }

    const inputRange = [0, 1];

    return !slidesDown
      ? {
          left: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.x, target.x],
          }),
          top: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.y, target.y],
          }),
          width: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.width, screenWidth],
          }),
          height: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.height, screenHeight],
          }),
        }
      : {
          left: 0,
          right: 0,
          height: screenHeight,
          top: this.openAnim.interpolate({
            inputRange,
            outputRange: [screenHeight, target.y],
          }),
        };
  };

  handleModalShow = () => {
    const {animating, selectedImageHidden} = this.state;

    if (!selectedImageHidden && animating) {
      this.setState({selectedImageHidden: true});
    }
  };

  handleChangeIdx = (idx: number) => {
    this.setState({selectedIdx: idx});
    if (this.props.onIdxChange) {
      this.props.onIdxChange(idx);
    }
  };

  renderFullscreenContent = (child: React$Element<*>, idx: number) => {
    const {renderContent, zoomEnabled} = this.props;
    const {selectedIdx, panning} = this.state;

    const content = renderContent && renderContent(idx);
    const containerStyle = [
      this.getSwipeableStyle(idx),
      selectedIdx === idx && panning && {top: this.pan},
    ];

    return (
      <Animated.View key={idx} style={containerStyle}>
        <ScrollView
          ref={ref => {
            if (ref) {
              // https://github.com/facebook/react-native/issues/11206
              // eslint-disable-next-line no-param-reassign
              ref.scrollResponderHandleStartShouldSetResponder = () => true;
            }
          }}
          contentContainerStyle={styles.fill}
          maximumZoomScale={zoomEnabled ? 2 : 1} // eslint-disable-line no-magic-numbers
          alwaysBounceVertical={false}
        >
          {content
            ? React.cloneElement(content, {
                ...content.props,
                ...this.panResponder.panHandlers,
              })
            : React.cloneElement(child, {
                ...child.props,
                ...this.props.activeProps,
                ...this.panResponder.panHandlers,
              })}
        </ScrollView>
      </Animated.View>
    );
  };

  renderDefaultHeader = () => (
    <TouchableWithoutFeedback onPress={this.close}>
      <View>
        <Text style={styles.closeText}>Close</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  getFullscreenOpacity = () => {
    const {panning, target} = this.state;

    return {
      opacity: panning
        ? this.pan.interpolate({
            inputRange: [-screenHeight, 0, screenHeight],
            outputRange: [0, 1, 0],
          })
        : this.openAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, target.opacity],
          }),
    };
  };

  renderFullscreen = () => {
    const {renderHeader, renderFooter} = this.props;
    const {fullscreen, selectedIdx} = this.state;

    const opacity = this.getFullscreenOpacity();

    const header = renderHeader && renderHeader();
    const footer = renderFooter && renderFooter();

    return (
      <Modal
        transparent
        visible={fullscreen}
        onShow={this.handleModalShow}
        onRequestClose={this.close}
      >
        <Animated.View style={[styles.modalBackground, opacity]} />
        <SwipeableViews
          index={selectedIdx}
          onChangeIndex={this.handleChangeIdx}
        >
          {this.getChildren().map(this.renderFullscreenContent)}
        </SwipeableViews>
        <Animated.View style={[opacity, styles.headerContainer]}>
          {header
            ? React.cloneElement(header, {
                ...header.props,
                style: [header.props.style],
              })
            : this.renderDefaultHeader()}
        </Animated.View>
        {footer && (
          <Animated.View style={[opacity, styles.footerContainer]}>
            {footer}
          </Animated.View>
        )}
      </Modal>
    );
  };

  render() {
    const {style, horizontal = true, contentContainerStyle} = this.props;
    const {
      fullscreen,
      animating,
      selectedImageHidden,
      selectedIdx,
    } = this.state;

    const getOpacity = (idx: number) => ({
      opacity: selectedImageHidden && selectedIdx === idx ? 0 : 1,
    });

    return (
      <View style={style}>
        <ScrollView
          horizontal={horizontal}
          contentContainerStyle={contentContainerStyle}
          scrollEnabled={!animating}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.getChildren().map((child, idx) => (
            <TouchableWithoutFeedback
              key={`slider-image-${idx}`} // eslint-disable-line react/no-array-index-key
              onPress={() => this.open(idx)}
            >
              <View
                ref={ref => {
                  this.captureCarouselItem(ref, idx);
                }}
                style={getOpacity(idx)}
              >
                {child}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        {fullscreen && this.renderFullscreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 10,
  },
});

export default ImageCarousel;
