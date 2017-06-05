/* @flow */

import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import React, { Component } from 'react';

/* eslint-disable max-len */
const urls = [
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/67003.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/51681.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66812.max-620x600.jpg',
  'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1438960604-925d1997518b66f8508c749f36810793.jpeg',
];
/* eslint-enable max-len */

class App extends Component {
  _imageCarousel: ImageCarousel;

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  _setImageCarousel = (imageCarousel: ImageCarousel) => {
    this._imageCarousel = imageCarousel;
  };

  _handleHeaderPress = () => this._imageCarousel.close();

  _renderHeader = () => (
    <TouchableWithoutFeedback onPress={this._handleHeaderPress}>
      <View>
        <Text style={styles.closeText}>Exit</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  _renderFooter(): React$Element<any> {
    return (
      <Text style={styles.footerText}>Footer!</Text>
    );
  }

  renderImage = (i: number) => (
    <Image
      style={StyleSheet.absoluteFill}
      resizeMode="contain"
      source={{ uri: urls[i] }}
    />
  );

  render(): React$Element<any> {
    return (
      <View style={styles.container}>
        <Text>IMAGES</Text>
        <View>
          <ImageCarousel
            ref={this._setImageCarousel}
            renderContent={this.renderImage}
          >
            {urls.map((url: string) => (
              <Image
                style={styles.image}
                key={url}
                source={{ uri: url, width: 200 }}
                resizeMode="contain"
              />
            ))}
          </ImageCarousel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    height: 100,
  },
});

export default App;
