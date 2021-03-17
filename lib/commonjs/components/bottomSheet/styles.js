"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  contentContainer: {
    flex: 1
  },
  debug: {
    position: 'absolute',
    left: 20,
    top: 100,
    backgroundColor: 'rgba(0, 0,0,0.5)'
  },
  debugText: {
    fontSize: 24,
    color: 'white'
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map