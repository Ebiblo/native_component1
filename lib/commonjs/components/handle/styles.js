"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const {
  width: windowWidth
} = _reactNative.Dimensions.get('window');

const styles = _reactNative.StyleSheet.create({
  container: {
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white'
  },
  indicator: {
    alignSelf: 'center',
    width: 7.5 * windowWidth / 100,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map