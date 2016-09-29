/**
 * @flow
 */

import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import _ from 'lodash/fp';
import React, { Component, PropTypes } from 'react';

import type { Slide } from './CarouselView';

type Props = {
  slide: Slide,
  captionStyle: ?number | ?Object,
  onPress: () => void,
} & View.props;
type State = {
  imageWidth: number,
};

export default class CarouselItem extends Component<any, Props, State> {
  props: Props;
  image: Image;

  static propTypes = {
    ...View.propTypes,
    slide: PropTypes.object.isRequired,
    captionStyle: Text.propTypes.style,
    onPress: PropTypes.func,
  };

  constructor(props: Props) {
    super(props);

    this.state = { imageWidth: 0 };
  }

  componentWillMount() {
    const { slide } = this.props;

    Image.getSize(
      this.props.slide.imageUrl,
      (width: number, height: number): void => (
        this.setState({ imageWidth: (slide.imageHeight / height) * width })
      ),
    );
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.imageWidth !== this.state.imageWidth
      || nextProps.style !== this.props.style;
  }

  measure(
    result: (
      rx: number,
      ry: number,
      width: number,
      height: number,
      x: number,
      y: number,
    ) => void,
  ) {
    return this.image.measure(result);
  }

  render(): ReactElement<any> {
    const { captionStyle, slide } = this.props;

    return (
      <View
        {..._.reject(['slide', 'captionStyle', 'onPress'])(this.props)}
        style={[styles.container, this.props.style]}
      >
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <Image
            ref={(image: Image) => {
              this.image = image;
            }}
            style={{ height: slide.imageHeight, width: this.state.imageWidth }}
            source={{ uri: slide.imageUrl, height: slide.imageHeight }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
        {slide.caption &&
          <Text
            numberOfLines={0}
            style={[styles.captionText, captionStyle]}
          >
            {slide.caption}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 2,
  },
  captionText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
