import reactNative, { Animated, Dimensions, Modal, PanResponder, ScrollView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';
import propTypes from 'prop-types';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var objectWithoutProperties = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};
});

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function(fn, that, length){
  _aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function(it){
  if(!_isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!_isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if(_ie8DomDefine)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var _hide = _descriptors ? function(object, key, value){
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])_hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
var _export = $export;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it){
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = _toIobject($this)
      , length = _toLength(O.length)
      , index  = _toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store  = _global[SHARED] || (_global[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var _sharedKey = function(key){
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = _toIobject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)_has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(_has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O){
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function(it){
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = _toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = _objectGops.f
    , isEnum     = _objectPie.f;
  while(aLen > index){
    var S      = _iobject(arguments[index++])
      , keys   = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

var assign$2 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$2, __esModule: true };
});

var _extends = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var IE_PROTO$1    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = _toObject(O);
  if(_has(O, IE_PROTO$1))return O[IE_PROTO$1];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

// most Object methods by ES6 should accept primitives

var _objectSap = function(KEY, exec){
  var fn  = (_core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function(){ fn(1); }), 'Object', exp);
};

// 19.1.2.9 Object.getPrototypeOf(O)


_objectSap('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$2 = _core.Object.getPrototypeOf;

var getPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$2, __esModule: true };
});

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(_defined(that))
      , i = _toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  _anObject(O);
  var keys   = _objectKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)_objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = _enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$2] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !_has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  _iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = _objectGpo($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!_library && !_has(IteratorPrototype, ITERATOR))_hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))_redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var _addToUnscopables = function(){ /* empty */ };

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return _iterStep(1);
  }
  if(kind == 'keys'  )return _iterStep(0, index);
  if(kind == 'values')return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var TO_STRING_TAG = _wks('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = _global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])_hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!_isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !_has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var defineProperty$4 = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$4($Symbol, name, {value: _wksExt.f(name)});
};

var _keyof = function(object, el){
  var O      = _toIobject(object)
    , keys   = _objectKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

// all enumerable object keys, includes symbols

var _enumKeys = function(it){
  var result     = _objectKeys(it)
    , getSymbols = _objectGops.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = _objectPie.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg){
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var gOPN$1      = _objectGopn.f;
var toString$1  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it){
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$4
};

var gOPD$1           = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if(_ie8DomDefine)try {
    return gOPD$1(O, P);
  } catch(e){ /* empty */ }
  if(_has(O, P))return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim
var META           = _meta.KEY;
var gOPD           = _objectGopd.f;
var dP$1             = _objectDp.f;
var gOPN           = _objectGopnExt.f;
var $Symbol        = _global.Symbol;
var $JSON          = _global.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE$2      = 'prototype';
var HIDDEN         = _wks('_hidden');
var TO_PRIMITIVE   = _wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols     = _shared('symbols');
var OPSymbols      = _shared('op-symbols');
var ObjectProto$1    = Object[PROTOTYPE$2];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function(){
  return _objectCreate(dP$1({}, 'a', {
    get: function(){ return dP$1(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto$1, key);
  if(protoDesc)delete ObjectProto$1[key];
  dP$1(it, key, D);
  if(protoDesc && it !== ObjectProto$1)dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if(_has(AllSymbols, key)){
    if(!D.enumerable){
      if(!_has(it, HIDDEN))dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(_has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _objectCreate(D, {enumerable: _propertyDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if(this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = _toIobject(it);
  key = _toPrimitive(key, true);
  if(it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(_toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto$1
    , names  = gOPN(IS_OP ? OPSymbols : _toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto$1)$set.call(OPSymbols, value);
      if(_has(this, HIDDEN) && _has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if(_descriptors && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString(){
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f   = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(_descriptors && !_library){
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function(name){
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )_wks(symbols[i$1++]);

for(var symbols = _objectKeys(_wks.store), i$1 = 0; symbols.length > i$1; )_wksDefine(symbols[i$1++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return _keyof(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !_isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var index$1 = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": index$1, __esModule: true };
});

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator);



var _symbol2 = _interopRequireDefault(symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */

var check = function(O, proto){
  _anObject(O);
  if(!_isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', {setPrototypeOf: _setProto.set});

var setPrototypeOf$2 = _core.Object.setPrototypeOf;

var setPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf$2, __esModule: true };
});

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', {create: _objectCreate});

var $Object$1 = _core.Object;
var create$2 = function create(P, D){
  return $Object$1.create(P, D);
};

var create = createCommonjsModule(function (module) {
module.exports = { "default": create$2, __esModule: true };
});

var inherits = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf);



var _create2 = _interopRequireDefault(create);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function() {};

if (__DEV__) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

var warning_1 = warning;

var checkIndexBounds_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});





var _warning2 = _interopRequireDefault(warning_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable flowtype/require-valid-file-annotation */

var checkIndexBounds = function checkIndexBounds(props) {
  var index = props.index,
      children = props.children;


  var childrenCount = React.Children.count(children);

  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(index >= 0 && index <= childrenCount, 'react-swipeable-view: the new index: ' + index + ' is out of bounds: [0-' + childrenCount + '].') : void 0;
};

exports.default = checkIndexBounds;
});

var constant = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//  weak

exports.default = {
  RESISTANCE_COEF: 0.6,

  // This value is closed to what browsers are using internally to
  // trigger a native scroll.
  UNCERTAINTY_THRESHOLD: 3 };
});

var computeIndex_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeIndex;





var _constant2 = _interopRequireDefault(constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  weak

function computeIndex(params) {
  var children = params.children,
      startIndex = params.startIndex,
      startX = params.startX,
      pageX = params.pageX,
      viewLength = params.viewLength,
      resistance = params.resistance;


  var indexMax = React.Children.count(children) - 1;
  var index = startIndex + (startX - pageX) / viewLength;
  var newStartX = void 0;

  if (!resistance) {
    // Reset the starting point
    if (index < 0) {
      index = 0;
      newStartX = (index - startIndex) * viewLength + pageX;
    } else if (index > indexMax) {
      index = indexMax;
      newStartX = (index - startIndex) * viewLength + pageX;
    }
  } else if (index < 0) {
    index = Math.exp(index * _constant2.default.RESISTANCE_COEF) - 1;
  } else if (index > indexMax) {
    index = indexMax + 1 - Math.exp((indexMax - index) * _constant2.default.RESISTANCE_COEF);
  }

  return {
    index: index,
    startX: newStartX
  };
}
});

var getDisplaySameSlide_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//  weak

var getDisplaySameSlide = function getDisplaySameSlide(props, nextProps) {
  var displaySameSlide = false;

  if (props.children.length && nextProps.children.length) {
    var oldChildren = props.children[props.index];
    var oldKey = oldChildren ? oldChildren.key : 'empty';

    if (oldKey !== null) {
      var newChildren = nextProps.children[nextProps.index];
      var newKey = newChildren ? newChildren.key : 'empty';

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

exports.default = getDisplaySameSlide;
});

var mod_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable flowtype/require-valid-file-annotation */

function mod(n, m) {
  var q = n % m;
  return q < 0 ? q + m : q;
}

exports.default = mod;
});

var index$3 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



Object.defineProperty(exports, 'checkIndexBounds', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(checkIndexBounds_1).default;
  }
});



Object.defineProperty(exports, 'computeIndex', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(computeIndex_1).default;
  }
});



Object.defineProperty(exports, 'constant', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(constant).default;
  }
});



Object.defineProperty(exports, 'getDisplaySameSlide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(getDisplaySameSlide_1).default;
  }
});



Object.defineProperty(exports, 'mod', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(mod_1).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

var SwipeableViews_animated = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _objectWithoutProperties3 = _interopRequireDefault(objectWithoutProperties);



var _extends3 = _interopRequireDefault(_extends);



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf);



var _classCallCheck3 = _interopRequireDefault(classCallCheck);



var _createClass3 = _interopRequireDefault(createClass);



var _possibleConstructorReturn3 = _interopRequireDefault(possibleConstructorReturn);



var _inherits3 = _interopRequireDefault(inherits);



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);





var _warning2 = _interopRequireDefault(warning_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = reactNative.StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  slide: {
    flex: 1
  }
});

// I couldn't find a public API to get this value.
//  weak
/**
 * This is an alternative version that use `Animated.View`.
 * I'm not sure what version give the best UX experience.
 * I'm keeping the two versions here until we figured out.
 */

function getAnimatedValue(animated) {
  return animated._value; // eslint-disable-line no-underscore-dangle
}

var SwipeableViews = function (_Component) {
  (0, _inherits3.default)(SwipeableViews, _Component);

  function SwipeableViews() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SwipeableViews);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SwipeableViews.__proto__ || (0, _getPrototypeOf2.default)(SwipeableViews)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleAnimationFinished = function (params) {
      // The animation can be aborted.
      // We only want to call onTransitionEnd when the animation is finished.
      if (_this.props.onTransitionEnd && params.finished) {
        _this.props.onTransitionEnd();
      }
    }, _this.panResponder = undefined, _this.startX = 0, _this.startIndex = 0, _this.handleTouchStart = function (event, gestureState) {
      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event, gestureState);
      }

      _this.startX = gestureState.x0;
      _this.startIndex = getAnimatedValue(_this.state.indexCurrent);
    }, _this.handleTouchMove = function (event, gestureState) {
      var _this$props = _this.props,
          children = _this$props.children,
          onSwitching = _this$props.onSwitching,
          resistance = _this$props.resistance;

      var _computeIndex = (0, index$3.computeIndex)({
        children: children,
        resistance: resistance,
        pageX: gestureState.moveX,
        startIndex: _this.startIndex,
        startX: _this.startX,
        viewLength: _this.state.viewLength
      }),
          index = _computeIndex.index,
          startX = _computeIndex.startX;

      if (startX) {
        _this.startX = startX;
      }

      _this.state.indexCurrent.setValue(index);

      if (onSwitching) {
        onSwitching(index, 'move');
      }
    }, _this.handleTouchEnd = function (event, gestureState) {
      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event, gestureState);
      }

      var vx = gestureState.vx,
          moveX = gestureState.moveX;


      var indexLatest = _this.state.indexLatest;
      var indexCurrent = indexLatest + (_this.startX - moveX) / _this.state.viewLength;
      var delta = indexLatest - indexCurrent;

      var indexNew = void 0;

      // Quick movement
      if (Math.abs(vx) * 10 > _this.props.threshold) {
        if (vx > 0) {
          indexNew = Math.floor(indexCurrent);
        } else {
          indexNew = Math.ceil(indexCurrent);
        }
      } else if (Math.abs(delta) > _this.props.hysteresis) {
        // Some hysteresis with indexLatest.
        indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
      } else {
        indexNew = indexLatest;
      }

      var indexMax = React.Children.count(_this.props.children) - 1;

      if (indexNew < 0) {
        indexNew = 0;
      } else if (indexNew > indexMax) {
        indexNew = indexMax;
      }

      _this.setState({
        indexLatest: indexNew
      }, function () {
        _this.animateIndexCurrent(indexNew);

        if (_this.props.onSwitching) {
          _this.props.onSwitching(indexNew, 'end');
        }

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    }, _this.handleLayout = function (event) {
      var width = event.nativeEvent.layout.width;


      if (width) {
        _this.setState({
          viewLength: width
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SwipeableViews, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (process.env.NODE_ENV !== 'production') {
        (0, index$3.checkIndexBounds)(this.props);
      }

      this.setState({
        indexLatest: this.props.index,
        indexCurrent: new reactNative.Animated.Value(this.props.index),
        viewLength: reactNative.Dimensions.get('window').width
      });

      this.panResponder = reactNative.PanResponder.create({
        // So it's working inside a Modal
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return true;
        },
        // Claim responder if it's a horizontal pan
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(event, gestureState) {
          var dx = Math.abs(gestureState.dx);
          var dy = Math.abs(gestureState.dy);

          return dx > dy && dx > index$3.constant.UNCERTAINTY_THRESHOLD;
        },
        onPanResponderRelease: this.handleTouchEnd,
        onPanResponderTerminate: this.handleTouchEnd,
        onPanResponderMove: this.handleTouchMove,
        onPanResponderGrant: this.handleTouchStart
      });

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.animateHeight, 'react-swipeable-view: The animateHeight property is not implement yet.') : void 0;
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.axis, 'react-swipeable-view: The axis property is not implement yet.') : void 0;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var index = nextProps.index,
          animateTransitions = nextProps.animateTransitions;


      if (typeof index === 'number' && index !== this.props.index) {
        if (process.env.NODE_ENV !== 'production') {
          (0, index$3.checkIndexBounds)(nextProps);
        }

        // If true, we are going to change the children. We shoudn't animate it.
        var displaySameSlide = (0, index$3.getDisplaySameSlide)(this.props, nextProps);

        if (animateTransitions && !displaySameSlide) {
          this.setState({
            indexLatest: index
          }, function () {
            _this2.animateIndexCurrent(index);
          });
        } else {
          this.setState({
            indexLatest: index,
            indexCurrent: new reactNative.Animated.Value(index)
          });
        }
      }
    }
  }, {
    key: 'animateIndexCurrent',
    value: function animateIndexCurrent(index) {
      // Avoid starting an animation when we are already on the right value.
      if (getAnimatedValue(this.state.indexCurrent) !== index) {
        reactNative.Animated.spring(this.state.indexCurrent, (0, _extends3.default)({
          toValue: index
        }, this.props.springConfig)).start(this.handleAnimationFinished);
      } else {
        this.handleAnimationFinished({
          finished: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style,
          slideStyle = _props.slideStyle,
          containerStyle = _props.containerStyle,
          disabled = _props.disabled,
          hysteresis = _props.hysteresis,
          index = _props.index,
          onTransitionEnd = _props.onTransitionEnd,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'style', 'slideStyle', 'containerStyle', 'disabled', 'hysteresis', 'index', 'onTransitionEnd']);
      var _state = this.state,
          indexCurrent = _state.indexCurrent,
          viewLength = _state.viewLength;


      var slideStyleObj = [styles.slide, slideStyle];

      var childrenToRender = React.Children.map(children, function (child) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)((0, React.isValidElement)(child), 'react-swipeable-view: one of the children provided is invalid: ' + child + '.\nWe are expecting a valid React Element') : void 0;

        return _react2.default.createElement(
          reactNative.View,
          { style: slideStyleObj },
          child
        );
      });

      var sceneContainerStyle = [styles.container, {
        width: viewLength * React.Children.count(children),
        transform: [{
          translateX: indexCurrent.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -viewLength]
          })
        }]
      }, containerStyle];

      var panHandlers = disabled ? {} : this.panResponder.panHandlers;

      return _react2.default.createElement(
        reactNative.View,
        (0, _extends3.default)({ style: [styles.root, style], onLayout: this.handleLayout }, other),
        _react2.default.createElement(
          reactNative.Animated.View,
          (0, _extends3.default)({}, panHandlers, { style: sceneContainerStyle }),
          childrenToRender
        )
      );
    }
  }]);
  return SwipeableViews;
}(React.Component);

SwipeableViews.defaultProps = {
  animateTransitions: true,
  disabled: false,
  hysteresis: 0.6,
  index: 0,
  resistance: false,
  springConfig: {
    tension: 300,
    friction: 30
  },
  threshold: 5
};
process.env.NODE_ENV !== "production" ? SwipeableViews.propTypes = {
  /**
   * If `true`, the height of the container will be animated to match the current slide height.
   * Animating another style property has a negative impact regarding performance.
   */
  animateHeight: _propTypes2.default.bool,
  /**
   * If `false`, changes to the index prop will not cause an animated transition.
   */
  animateTransitions: _propTypes2.default.bool,
  /**
   * The axis on which the slides will slide.
   */
  axis: _propTypes2.default.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
  /**
   * Use this property to provide your slides.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */
  containerStyle: reactNative.Animated.View.propTypes.style,
  /**
   * If `true`, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Configure hysteresis between slides. This value determines how far
   * should user swipe to switch slide.
   */
  hysteresis: _propTypes2.default.number,
  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   */
  index: _propTypes2.default.number,
  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {integer} fromIndex This is the oldest index of the slide.
   */
  onChangeIndex: _propTypes2.default.func,
  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding to the current slide position.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {string} type Can be either `move` or `end`.
   */
  onSwitching: _propTypes2.default.func,
  /**
   * @ignore
   */
  onTouchEnd: _react2.default.PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: _react2.default.PropTypes.func,
  /**
   * The callback that fires when the animation comes to a rest.
   * This is useful to defer CPU intensive task.
   */
  onTransitionEnd: _propTypes2.default.func,
  /**
   * If `true`, it will add bounds effect on the edges.
   */
  resistance: _propTypes2.default.bool,
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle: reactNative.View.propTypes.style,
  /**
   * This is the config given to Animated for the spring.
   * This is useful to change the dynamic of the transition.
   */
  springConfig: _propTypes2.default.shape({
    tension: _propTypes2.default.number,
    friction: _propTypes2.default.number
  }),
  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: reactNative.View.propTypes.style,
  /**
   * This is the threshold used for detecting a quick swipe.
   * If the computed speed is above this value, the index change.
   */
  threshold: _propTypes2.default.number
} : void 0;
exports.default = SwipeableViews;
});

var index = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _SwipeableViews2 = _interopRequireDefault(SwipeableViews_animated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SwipeableViews2.default; //  weak
});

var SwipeableViews = unwrapExports(index);

var classCallCheck$2 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$2 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits$2 = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn$2 = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/*       */

var ANIM_CONFIG = { duration: 300 };

var _Dimensions$get = Dimensions.get('window');
var screenWidth = _Dimensions$get.width;
var screenHeight = _Dimensions$get.height;

var ImageCarousel = function (_Component) {
  inherits$2(ImageCarousel, _Component);

  function ImageCarousel() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck$2(this, ImageCarousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn$2(this, (_ref = ImageCarousel.__proto__ || Object.getPrototypeOf(ImageCarousel)).call.apply(_ref, [this].concat(args))), _this), _this.openAnim = new Animated.Value(0), _this.pan = new Animated.Value(0), _this.carouselItems = Array.isArray(_this.props.children) ? _this.props.children.map(function () {
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


      hideStatusBarOnOpen && StatusBar.setHidden(true, 'fade');

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
          onIdxChange && onIdxChange(startIdx);
          _this.animateOpenAnimToValue(1, onOpen);
        });
      });
    }, _this.close = function () {
      var activeComponent = _this.getComponentAtIdx(_this.state.selectedIdx);

      if (!activeComponent) return;

      var _this$props2 = _this.props,
          hideStatusBarOnOpen = _this$props2.hideStatusBarOnOpen,
          onClose = _this$props2.onClose;


      hideStatusBarOnOpen && StatusBar.setHidden(false, 'fade');
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

          onClose && onClose();
        });
      });
    }, _this.captureCarouselItem = function (carouselItem, idx) {
      _this.carouselItems[idx] = carouselItem;
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
      return Animated.timing(_this.openAnim, Object.assign({}, ANIM_CONFIG, {
        toValue: toValue
      })).start(function () {
        _this.setState({ animating: false });
        onComplete && onComplete();
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
        Animated.timing(_this.pan, Object.assign({
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


      if (!fullscreen || idx !== selectedIdx) return { flex: 1 };

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
      _this.props.onIdxChange && _this.props.onIdxChange(idx);
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
        Animated.View,
        { key: idx, style: containerStyle },
        React.createElement(
          ScrollView,
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
        TouchableWithoutFeedback,
        { onPress: _this.close },
        React.createElement(
          View,
          null,
          React.createElement(
            Text,
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
        Modal,
        {
          transparent: true,
          visible: fullscreen,
          onShow: _this.handleModalShow,
          onRequestClose: _this.close
        },
        React.createElement(Animated.View, { style: [styles.modalBackground, opacity] }),
        React.createElement(
          SwipeableViews,
          {
            style: StyleSheet.absoluteFill,
            index: selectedIdx,
            onChangeIndex: _this.handleChangeIdx,
            scrollEnabled: !animating && !panning
          },
          _this.getChildren().map(_this.renderFullscreenContent)
        ),
        React.createElement(
          Animated.View,
          { style: [opacity, styles.headerContainer] },
          header ? React.cloneElement(header, Object.assign({}, header.props, {
            style: [header.props.style]
          })) : _this.renderDefaultHeader()
        ),
        footer && React.createElement(
          Animated.View,
          { style: [opacity, styles.footerContainer] },
          footer
        )
      );
    }, _temp), possibleConstructorReturn$2(_this, _ret);
  }

  // eslint-disable-line flowtype/no-weak-types


  createClass$2(ImageCarousel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.panResponder = PanResponder.create({
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
        View,
        { style: style },
        React.createElement(
          ScrollView,
          {
            horizontal: horizontal,
            contentContainerStyle: contentContainerStyle,
            scrollEnabled: !animating,
            alwaysBounceHorizontal: false,
            showsHorizontalScrollIndicator: false
          },
          this.getChildren().map(function (child, idx) {
            return React.createElement(
              TouchableWithoutFeedback,
              {
                key: 'slider-image-' + idx // eslint-disable-line react/no-array-index-key
                , onPress: function onPress() {
                  return _this3.open(idx);
                }
              },
              React.createElement(
                View,
                {
                  ref: function ref(view) {
                    return _this3.captureCarouselItem(view, idx);
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
}(Component);

ImageCarousel.defaultProps = {
  zoomEnabled: true,
  hideStatusBarOnOpen: true
};


var styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  modalBackground: Object.assign({}, StyleSheet.absoluteFillObject, {
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

export default ImageCarousel;
