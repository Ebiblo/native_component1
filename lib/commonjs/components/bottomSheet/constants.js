"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NORMAL_DECELERATION_RATE = exports.DEFAULT_ANIMATION_DURATION = exports.DEFAULT_ANIMATION_EASING = void 0;

var _reactNative = require("react-native");

const {
  Easing: EasingV1,
  EasingNode: EasingV2
} = require('react-native-reanimated');

const Easing = EasingV2 || EasingV1;
const DEFAULT_ANIMATION_EASING = Easing.out(Easing.back(0.75));
exports.DEFAULT_ANIMATION_EASING = DEFAULT_ANIMATION_EASING;
const DEFAULT_ANIMATION_DURATION = 500;
exports.DEFAULT_ANIMATION_DURATION = DEFAULT_ANIMATION_DURATION;

const NORMAL_DECELERATION_RATE = _reactNative.Platform.select({
  ios: 0.998,
  android: 0.985
});

exports.NORMAL_DECELERATION_RATE = NORMAL_DECELERATION_RATE;
//# sourceMappingURL=constants.js.map