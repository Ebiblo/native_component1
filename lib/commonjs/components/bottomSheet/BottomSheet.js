"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _invariant = _interopRequireDefault(require("invariant"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeRedash = require("react-native-redash");

var _draggableView = _interopRequireDefault(require("../draggableView"));

var _handle = _interopRequireDefault(require("../handle"));

var _contentWrapper = _interopRequireDefault(require("../contentWrapper"));

var _useTransition = require("./useTransition");

var _hooks = require("../../hooks");

var _utilities = require("../../utilities");

var _contexts = require("../../contexts");

var _constants = require("../../constants");

var _constants2 = require("./constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

_reactNativeReanimated.default.addWhitelistedUIProps({
  decelerationRate: true
});

const BottomSheetComponent = /*#__PURE__*/(0, _react.forwardRef)(({
  // animations
  animationDuration = _constants2.DEFAULT_ANIMATION_DURATION,
  animationEasing = _constants2.DEFAULT_ANIMATION_EASING,
  // general
  initialSnapIndex = 0,
  snapPoints: _snapPoints,
  topInset = 0,
  enabled = true,
  // animated nodes callback
  animatedPosition: _animatedPosition,
  animatedPositionIndex: _animatedPositionIndex,
  // callbacks
  onChange: _onChange,
  // components
  handleComponent: HandleComponent = _handle.default,
  backgroundComponent: BackgroundComponent = null,
  children
}, ref) => {
  //#region validate props
  // validate `snapPoints`
  (0, _invariant.default)(_snapPoints, "'snapPoints' was not provided! please provide at least one snap point.");
  (0, _invariant.default)(_snapPoints.length > 0, "'snapPoints' was provided with no points! please provide at least one snap point."); // validate `initialSnapIndex`

  (0, _invariant.default)(typeof initialSnapIndex === 'number', "'initialSnapIndex' was provided but with wrong type ! expected type is a number.");
  (0, _invariant.default)(initialSnapIndex >= -1 && initialSnapIndex <= _snapPoints.length - 1, "'initialSnapIndex' was provided but out of the provided snap points range! expected value to be between -1, ".concat(_snapPoints.length - 1)); // topInset

  (0, _invariant.default)(typeof topInset === 'number', "'topInset' was provided but with wrong type ! expected type is a number."); // validate animations

  (0, _invariant.default)(typeof animationDuration === 'number', "'animationDuration' was provided but with wrong type ! expected type is a number.");
  (0, _invariant.default)(animationDuration > 0, "'animationDuration' was provided but the value is very low! expected value to be greater than 0");
  (0, _invariant.default)(typeof animationEasing === 'function', "'animationEasing' was provided but with wrong type ! expected type is a Animated.EasingFunction."); //#endregion
  //#region refs

  const currentPositionIndexRef = (0, _react.useRef)(initialSnapIndex);
  const rootTapGestureRef = (0, _react.useRef)(null);
  const handlePanGestureRef = (0, _react.useRef)(null); //#endregion
  //#region variables

  const {
    scrollableContentOffsetY,
    setScrollableRef,
    removeScrollableRef,
    scrollToTop,
    flashScrollableIndicators
  } = (0, _hooks.useScrollable)(); // normalize snap points

  const {
    snapPoints,
    sheetHeight
  } = (0, _react.useMemo)(() => {
    const normalizedSnapPoints = (0, _utilities.normalizeSnapPoints)(_snapPoints, topInset);
    const maxSnapPoint = normalizedSnapPoints[normalizedSnapPoints.length - 1];
    return {
      snapPoints: normalizedSnapPoints.map(normalizedSnapPoint => maxSnapPoint - normalizedSnapPoint),
      sheetHeight: maxSnapPoint
    };
  }, [_snapPoints, topInset]);
  const initialPosition = (0, _react.useMemo)(() => {
    return initialSnapIndex < 0 ? sheetHeight : snapPoints[initialSnapIndex];
  }, [initialSnapIndex, sheetHeight, snapPoints]); //#endregion
  //#region gestures

  const {
    state: handlePanGestureState,
    translation: {
      y: handlePanGestureTranslationY
    },
    velocity: {
      y: handlePanGestureVelocityY
    },
    gestureHandler: handlePanGestureHandler
  } = (0, _reactNativeRedash.usePanGestureHandler)();
  const {
    state: contentPanGestureState,
    translation: {
      y: contentPanGestureTranslationY
    },
    velocity: {
      y: contentPanGestureVelocityY
    }
  } = (0, _reactNativeRedash.usePanGestureHandler)();
  const {
    state: tapGestureState,
    gestureHandler: tapGestureHandler
  } = (0, _reactNativeRedash.useTapGestureHandler)(); //#endregion
  //#region animation

  const {
    position,
    manualSnapToPoint,
    currentPosition,
    currentGesture
  } = (0, _useTransition.useTransition)({
    animationDuration,
    animationEasing,
    contentPanGestureState,
    contentPanGestureTranslationY,
    contentPanGestureVelocityY,
    handlePanGestureState,
    handlePanGestureTranslationY,
    handlePanGestureVelocityY,
    scrollableContentOffsetY,
    snapPoints,
    initialPosition
  });
  const animatedPositionIndex = (0, _react.useMemo)(() => interpolate(position, {
    inputRange: snapPoints.slice().reverse(),
    outputRange: snapPoints.slice().map((_, index) => index).reverse(),
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [position, snapPoints]);
  /**
   * Scrollable animated props.
   */

  const decelerationRate = (0, _react.useMemo)(() => (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.greaterThan)(position, 0), 0.001, _constants2.NORMAL_DECELERATION_RATE), [position]); //#endregion
  //#region styles

  const containerStyle = (0, _react.useMemo)(() => ({ ..._styles.styles.container,
    height: sheetHeight
  }), [sheetHeight]);
  const contentContainerStyle = (0, _react.useMemo)(() => ({ ..._styles.styles.container,
    height: sheetHeight,
    transform: [{
      translateY: position
    }]
  }), [sheetHeight, position]); //#endregion
  //#region callbacks

  const refreshUIElements = (0, _react.useCallback)(() => {
    const currentPositionIndex = Math.max(currentPositionIndexRef.current, 0);

    if (currentPositionIndex === snapPoints.length - 1) {
      flashScrollableIndicators(); // @ts-ignore

      rootTapGestureRef.current.setNativeProps({
        maxDeltaY: 0
      });
    } else {
      // @ts-ignore
      rootTapGestureRef.current.setNativeProps({
        maxDeltaY: snapPoints[currentPositionIndex]
      });
    }
  }, [snapPoints, flashScrollableIndicators]);
  const handleOnChange = (0, _hooks.useStableCallback)(index => {
    if (_onChange) {
      _onChange(index);
    }
  });
  const handleSettingScrollableRef = (0, _react.useCallback)(scrollableRef => {
    setScrollableRef(scrollableRef);
    refreshUIElements();
  }, [setScrollableRef, refreshUIElements]); //#endregion
  //#region methods

  const handleSnapTo = (0, _react.useCallback)(index => {
    (0, _invariant.default)(index >= -1 && index <= snapPoints.length - 1, "'index' was provided but out of the provided snap points range! expected value to be between -1, ".concat(snapPoints.length - 1));
    manualSnapToPoint.setValue(snapPoints[index]);
  }, [snapPoints, manualSnapToPoint]);
  const handleClose = (0, _react.useCallback)(() => {
    manualSnapToPoint.setValue(sheetHeight);
  }, [sheetHeight, manualSnapToPoint]);
  const handleExpand = (0, _react.useCallback)(() => {
    manualSnapToPoint.setValue(snapPoints[snapPoints.length - 1]);
  }, [snapPoints, manualSnapToPoint]);
  const handleCollapse = (0, _react.useCallback)(() => {
    manualSnapToPoint.setValue(snapPoints[0]);
  }, [snapPoints, manualSnapToPoint]); //#endregion
  //#region

  const internalContextVariables = (0, _react.useMemo)(() => ({
    enabled,
    rootTapGestureRef,
    handlePanGestureState,
    handlePanGestureTranslationY,
    handlePanGestureVelocityY,
    contentPanGestureState,
    contentPanGestureTranslationY,
    contentPanGestureVelocityY,
    scrollableContentOffsetY,
    decelerationRate,
    setScrollableRef: handleSettingScrollableRef,
    removeScrollableRef
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [enabled]);
  const externalContextVariables = (0, _react.useMemo)(() => ({
    snapTo: handleSnapTo,
    expand: handleExpand,
    collapse: handleCollapse,
    close: handleClose
  }), [handleSnapTo, handleExpand, handleCollapse, handleClose]); //#endregion
  //#region effects

  (0, _react.useImperativeHandle)(ref, () => ({
    snapTo: handleSnapTo,
    expand: handleExpand,
    collapse: handleCollapse,
    close: handleClose
  }));
  /**
   * @DEV
   * here we track the current position and
   * - call on change ( if provided ).
   * - flash scrollable component scroll indicators.
   * - manipulate the root tap gesture handler maxDeltaY,
   *   which allows the scrollable component to be activated.
   */

  (0, _reactNativeReanimated.useCode)(() => (0, _reactNativeReanimated.onChange)(currentPosition, [(0, _reactNativeReanimated.call)([currentPosition], args => {
    const currentPositionIndex = snapPoints.indexOf(args[0]);
    /**
     * if animation was interrupted, we ignore the change.
     */

    if (currentPositionIndex === -1 && args[0] !== sheetHeight) {
      return;
    }

    currentPositionIndexRef.current = currentPositionIndex;
    refreshUIElements();
    handleOnChange(currentPositionIndex);
  })]), [snapPoints, refreshUIElements]);
  /**
   * @DEV
   * Once the root tap gesture handler states change to failed
   * and the sheet not fully extended, we make sure to prevent the
   * scrollable component from scrolling.
   */

  (0, _reactNativeReanimated.useCode)(() => (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(tapGestureState, _reactNativeGestureHandler.State.FAILED), (0, _reactNativeReanimated.eq)(currentGesture, _constants.GESTURE.CONTENT), (0, _reactNativeReanimated.neq)(position, 0)), (0, _reactNativeReanimated.call)([], () => {
    scrollToTop();
  })), []); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_contentWrapper.default, _extends({
    ref: rootTapGestureRef,
    initialMaxDeltaY: snapPoints[Math.max(initialSnapIndex, 0)],
    style: containerStyle
  }, tapGestureHandler), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: contentContainerStyle
  }, BackgroundComponent && /*#__PURE__*/_react.default.createElement(BackgroundComponent, {
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_contexts.BottomSheetProvider, {
    value: externalContextVariables
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, _extends({
    enabled: enabled,
    ref: handlePanGestureRef,
    simultaneousHandlers: rootTapGestureRef,
    shouldCancelWhenOutside: false
  }, handlePanGestureHandler), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, null, /*#__PURE__*/_react.default.createElement(HandleComponent, {
    animatedPositionIndex: animatedPositionIndex
  }))), /*#__PURE__*/_react.default.createElement(_contexts.BottomSheetInternalProvider, {
    value: internalContextVariables
  }, /*#__PURE__*/_react.default.createElement(_draggableView.default, {
    style: _styles.styles.contentContainer
  }, children))))), _animatedPosition && /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Code, {
    exec: (0, _reactNativeReanimated.set)(_animatedPosition, (0, _reactNativeReanimated.sub)(sheetHeight, position))
  }), _animatedPositionIndex && /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Code, {
    exec: (0, _reactNativeReanimated.set)(_animatedPositionIndex, animatedPositionIndex)
  }));
});
const BottomSheet = /*#__PURE__*/(0, _react.memo)(BottomSheetComponent, _lodash.default);
var _default = BottomSheet;
exports.default = _default;
//# sourceMappingURL=BottomSheet.js.map