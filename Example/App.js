/* @flow */

import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { Component } from 'react';
import ImageCarousel from 'react-native-image-carousel';

const urls = [
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66807.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/67003.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/51681.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66812.max-620x600.jpg',
  'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1438960604-925d1997518b66f8508c749f36810793.jpeg',
];

export default class App extends Component<any, any, any> {
  _imageCarousel: ImageCarousel;

  componentWillMount() {
    (this: any)._renderHeader = this._renderHeader.bind(this);
  }

  _renderHeader(): ReactElement<any> {
    return (
      <TouchableWithoutFeedback onPress={this._imageCarousel.close}>
        <View>
          <Text style={styles.closeText}>Exit</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderFooter(): ReactElement<any> {
    return (
      <Text style={styles.footerText}>Footer!</Text>
    );
  }

  render(): ReactElement<any> {
    return (
      <View style={styles.container}>
        <ImageCarousel
          ref={(imageCarousel: ImageCarousel) => {
            this._imageCarousel = imageCarousel;
          }}
          activeProps={{ style: { flex: 1 } }}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
        >
          {urls.map((url: string): ReactElement<any> => (
            <Image
              key={url}
              style={[styles.image, { opacity: 0.2 }]}
              source={{ uri: url, height: 100 }}
              resizeMode={'contain'}
            />
          ))}
        </ImageCarousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 10,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    marginRight: 2,
    width: 100,
    height: 100,
  },
});
