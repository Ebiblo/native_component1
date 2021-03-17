import React, { forwardRef, memo } from 'react';
import isEqual from 'lodash.isequal';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
const ContentWrapperComponent = /*#__PURE__*/forwardRef(({
  children,
  initialMaxDeltaY,
  style,
  onGestureEvent,
  onHandlerStateChange
}, ref) => {
  return /*#__PURE__*/React.createElement(TapGestureHandler, {
    ref: ref,
    maxDurationMs: 1000000,
    maxDeltaY: initialMaxDeltaY,
    shouldCancelWhenOutside: false,
    onGestureEvent: onGestureEvent,
    onHandlerStateChange: onHandlerStateChange
  }, /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: "box-none",
    style: style
  }, children));
});
const ContentWrapper = /*#__PURE__*/memo(ContentWrapperComponent, isEqual);
export default ContentWrapper;
//# sourceMappingURL=ContentWrapper.ios.js.map