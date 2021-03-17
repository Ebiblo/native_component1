"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BottomSheetOverlayComponent = ({
  color = 'black',
  pointerEvents,
  animatedOpacity,
  onPress
}) => {
  //#region styles
  const containerStyle = (0, _react.useMemo)(() => [_styles.styles.container, {
    opacity: animatedOpacity,
    backgroundColor: color
  }], [color, animatedOpacity]); //#endregion
  //#region render

  if (onPress) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: onPress,
      style: _styles.styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: pointerEvents,
      style: containerStyle
    }));
  } else {
    return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: pointerEvents,
      style: containerStyle
    });
  } //#endregion

};

const BottomSheetOverlay = /*#__PURE__*/(0, _react.memo)(BottomSheetOverlayComponent, _lodash.default);
var _default = BottomSheetOverlay;
exports.default = _default;
//# sourceMappingURL=Overlay.js.map