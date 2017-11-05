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
import React, {Component} from 'react';

const urls = [
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/67003.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/51681.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66812.max-620x600.jpg',
  'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1438960604-925d1997518b66f8508c749f36810793.jpeg',
];

class App extends Component {
  imageCarousel: React$Element<*>;

  componentWillMount() {
    StatusBar.setBarStyle('dark-content');
  }

  captureImageCarousel = (imageCarousel: React$Element<*>) => {
    this.imageCarousel = imageCarousel;
  };

  handleHeaderPress = () => (this.imageCarousel: $FlowFixMe).close();

  renderHeader = (): React$Element<*> => (
    <TouchableWithoutFeedback onPress={this.handleHeaderPress}>
      <View>
        <Text style={styles.closeText}>Exit</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderFooter = (): React$Element<*> => (
    <Text style={styles.footerText}>Footer!</Text>
  );

  renderImage = (idx: number) => (
    <Image
      style={StyleSheet.absoluteFill}
      resizeMode="contain"
      source={{uri: urls[idx]}}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text>IMAGES</Text>
        <View>
          <ImageCarousel
            ref={this.captureImageCarousel}
            renderContent={this.renderImage}
          >
            {urls.map(url => (
              <Image
                style={styles.image}
                key={url}
                source={{uri: url, width: 200}}
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
