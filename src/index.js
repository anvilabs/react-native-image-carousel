/* @flow */

import {
  Animated,
  Dimensions,
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
import SwipeableViews from 'react-swipeable-views-native';

const ANIM_CONFIG = { duration: 300 };
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type MeasureAbleReactElement = React$Element<any> & {
  measure: (
    rx: number, ry: number,
    width: number, height: number,
    x: number, y: number,
  ) => void,
};

type Props = {
  style?: Object,
  contentContainerStyle?: Object,
  activeProps?: Object,
  activeComponents?: Array<React$Element<any>>,
  children?: Array<React$Element<any>>,
  zoomEnabled?: boolean,
  hideStatusBarOnOpen?: boolean,
  renderHeader?: () => React$Element<any>,
  renderFooter?: () => React$Element<any>,
  renderContent?: (idx: number) => React$Element<any>,
  onIdxChange?: (idx: number) => void,
  onOpen?: () => void,
  onClose?: () => void,
  horizontal?: boolean,
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

export default class ImageCarousel extends Component {
  props: Props;
  state: State;
  _panResponder: PanResponder;
  _carouselItems: Array<?View> = _.isArray(this.props.children) ?
    _.map(null)(this.props.children) : [null];

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
    openAnim: new Animated.Value(0),
    pan: new Animated.Value(0),
    fullscreen: false,
    selectedIdx: 0,
    animating: false,
    panning: false,
    selectedImageHidden: false,
    slidesDown: false,
  };

  static propTypes = {
    activeProps: PropTypes.object,
    zoomEnabled: PropTypes.bool,
    hideStatusBarOnOpen: PropTypes.bool,
    renderContent: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    ...View.propTypes,
  };
  static defaultProps = {
    zoomEnabled: true,
    hideStatusBarOnOpen: true,
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
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

  shouldComponentUpdate(nextProps: View.props, nextState: State): boolean {
    return (nextState.fullscreen || this.state.fullscreen) &&
      (!_.eq(nextState.origin, this.state.origin)
      || !_.eq(nextState.target, this.state.target)
      || nextState.panning !== this.state.panning
      || nextState.animating !== this.state.animating
      || nextState.selectedImageHidden !== this.state.selectedImageHidden
      || nextState.selectedIdx !== this.state.selectedIdx);
  }

  open = (startIdx: number) => {
    const { hideStatusBarOnOpen, onIdxChange, onOpen } = this.props;
    const activeComponent = this._getComponentAtIdx(startIdx);

    if (!activeComponent) return;

    hideStatusBarOnOpen && StatusBar.setHidden(true, 'fade');
    this.setState({ fullscreen: true });

    (activeComponent: any).measure((
      rx: number, ry: number,
      width: number, height: number,
      x: number, y: number,
    ) => {
      this.setState({
        selectedIdx: startIdx,
        animating: true,
        origin: { x, y, width, height },
        target: { x: 0, y: 0, opacity: 1 },
      });

      onIdxChange && onIdxChange(startIdx);

      this._animateOpenAnimToValue(1, onOpen);
    });
  };

  close = () => {
    const { hideStatusBarOnOpen, onClose } = this.props;

    const activeComponent = this._getComponentAtIdx(this.state.selectedIdx);

    if (!activeComponent) return;

    hideStatusBarOnOpen && StatusBar.setHidden(false, 'fade');
    this.setState({ animating: true });

    (activeComponent: any).measure((
      rx: number, ry: number,
      width: number, height: number,
      x: number, y: number,
    ) => {
      this.setState({
        origin: { x, y, width, height },
        slidesDown: x + width < 0 || x > screenWidth,
      });

      this._animateOpenAnimToValue(0, () => {
        this.setState({
          fullscreen: false,
          selectedImageHidden: false,
          slidesDown: false,
        });

        onClose && onClose();
      });
    });
  };

  _setCarouselItem = (carouselItem: View, idx: number) => {
    this._carouselItems[idx] = carouselItem;
  }

  _getChildren = () => {
    const { children } = this.props;
    return _.isArray(children) ? children : [children];
  }

  _getComponentAtIdx = (idx: number) => {
    const { activeComponents } = this.props;
    return activeComponents ? activeComponents[idx] : this._carouselItems[idx];
  };

  _animateOpenAnimToValue = (toValue: number, onComplete?: () => void) => (
    Animated.timing(this.state.openAnim, {
      ...ANIM_CONFIG,
      toValue,
    }).start(() => {
      this.setState({ animating: false });
      onComplete && onComplete();
    })
  );

  _handlePanEnd = (evt: any, gestureState: { dx: number, dy: number }) => {
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
      Animated.timing(this.state.pan, {
        toValue: 0,
        ...ANIM_CONFIG,
      }).start(() => this.setState({ panning: false }));
    }
  };

  _getSwipeableStyle = (idx: number): Object => {
    const {
      fullscreen, openAnim, origin, selectedIdx, slidesDown, target,
    } = this.state;

    const inputRange = [0, 1];

    if (!fullscreen || idx !== selectedIdx) return { flex: 1 };

    return !slidesDown ? {
      left: openAnim.interpolate({
        inputRange, outputRange: [origin.x, target.x],
      }),
      top: openAnim.interpolate({
        inputRange, outputRange: [origin.y, target.y],
      }),
      width: openAnim.interpolate({
        inputRange, outputRange: [origin.width, screenWidth],
      }),
      height: openAnim.interpolate({
        inputRange, outputRange: [origin.height, screenHeight],
      }),
    } : {
      left: 0,
      right: 0,
      height: screenHeight,
      top: openAnim.interpolate({
        inputRange, outputRange: [screenHeight, target.y],
      }),
    };
  };

  _handleModalShow = () => {
    const { animating, selectedImageHidden } = this.state;

    if (!selectedImageHidden && animating) {
      this.setState({ selectedImageHidden: true });
    }
  };

  _handleChangeIdx = (idx: number) => {
    const { onIdxChange } = this.props;

    this.setState({ selectedIdx: idx });
    onIdxChange && onIdxChange(idx);
  };

  _renderFullscreenContent = (child: React$Element<any>, idx: number) => {
    const { renderContent, zoomEnabled } = this.props;
    const { selectedIdx, panning } = this.state;

    const content = renderContent && renderContent(idx);
    const containerStyle = [
      this._getSwipeableStyle(idx),
      (selectedIdx === idx && panning) && {
        top: this.state.pan,
      },
    ];

    return (
      <Animated.View key={idx} style={containerStyle}>
        <ScrollView
          style={styles.fill}
          contentContainerStyle={styles.fill}
          maximumZoomScale={zoomEnabled ? 2 : 1}
          alwaysBounceVertical={false}
        >
          {content
            ? React.cloneElement(content, {
              ...content.props,
              ...this._panResponder.panHandlers,
            })
            : React.cloneElement(child, {
              ...child.props,
              ...this.props.activeProps,
              ...this._panResponder.panHandlers,
            })
          }
        </ScrollView>
      </Animated.View>
    );
  };

  _renderDefaultHeader = () => (
    <TouchableWithoutFeedback onPress={this.close}>
      <View>
        <Text style={styles.closeText}>Close</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  _getFullscreenOpacity = () => {
    const { openAnim, pan, panning, target } = this.state;

    return {
      opacity: panning
        ? pan.interpolate({
          inputRange: [-screenHeight, 0, screenHeight],
          outputRange: [0, 1, 0],
        })
        : openAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, target.opacity],
        }),
    };
  };

  _renderFullscreen = () => {
    const { children, renderHeader, renderFooter } = this.props;
    const {
      animating, fullscreen, openAnim, panning, selectedIdx,
    } = this.state;

    const opacity = this._getFullscreenOpacity();

    const header = renderHeader && renderHeader();
    const footer = renderFooter && renderFooter();

    return (
      <Modal
        transparent
        visible={fullscreen}
        onShow={this._handleModalShow}
        onRequestClose={this.close}
      >
        <Animated.View style={[styles.modalBackground, opacity]} />
        <SwipeableViews
          style={StyleSheet.absoluteFill}
          index={selectedIdx}
          onChangeIndex={this._handleChangeIdx}
          scrollEnabled={!animating && !panning}
        >
          {_.map.convert({ cap: false })(
            this._renderFullscreenContent,
          )(this._getChildren())}
        </SwipeableViews>
        <Animated.View style={[opacity, styles.headerContainer]}>
          {header ? React.cloneElement(header, {
            ...header.props,
            style: [header.props.style],
          }) : this._renderDefaultHeader()}
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
    const {
      children, style, horizontal = true, contentContainerStyle,
    } = this.props;
    const {
      fullscreen, animating, selectedImageHidden, selectedIdx,
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
          {_.map.convert({ cap: false })(
            (child: React$Element<any>, idx: number) => (
              <TouchableWithoutFeedback
                key={idx}
                onPress={() => this.open(idx)}
              >
                <View
                  ref={(view: View) => this._setCarouselItem(view, idx)}
                  style={getOpacity(idx)}
                >
                  {child}
                </View>
              </TouchableWithoutFeedback>
          ))(this._getChildren())}
        </ScrollView>
        {fullscreen && this._renderFullscreen()}
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
