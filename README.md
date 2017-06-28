# react-native-image-carousel
> Image carousel with support for heading, captions, fullscreen mode, image swiping and pinch-to-zoom in fullscreen mode.

Supports both Android and iOS. Zoom feature works on iOS only.

## Demo

<img alt="Demo" src=".github/demo.gif" width="375">

## Installation

`npm install --save react-native-image-carousel`

## Usage

```javascript
import ImageCarousel from 'react-native-image-carousel';

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

  _renderContent(idx: number): ReactElement<any> {
    return (
      <Image
        style={styles.container}
        source={{ uri: urls[idx] }}
        resizeMode={'contain'}
      />
    );
  }

  render(): ReactElement<any> {
    return (
      <View style={styles.container}>
        <ImageCarousel
          ref={(imageCarousel: ImageCarousel) => {
            this._imageCarousel = imageCarousel;
          }}
          renderContent={this._renderContent}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
        >
          {urls.map((url: string): ReactElement<any> => (
            <Image
              key={url}
              style={styles.image}
              source={{ uri: url, height: 100 }}
              resizeMode={'contain'}
            />
          ))}
        </ImageCarousel>
      </View>
    );
  }
}
```

Check full example in _Example_ folder.

### Props and methods

_Every prop is optional._

| Name | Type | Description |
|---|---|---|
| `activeProps?` | `Object` | Props of each child when in fullscreen mode. (For a component to fill the screen activeProp's style must be `flex: 1`). This prop is ignored in case `renderContent` prop is provided. |   
| `activeComponents?` | `[ReactElement<any>]` | Active components' bounds will be used for opening/closing fullscreen mode animations. If not provided, the  immediate children are used. |
| `zoomEnabled?` | `boolean` | `true` by default, if `false`, children are not zoomable. |
| `hideStatusBarOnOpen?` | `boolean` | `true` by default, if `false`, status bar does not fade out on open. |
| `renderContent?` | `(idx: number) => ReactElement<any>` | Component to render in fullscreen mode for the given index. |
| `renderHeader?` | `() => ReactElement<any>` | Component to render at the top when in fullscreen mode. |
| `renderFooter?` | `() => ReactElement<any>` | Component to render at the bottom when in fullscreen mode. |
| `onIdxChange?` | `(idx: number)` | Fired on index change in fullscreen mode. |
| `onOpen?` | `() => void` | Fired on fullscreen mode open. |
| `onClose?` | `() => void` | Fired on fullscreen mode close. |

react-native-image-carousel also provides two methods for opening and closing the fullscreen mode respectively:

`open(startIdx: number)`, `close`.

## License

[MIT License](./LICENSE) © Anvilabs LLC 
