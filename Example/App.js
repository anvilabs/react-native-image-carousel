/**
 * @flow
 */

import { View, StyleSheet } from 'react-native';
import React from 'react';
import ImageCarousel from 'react-native-image-carousel';

// export type Slide = {
//   imageUrl: string,
//   imageHeight: number,
//   caption: ?string,
// };
//   style: ?number | ?Object,
//   headingStyle: ?number | ?Object,
//   captionStyle: ?number | ?Object,
//   slides: Array<Slide>,
//   heading: ?string,

const slides = [
  {
    imageUrl: 'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66807.max-620x600.jpg',
    imageHeight: 150,
    caption: 'Clown',
  },
  {
    imageUrl: 'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/67003.max-620x600.jpg',
    imageHeight: 200,
    caption: 'I need a new costume',
  },
  {
    imageUrl: 'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/51681.max-620x600.jpg',
    imageHeight: 150,
    caption: 'Joker',
  },
  {
    imageUrl: 'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66812.max-620x600.jpg',
    imageHeight: 150,
    caption: 'I\'m Batman',
  },
  {
    imageUrl: 'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1438960604-925d1997518b66f8508c749f36810793.jpeg',
    imageHeight: 150,
    caption: 'I\'m Saitama!',
  },
];

const App = () => (
  <View style={styles.container}>
    <ImageCarousel
      heading={'Stills'}
      headingStyle={styles.heading}
      captionStyle={styles.caption}
      slides={slides}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    padding: 15,
    fontSize: 28,
  },
  caption: {
    fontSize: 20,
  },
});

export default App;
