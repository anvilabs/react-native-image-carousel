/* @flow */

/* eslint-disable flowtype/no-weak-types */

type ClassComponentType<D, P, S> = Class<React$Component<D, P, S>>;
type ComponentStubType = ClassComponentType<void, {}, void>;
type ImageType = ComponentStubType & {
  getSize: any,
};
type ListViewType = ComponentStubType & {
  DataSource: any,
};
type TouchableNativeFeedbackType = ClassComponentType<void, {}, void> & {
  Ripple: any,
};

type AnimatedType = {
  Value: any,
  View: ClassComponentType<void, {}, void>,
  add: any,
  delay: any,
  diffClamp: any,
  parallel: any,
  sequence: any,
  spring: any,
  timing: any,
  event: any,
};
type StylesObjType = {[key: string]: {[key: string]: any}};
type StyleSheetType = {
  hairlineWidth: number,
  absoluteFill: number,
  absoluteFillObject: Object,
  flatten: (styles: ReactNative$StyleType) => {[key: string]: any},
  create<S: StylesObjType>(obj: S): $ObjMap<S, (obj) => number>,
};
type PlatformType =
  | {
      select<T>(mappings: {[platform: string]: T}): T,
      OS: 'ios',
      Version: string,
    }
  | {
      select<T>(mappings: {[platform: string]: T}): T,
      OS: 'android',
      Version: number,
    };

declare module 'react-native' {
  /* Components */
  declare var Image: ImageType;
  declare var KeyboardAvoidingView: ComponentStubType;
  declare var ListView: ListViewType;
  declare var Modal: ComponentStubType;
  declare var RefreshControl: ComponentStubType;
  declare var ScrollView: ComponentStubType;
  declare var Text: ComponentStubType;
  declare var TextInput: ComponentStubType;
  declare var TouchableHighlight: ComponentStubType;
  declare var TouchableNativeFeedback: TouchableNativeFeedbackType;
  declare var TouchableOpacity: ComponentStubType;
  declare var TouchableWithoutFeedback: ComponentStubType;
  declare var View: ComponentStubType;
  declare var ViewPagerAndroid: ComponentStubType;

  /* APIs */
  declare var ActivityIndicator: any;
  declare var Alert: any;
  declare var Animated: AnimatedType;
  declare var AppRegistry: any;
  declare var AppState: any;
  declare var AsyncStorage: any;
  declare var BackAndroid: any;
  declare var BackHandler: void;
  declare var Dimensions: any;
  declare var Easing: any;
  declare var I18nManager: any;
  declare var InteractionManager: any;
  declare var Keyboard: any;
  declare var LayoutAnimation: any;
  declare var Linking: any;
  declare var NativeModules: any;
  declare var NetInfo: any;
  declare var PanResponder: any;
  declare var PixelRatio: any;
  declare var Platform: PlatformType;
  declare var PointPropType: any;
  declare var processColor: any;
  declare var requireNativeComponent: any;
  declare var StatusBar: any;
  declare var StyleSheet: StyleSheetType;
  declare var UIManager: any;
}

/* Global variables */
declare var __DEV__: boolean;
declare var fetch: any;
declare var Headers: any;
declare var Request: any;
declare var Response: any;
declare module requestAnimationFrame {
  declare var exports: (callback: any) => any;
}

/* Global helper types */
declare type ReactNative$StyleType =
  | {[key: string]: any}
  | number
  | false
  | Array<?ReactNative$StyleType>;
declare type ReactNative$ImageSourceType =
  | {
      uri: ?string,
      bundle?: string,
      body?: string,
      headers?: string,
      method?: string,
      width?: number,
      height?: number,
      scale?: number,
      cache?: 'default' | 'force-cache' | 'only-if-cached',
    }
  | number;

/* eslint-enable flowtype/no-weak-types */
