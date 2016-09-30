# react-native-image-carousel
Image carousel with support for heading, captions, fullscreen mode, image swiping and pinch-to-zoom in fullscreen mode.

Currently iOS only.

## Demo

[demonstration](.github/demo.gif)

## Installation

`npm install --save react-native-image-carousel`

## Usage

```javascript
import ImageCarousel from 'react-native-image-carousel';

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
```

Check full example in _Example_ folder.

### Props

| Name | Type | Description |
|---|---|---|
| `slides` | `[{ imageUrl: string, imageHeight: number, caption: ?string }]` | Array of slides to show in carousel. `imageHeight` is individual slide component's height, `caption` is optional text under the image. |   
| `heading` | `?string` | Optional non-scrollable heading text to show above the carousel. |
| `headingStyle` | `Text.style` | Style to apply to the carousel heading text. |
| `captionStyle` | `Text.style` | Style to apply to every caption text. |

## TODO

- [ ] Add prop to render custom component header.
- [ ] Add prop to render custom component footer.
- [ ] Make Slide's `imageHeight` optional.
- [ ] Caption should be of image's width.

## License

[MIT License](./LICENSE) © Anvilabs LLC 
