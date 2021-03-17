import React, { memo, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import isEqual from 'lodash.isequal';
import { styles } from './styles';

const BottomSheetOverlayComponent = ({
  color = 'black',
  pointerEvents,
  animatedOpacity,
  onPress
}) => {
  //#region styles
  const containerStyle = useMemo(() => [styles.container, {
    opacity: animatedOpacity,
    backgroundColor: color
  }], [color, animatedOpacity]); //#endregion
  //#region render

  if (onPress) {
    return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
      onPress: onPress,
      style: styles.container
    }, /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: pointerEvents,
      style: containerStyle
    }));
  } else {
    return /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: pointerEvents,
      style: containerStyle
    });
  } //#endregion

};

const BottomSheetOverlay = /*#__PURE__*/memo(BottomSheetOverlayComponent, isEqual);
export default BottomSheetOverlay;
//# sourceMappingURL=Overlay.js.map