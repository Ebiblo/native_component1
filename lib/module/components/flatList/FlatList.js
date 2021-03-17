function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useRef, useImperativeHandle, useEffect, memo } from 'react';
import { FlatList as RNFlatList } from 'react-native';
import isEqual from 'lodash.isequal';
import Animated from 'react-native-reanimated';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import DraggableView from '../draggableView';
import { useScrollableInternal, useBottomSheetInternal } from '../../hooks';
import { styles } from './styles';
const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);
const BottomSheetFlatListComponent = /*#__PURE__*/forwardRef((props, ref) => {
  // props
  const {
    focusHook: useFocusHook = useEffect,
    ...rest
  } = props; // refs

  const nativeGestureRef = useRef(null); // hooks

  const {
    scrollableRef,
    handleScrollEvent,
    handleSettingScrollable
  } = useScrollableInternal('FlatList');
  const {
    enabled,
    rootTapGestureRef,
    decelerationRate
  } = useBottomSheetInternal(); // effects
  // @ts-ignore

  useImperativeHandle(ref, () => scrollableRef.current.getNode());
  useFocusHook(handleSettingScrollable); // render

  return /*#__PURE__*/React.createElement(DraggableView, {
    nativeGestureRef: nativeGestureRef,
    gestureType: "CONTENT",
    style: styles.container
  }, /*#__PURE__*/React.createElement(NativeViewGestureHandler, {
    ref: nativeGestureRef,
    enabled: enabled,
    waitFor: rootTapGestureRef
  }, /*#__PURE__*/React.createElement(AnimatedFlatList, _extends({}, rest, {
    // @ts-ignore
    ref: scrollableRef,
    overScrollMode: "never",
    bounces: false,
    decelerationRate: decelerationRate,
    scrollEventThrottle: 1,
    onScrollBeginDrag: handleScrollEvent
  }))));
});
const BottomSheetFlatList = /*#__PURE__*/memo(BottomSheetFlatListComponent, isEqual);
export default BottomSheetFlatList;
//# sourceMappingURL=FlatList.js.map