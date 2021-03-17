import { Platform } from 'react-native';

const {
  Easing: EasingV1,
  EasingNode: EasingV2
} = require('react-native-reanimated');

const Easing = EasingV2 || EasingV1;
export const DEFAULT_ANIMATION_EASING = Easing.out(Easing.back(0.75));
export const DEFAULT_ANIMATION_DURATION = 500;
export const NORMAL_DECELERATION_RATE = Platform.select({
  ios: 0.998,
  android: 0.985
});
//# sourceMappingURL=constants.js.map