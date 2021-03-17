import React, { memo, useMemo, useEffect, useCallback } from 'react';
import { View as RNView } from 'react-native';
import isEqual from 'lodash.isequal';
import { useBottomSheetInternal } from '../../hooks';
import { styles } from './styles';

const BottomSheetViewComponent = ({
  children,
  style,
  focusHook: useFocusHook = useEffect
}) => {
  // hooks
  const {
    scrollableContentOffsetY
  } = useBottomSheetInternal(); // styles

  const containerStyle = useMemo(() => ({ ...styles.container,
    // @ts-ignore
    ...style
  }), [style]); // callback

  const handleSettingScrollable = useCallback(() => {
    scrollableContentOffsetY.setValue(0); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // effects

  useFocusHook(handleSettingScrollable); //render

  return /*#__PURE__*/React.createElement(RNView, {
    style: containerStyle
  }, children);
};

const BottomSheetView = /*#__PURE__*/memo(BottomSheetViewComponent, isEqual);
export default BottomSheetView;
//# sourceMappingURL=View.js.map