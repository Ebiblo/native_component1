import React, { forwardRef, memo } from 'react';
import isEqual from 'lodash.isequal';
import { TapGestureHandler } from 'react-native-gesture-handler';
const ContentWrapperComponent = /*#__PURE__*/forwardRef(({
  children,
  initialMaxDeltaY,
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
  }, children);
});
const ContentWrapper = /*#__PURE__*/memo(ContentWrapperComponent, isEqual);
export default ContentWrapper;
//# sourceMappingURL=ContentWrapper.android.js.map