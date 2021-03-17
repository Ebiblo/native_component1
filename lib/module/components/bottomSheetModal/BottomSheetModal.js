function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import isEqual from 'lodash.isequal';
import { useValue } from 'react-native-redash';
import Animated, { Extrapolate, set } from 'react-native-reanimated';
import BottomSheet from '../bottomSheet';
import { DEFAULT_OVERLAY_OPACITY, DEFAULT_DISMISS_ON_OVERLAY_PRESS, DEFAULT_DISMISS_ON_SCROLL_DOWN, DEFAULT_ALLOW_TOUCH_THROUGH_OVERLAY } from './constants';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const BottomSheetModalComponent = /*#__PURE__*/forwardRef(({
  content,
  configs,
  unmount
}, ref) => {
  const {
    initialSnapIndex: _initialSnapIndex = 0,
    snapPoints: _snapPoints,
    animatedPositionIndex: _animatedPositionIndex,
    allowTouchThroughOverlay = DEFAULT_ALLOW_TOUCH_THROUGH_OVERLAY,
    overlayComponent: OverlayComponent,
    overlayOpacity = DEFAULT_OVERLAY_OPACITY,
    dismissOnOverlayPress = DEFAULT_DISMISS_ON_OVERLAY_PRESS,
    dismissOnScrollDown = DEFAULT_DISMISS_ON_SCROLL_DOWN,
    onChange,
    ...bottomSheetProps
  } = configs; //#region refs

  const bottomSheetRef = useRef(null);
  const isTemporaryClosing = useRef(false);
  const lastSheetPosition = useRef(0); //#endregion
  //#region variables

  const animatedPositionIndex = useValue(0);
  const animatedOverlayOpacity = useMemo(() => interpolate(animatedPositionIndex, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
    extrapolate: Extrapolate.CLAMP
  }), [animatedPositionIndex, overlayOpacity]);
  const initialSnapIndex = useMemo(() => dismissOnScrollDown ? 0 : -1, [dismissOnScrollDown]);
  const snapPoints = useMemo(() => dismissOnScrollDown ? [0, ..._snapPoints] : _snapPoints, [_snapPoints, dismissOnScrollDown]);
  const overlayPointerEvents = useMemo(() => allowTouchThroughOverlay ? 'none' : 'auto', [allowTouchThroughOverlay]); //#endregion
  //#region callbacks

  const handleChange = useCallback(index => {
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
  const handleClose = useCallback(() => {
    var _bottomSheetRef$curre;

    if (isTemporaryClosing.current) {
      unmount();
      return;
    }

    (_bottomSheetRef$curre = bottomSheetRef.current) === null || _bottomSheetRef$curre === void 0 ? void 0 : _bottomSheetRef$curre.close();
  }, [unmount]);
  const handleCollapse = useCallback(() => {
    if (dismissOnScrollDown) {
      var _bottomSheetRef$curre2;

      (_bottomSheetRef$curre2 = bottomSheetRef.current) === null || _bottomSheetRef$curre2 === void 0 ? void 0 : _bottomSheetRef$curre2.snapTo(1);
    } else {
      var _bottomSheetRef$curre3;

      (_bottomSheetRef$curre3 = bottomSheetRef.current) === null || _bottomSheetRef$curre3 === void 0 ? void 0 : _bottomSheetRef$curre3.collapse();
    }
  }, [dismissOnScrollDown]);
  const handleSnapTo = useCallback(index => {
    var _bottomSheetRef$curre4;

    (_bottomSheetRef$curre4 = bottomSheetRef.current) === null || _bottomSheetRef$curre4 === void 0 ? void 0 : _bottomSheetRef$curre4.snapTo(index + (dismissOnScrollDown ? 1 : 0));
  }, [dismissOnScrollDown]);
  const handleTemporaryCloseSheet = useCallback(() => {
    var _bottomSheetRef$curre5;

    isTemporaryClosing.current = true;
    (_bottomSheetRef$curre5 = bottomSheetRef.current) === null || _bottomSheetRef$curre5 === void 0 ? void 0 : _bottomSheetRef$curre5.close();
  }, []);
  const handleRestoreSheetPosition = useCallback(() => {
    var _bottomSheetRef$curre6;

    isTemporaryClosing.current = false;
    (_bottomSheetRef$curre6 = bottomSheetRef.current) === null || _bottomSheetRef$curre6 === void 0 ? void 0 : _bottomSheetRef$curre6.snapTo(lastSheetPosition.current);
  }, []);
  const handleOverlayPress = useCallback(() => {
    var _bottomSheetRef$curre7;

    (_bottomSheetRef$curre7 = bottomSheetRef.current) === null || _bottomSheetRef$curre7 === void 0 ? void 0 : _bottomSheetRef$curre7.close();
  }, []); //#endregion
  //#region effects

  useImperativeHandle(ref, () => ({
    close: handleClose,
    snapTo: handleSnapTo,
    expand: bottomSheetRef.current.expand,
    collapse: handleCollapse,
    temporaryCloseSheet: handleTemporaryCloseSheet,
    restoreSheetPosition: handleRestoreSheetPosition
  }));
  useEffect(() => {
    var _bottomSheetRef$curre8;

    (_bottomSheetRef$curre8 = bottomSheetRef.current) === null || _bottomSheetRef$curre8 === void 0 ? void 0 : _bottomSheetRef$curre8.snapTo(_initialSnapIndex + (dismissOnScrollDown ? 1 : 0)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //#endregion
  // render

  return /*#__PURE__*/React.createElement(React.Fragment, null, OverlayComponent && /*#__PURE__*/React.createElement(OverlayComponent, _extends({
    animatedOpacity: animatedOverlayOpacity,
    pointerEvents: overlayPointerEvents
  }, dismissOnOverlayPress ? {
    onPress: handleOverlayPress
  } : {})), _animatedPositionIndex && /*#__PURE__*/React.createElement(Animated.Code, {
    exec: set(_animatedPositionIndex, animatedPositionIndex)
  }), /*#__PURE__*/React.createElement(BottomSheet, _extends({
    ref: bottomSheetRef
  }, bottomSheetProps, {
    initialSnapIndex: initialSnapIndex,
    snapPoints: snapPoints,
    animatedPositionIndex: animatedPositionIndex,
    onChange: handleChange
  }), content));
});
const BottomSheetModal = /*#__PURE__*/memo(BottomSheetModalComponent, isEqual);
export default BottomSheetModal;
//# sourceMappingURL=BottomSheetModal.js.map