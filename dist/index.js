'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactNative = require('react-native');
var React = require('react');
var SwipeableViews = _interopDefault(require('react-swipeable-views-native'));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*       */

var ANIM_CONFIG = { duration: 300 };
var screenSize = reactNative.Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height - reactNative.Platform.select({ ios: 0, android: reactNative.StatusBar.currentHeight });

var ImageCarousel = function (_React$Component) {
  _inherits(ImageCarousel, _React$Component);

  function ImageCarousel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageCarousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageCarousel.__proto__ || Object.getPrototypeOf(ImageCarousel)).call.apply(_ref, [this].concat(args))), _this), _this.openAnim = new reactNative.Animated.Value(0), _this.pan = new reactNative.Animated.Value(0), _this.carouselItems = Array.isArray(_this.props.children) ? _this.props.children.map(function () {
      return null;
    }) : [null], _this.state = {
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      target: {
        x: 0,
        y: 0,
        opacity: 1
      },
      fullscreen: false,
      selectedIdx: 0,
      animating: false,
      panning: false,
      selectedImageHidden: false,
      slidesDown: false
    }, _this.open = function (startIdx) {
      var activeComponent = _this.getComponentAtIdx(startIdx);

      if (!activeComponent) return;

      var _this$props = _this.props,
          hideStatusBarOnOpen = _this$props.hideStatusBarOnOpen,
          onIdxChange = _this$props.onIdxChange,
          onOpen = _this$props.onOpen;


      if (hideStatusBarOnOpen && reactNative.Platform.OS === 'ios') {
        reactNative.StatusBar.setHidden(true, 'fade');
      }

      activeComponent.measure(
      // eslint-disable-next-line max-params
      function (rx, ry, width, height, x, y) {
        _this.setState({
          fullscreen: true,
          selectedIdx: startIdx,
          animating: true,
          origin: { x: x, y: y, width: width, height: height },
          target: { x: 0, y: 0, opacity: 1 }
        }, function () {
          if (onIdxChange) {
            onIdxChange(startIdx);
          }

          _this.animateOpenAnimToValue(1, onOpen);
        });
      });
    }, _this.close = function () {
      var activeComponent = _this.getComponentAtIdx(_this.state.selectedIdx);

      if (!activeComponent) return;

      var _this$props2 = _this.props,
          hideStatusBarOnOpen = _this$props2.hideStatusBarOnOpen,
          onClose = _this$props2.onClose;


      if (hideStatusBarOnOpen && reactNative.Platform.OS === 'ios') {
        reactNative.StatusBar.setHidden(false, 'fade');
      }

      _this.setState({ animating: true });

      activeComponent.measure(
      // eslint-disable-next-line max-params
      function (rx, ry, width, height, x, y) {
        _this.setState({
          origin: { x: x, y: y, width: width, height: height },
          slidesDown: x + width < 0 || x > screenWidth
        });

        _this.animateOpenAnimToValue(0, function () {
          _this.setState({
            fullscreen: false,
            selectedImageHidden: false,
            slidesDown: false
          });

          if (onClose) {
            onClose();
          }
        });
      });
    }, _this.captureCarouselItem = function (ref, idx) {
      // $FlowFixMe
      _this.carouselItems[idx] = ref;
    }, _this.getChildren = function () {
      var children = _this.props.children;


      if (Array.isArray(children)) {
        return children;
      } else if (children) {
        return [children];
      }

      return [];
    }, _this.getComponentAtIdx = function (idx) {
      var activeComponents = _this.props.activeComponents;


      return activeComponents ? activeComponents[idx] : _this.carouselItems[idx];
    }, _this.animateOpenAnimToValue = function (toValue, onComplete) {
      return reactNative.Animated.timing(_this.openAnim, Object.assign({}, ANIM_CONFIG, {
        toValue: toValue
      })).start(function () {
        _this.setState({ animating: false });
        if (onComplete) {
          onComplete();
        }
      });
    }, _this.handlePanEnd = function (evt, gestureState) {
      // eslint-disable-next-line no-magic-numbers
      if (Math.abs(gestureState.dy) > 150) {
        _this.setState({
          panning: false,
          target: {
            x: gestureState.dx,
            y: gestureState.dy,
            opacity: 1 - Math.abs(gestureState.dy / screenHeight)
          }
        });

        _this.close();
      } else {
        reactNative.Animated.timing(_this.pan, Object.assign({
          toValue: 0
        }, ANIM_CONFIG)).start(function () {
          return _this.setState({ panning: false });
        });
      }
    }, _this.getSwipeableStyle = function (idx) {
      var _this$state = _this.state,
          fullscreen = _this$state.fullscreen,
          origin = _this$state.origin,
          selectedIdx = _this$state.selectedIdx,
          slidesDown = _this$state.slidesDown,
          target = _this$state.target;


      if (!fullscreen || idx !== selectedIdx) {
        return { flex: 1 };
      }

      var inputRange = [0, 1];

      return !slidesDown ? {
        left: _this.openAnim.interpolate({
          inputRange: inputRange,
          outputRange: [origin.x, target.x]
        }),
        top: _this.openAnim.interpolate({
          inputRange: inputRange,
          outputRange: [origin.y, target.y]
        }),
        width: _this.openAnim.interpolate({
          inputRange: inputRange,
          outputRange: [origin.width, screenWidth]
        }),
        height: _this.openAnim.interpolate({
          inputRange: inputRange,
          outputRange: [origin.height, screenHeight]
        })
      } : {
        left: 0,
        right: 0,
        height: screenHeight,
        top: _this.openAnim.interpolate({
          inputRange: inputRange,
          outputRange: [screenHeight, target.y]
        })
      };
    }, _this.handleModalShow = function () {
      var _this$state2 = _this.state,
          animating = _this$state2.animating,
          selectedImageHidden = _this$state2.selectedImageHidden;


      if (!selectedImageHidden && animating) {
        _this.setState({ selectedImageHidden: true });
      }
    }, _this.handleChangeIdx = function (idx) {
      _this.setState({ selectedIdx: idx });
      if (_this.props.onIdxChange) {
        _this.props.onIdxChange(idx);
      }
    }, _this.renderFullscreenContent = function (child, idx) {
      var _this$props3 = _this.props,
          renderContent = _this$props3.renderContent,
          zoomEnabled = _this$props3.zoomEnabled;
      var _this$state3 = _this.state,
          selectedIdx = _this$state3.selectedIdx,
          panning = _this$state3.panning;


      var content = renderContent && renderContent(idx);
      var containerStyle = [_this.getSwipeableStyle(idx), selectedIdx === idx && panning && { top: _this.pan }];

      return React.createElement(
        reactNative.Animated.View,
        { key: idx, style: containerStyle },
        React.createElement(
          reactNative.ScrollView,
          {
            style: styles.fill,
            contentContainerStyle: styles.fill,
            maximumZoomScale: zoomEnabled ? 2 : 1 // eslint-disable-line no-magic-numbers
            , alwaysBounceVertical: false
          },
          content ? React.cloneElement(content, Object.assign({}, content.props, _this.panResponder.panHandlers)) : React.cloneElement(child, Object.assign({}, child.props, _this.props.activeProps, _this.panResponder.panHandlers))
        )
      );
    }, _this.renderDefaultHeader = function () {
      return React.createElement(
        reactNative.TouchableWithoutFeedback,
        { onPress: _this.close },
        React.createElement(
          reactNative.View,
          null,
          React.createElement(
            reactNative.Text,
            { style: styles.closeText },
            'Close'
          )
        )
      );
    }, _this.getFullscreenOpacity = function () {
      var _this$state4 = _this.state,
          panning = _this$state4.panning,
          target = _this$state4.target;


      return {
        opacity: panning ? _this.pan.interpolate({
          inputRange: [-screenHeight, 0, screenHeight],
          outputRange: [0, 1, 0]
        }) : _this.openAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, target.opacity]
        })
      };
    }, _this.renderFullscreen = function () {
      var _this$props4 = _this.props,
          renderHeader = _this$props4.renderHeader,
          renderFooter = _this$props4.renderFooter;
      var _this$state5 = _this.state,
          animating = _this$state5.animating,
          fullscreen = _this$state5.fullscreen,
          panning = _this$state5.panning,
          selectedIdx = _this$state5.selectedIdx;


      var opacity = _this.getFullscreenOpacity();

      var header = renderHeader && renderHeader();
      var footer = renderFooter && renderFooter();

      return React.createElement(
        reactNative.Modal,
        {
          transparent: true,
          visible: fullscreen,
          onShow: _this.handleModalShow,
          onRequestClose: _this.close
        },
        React.createElement(reactNative.Animated.View, { style: [styles.modalBackground, opacity] }),
        React.createElement(
          SwipeableViews,
          {
            style: reactNative.StyleSheet.absoluteFill,
            index: selectedIdx,
            onChangeIndex: _this.handleChangeIdx,
            scrollEnabled: !animating && !panning
          },
          _this.getChildren().map(_this.renderFullscreenContent)
        ),
        React.createElement(
          reactNative.Animated.View,
          { style: [opacity, styles.headerContainer] },
          header ? React.cloneElement(header, Object.assign({}, header.props, {
            style: [header.props.style]
          })) : _this.renderDefaultHeader()
        ),
        footer && React.createElement(
          reactNative.Animated.View,
          { style: [opacity, styles.footerContainer] },
          footer
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-line flowtype/no-weak-types


  _createClass(ImageCarousel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.panResponder = reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return !_this2.state.animating;
        },
        onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
          return !_this2.state.animating;
        },
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
          return !_this2.state.animating;
        },
        onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture() {
          return !_this2.state.animating;
        },
        onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
          return true;
        },
        // eslint-disable-next-line flowtype/no-weak-types
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
          _this2.pan.setValue(gestureState.dy);

          // eslint-disable-next-line no-magic-numbers
          if (Math.abs(gestureState.dy) > 15 && !_this2.state.panning) {
            _this2.pan.setValue(0);
            _this2.setState({ panning: true });
          }
        },
        onPanResponderRelease: this.handlePanEnd,
        onPanResponderTerminate: this.handlePanEnd
      });
    }

    // eslint-disable-next-line flowtype/no-weak-types

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          style = _props.style,
          _props$horizontal = _props.horizontal,
          horizontal = _props$horizontal === undefined ? true : _props$horizontal,
          contentContainerStyle = _props.contentContainerStyle;
      var _state = this.state,
          fullscreen = _state.fullscreen,
          animating = _state.animating,
          selectedImageHidden = _state.selectedImageHidden,
          selectedIdx = _state.selectedIdx;


      var getOpacity = function getOpacity(idx) {
        return {
          opacity: selectedImageHidden && selectedIdx === idx ? 0 : 1
        };
      };

      return React.createElement(
        reactNative.View,
        { style: style },
        React.createElement(
          reactNative.ScrollView,
          {
            horizontal: horizontal,
            contentContainerStyle: contentContainerStyle,
            scrollEnabled: !animating,
            alwaysBounceHorizontal: false,
            showsHorizontalScrollIndicator: false
          },
          this.getChildren().map(function (child, idx) {
            return React.createElement(
              reactNative.TouchableWithoutFeedback,
              {
                key: 'slider-image-' + idx // eslint-disable-line react/no-array-index-key
                , onPress: function onPress() {
                  return _this3.open(idx);
                }
              },
              React.createElement(
                reactNative.View,
                {
                  ref: function ref(_ref2) {
                    _this3.captureCarouselItem(_ref2, idx);
                  },
                  style: getOpacity(idx)
                },
                child
              )
            );
          })
        ),
        fullscreen && this.renderFullscreen()
      );
    }
  }]);

  return ImageCarousel;
}(React.Component);

ImageCarousel.defaultProps = {
  zoomEnabled: true,
  hideStatusBarOnOpen: true
};


var styles = reactNative.StyleSheet.create({
  fill: {
    flex: 1
  },
  modalBackground: Object.assign({}, reactNative.StyleSheet.absoluteFillObject, {
    backgroundColor: 'black'
  }),
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 10
  }
});

module.exports = ImageCarousel;
