"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _reactNativeRedash = require("react-native-redash");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _bottomSheet = _interopRequireDefault(require("../bottomSheet"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const BottomSheetModalComponent = /*#__PURE__*/(0, _react.forwardRef)(({
  content,
  configs,
  unmount
}, ref) => {
  const {
    initialSnapIndex: _initialSnapIndex = 0,
    snapPoints: _snapPoints,
    animatedPositionIndex: _animatedPositionIndex,
    allowTouchThroughOverlay = _constants.DEFAULT_ALLOW_TOUCH_THROUGH_OVERLAY,
    overlayComponent: OverlayComponent,
    overlayOpacity = _constants.DEFAULT_OVERLAY_OPACITY,
    dismissOnOverlayPress = _constants.DEFAULT_DISMISS_ON_OVERLAY_PRESS,
    dismissOnScrollDown = _constants.DEFAULT_DISMISS_ON_SCROLL_DOWN,
    onChange,
    ...bottomSheetProps
  } = configs; //#region refs

  const bottomSheetRef = (0, _react.useRef)(null);
  const isTemporaryClosing = (0, _react.useRef)(false);
  const lastSheetPosition = (0, _react.useRef)(0); //#endregion
  //#region variables

  const animatedPositionIndex = (0, _reactNativeRedash.useValue)(0);
  const animatedOverlayOpacity = (0, _react.useMemo)(() => interpolate(animatedPositionIndex, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedPositionIndex, overlayOpacity]);
  const initialSnapIndex = (0, _react.useMemo)(() => dismissOnScrollDown ? 0 : -1, [dismissOnScrollDown]);
  const snapPoints = (0, _react.useMemo)(() => dismissOnScrollDown ? [0, ..._snapPoints] : _snapPoints, [_snapPoints, dismissOnScrollDown]);
  const overlayPointerEvents = (0, _react.useMemo)(() => allowTouchThroughOverlay ? 'none' : 'auto', [allowTouchThroughOverlay]); //#endregion
  //#region callbacks

  const handleChange = (0, _react.useCallback)(index => {
    if (onChange) {
      onChange(index);
    }

    if (!isTemporaryClosing.current) {
      lastSheetPosition.current = index;

      if (index < (dismissOnScrollDown ? 1 : 0)) {
        unmount();
      }
    }
  }, [unmount, onChange, dismissOnScrollDown]);
  const handleClose = (0, _react.useCallback)(() => {
    var _bottomSheetRef$curre;

    if (isTemporaryClosing.current) {
      unmount();
      return;
    }

    (_bottomSheetRef$curre = bottomSheetRef.current) === null || _bottomSheetRef$curre === void 0 ? void 0 : _bottomSheetRef$curre.close();
  }, [unmount]);
  const handleCollapse = (0, _react.useCallback)(() => {
    if (dismissOnScrollDown) {
      var _bottomSheetRef$curre2;

      (_bottomSheetRef$curre2 = bottomSheetRef.current) === null || _bottomSheetRef$curre2 === void 0 ? void 0 : _bottomSheetRef$curre2.snapTo(1);
    } else {
      var _bottomSheetRef$curre3;

      (_bottomSheetRef$curre3 = bottomSheetRef.current) === null || _bottomSheetRef$curre3 === void 0 ? void 0 : _bottomSheetRef$curre3.collapse();
    }
  }, [dismissOnScrollDown]);
  const handleSnapTo = (0, _react.useCallback)(index => {
    var _bottomSheetRef$curre4;

    (_bottomSheetRef$curre4 = bottomSheetRef.current) === null || _bottomSheetRef$curre4 === void 0 ? void 0 : _bottomSheetRef$curre4.snapTo(index + (dismissOnScrollDown ? 1 : 0));
  }, [dismissOnScrollDown]);
  const handleTemporaryCloseSheet = (0, _react.useCallback)(() => {
    var _bottomSheetRef$curre5;

    isTemporaryClosing.current = true;
    (_bottomSheetRef$curre5 = bottomSheetRef.current) === null || _bottomSheetRef$curre5 === void 0 ? void 0 : _bottomSheetRef$curre5.close();
  }, []);
  const handleRestoreSheetPosition = (0, _react.useCallback)(() => {
    var _bottomSheetRef$curre6;

    isTemporaryClosing.current = false;
    (_bottomSheetRef$curre6 = bottomSheetRef.current) === null || _bottomSheetRef$curre6 === void 0 ? void 0 : _bottomSheetRef$curre6.snapTo(lastSheetPosition.current);
  }, []);
  const handleOverlayPress = (0, _react.useCallback)(() => {
    var _bottomSheetRef$curre7;

    (_bottomSheetRef$curre7 = bottomSheetRef.current) === null || _bottomSheetRef$curre7 === void 0 ? void 0 : _bottomSheetRef$curre7.close();
  }, []); //#endregion
  //#region effects

  (0, _react.useImperativeHandle)(ref, () => ({
    close: handleClose,
    snapTo: handleSnapTo,
    expand: bottomSheetRef.current.expand,
    collapse: handleCollapse,
    temporaryCloseSheet: handleTemporaryCloseSheet,
    restoreSheetPosition: handleRestoreSheetPosition
  }));
  (0, _react.useEffect)(() => {
    var _bottomSheetRef$curre8;

    (_bottomSheetRef$curre8 = bottomSheetRef.current) === null || _bottomSheetRef$curre8 === void 0 ? void 0 : _bottomSheetRef$curre8.snapTo(_initialSnapIndex + (dismissOnScrollDown ? 1 : 0)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, OverlayComponent && /*#__PURE__*/_react.default.createElement(OverlayComponent, _extends({
    animatedOpacity: animatedOverlayOpacity,
    pointerEvents: overlayPointerEvents
  }, dismissOnOverlayPress ? {
    onPress: handleOverlayPress
  } : {})), _animatedPositionIndex && /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Code, {
    exec: (0, _reactNativeReanimated.set)(_animatedPositionIndex, animatedPositionIndex)
  }), /*#__PURE__*/_react.default.createElement(_bottomSheet.default, _extends({
    ref: bottomSheetRef
  }, bottomSheetProps, {
    initialSnapIndex: initialSnapIndex,
    snapPoints: snapPoints,
    animatedPositionIndex: animatedPositionIndex,
    onChange: handleChange
  }), content));
});
const BottomSheetModal = /*#__PURE__*/(0, _react.memo)(BottomSheetModalComponent, _lodash.default);
var _default = BottomSheetModal;
exports.default = _default;
//# sourceMappingURL=BottomSheetModal.js.map