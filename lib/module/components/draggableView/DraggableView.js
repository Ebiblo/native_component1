function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, useRef, memo } from 'react';
import isEqual from 'lodash.isequal';
import Animated, { event } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useBottomSheetInternal } from '../../hooks';
import { styles } from './styles';

const BottomSheetDraggableViewComponent = ({
  nativeGestureRef,
  gestureType = 'HANDLE',
  style,
  children,
  ...rest
}) => {
  // refs
  const panGestureRef = useRef(null); // hooks

  const {
    enabled,
    rootTapGestureRef,
    handlePanGestureState,
    handlePanGestureTranslationY,
    handlePanGestureVelocityY,
    contentPanGestureState,
    contentPanGestureTranslationY,
    contentPanGestureVelocityY
  } = useBottomSheetInternal(); // variables

  const simultaneousHandlers = useMemo(() => nativeGestureRef ? [rootTapGestureRef, nativeGestureRef] : rootTapGestureRef, [rootTapGestureRef, nativeGestureRef]); // styles

  const containerStyle = useMemo(() => style ? [styles.container, style] : styles.container, [style]); // callbacks

  const handleGestureEvent = useMemo(() => gestureType === 'CONTENT' ? event([{
    nativeEvent: {
      state: contentPanGestureState,
      translationY: contentPanGestureTranslationY,
      velocityY: contentPanGestureVelocityY
    }
  }]) : event([{
    nativeEvent: {
      state: handlePanGestureState,
      translationY: handlePanGestureTranslationY,
      velocityY: handlePanGestureVelocityY
    }
  }]), // eslint-disable-next-line react-hooks/exhaustive-deps
  [gestureType]); // effects

  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    ref: panGestureRef,
    enabled: enabled,
    simultaneousHandlers: simultaneousHandlers,
    shouldCancelWhenOutside: false,
    onGestureEvent: handleGestureEvent,
    onHandlerStateChange: handleGestureEvent
  }, /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: containerStyle
  }, rest), children));
};

const BottomSheetDraggableView = /*#__PURE__*/memo(BottomSheetDraggableViewComponent, isEqual);
export default BottomSheetDraggableView;
//# sourceMappingURL=DraggableView.js.map