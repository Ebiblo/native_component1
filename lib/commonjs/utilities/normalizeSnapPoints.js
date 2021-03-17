"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeSnapPoints = void 0;

var _reactNative = require("react-native");

var _validateSnapPoint = require("./validateSnapPoint");

const {
  height: windowHeight
} = _reactNative.Dimensions.get('window');
/**
 * Converts snap points with percentage to fixed numbers.
 */


const normalizeSnapPoints = (snapPoints, topInset) => snapPoints.map(snapPoint => {
  (0, _validateSnapPoint.validateSnapPoint)(snapPoint);
  return typeof snapPoint === 'number' ? snapPoint : Number(snapPoint.split('%')[0]) * (windowHeight - topInset) / 100;
});

exports.normalizeSnapPoints = normalizeSnapPoints;
//# sourceMappingURL=normalizeSnapPoints.js.map