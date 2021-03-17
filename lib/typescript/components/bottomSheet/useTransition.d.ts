import Animated from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import type { BottomSheetAnimationConfigs } from './types';
import { GESTURE } from '../../constants';
interface TransitionProps extends Required<BottomSheetAnimationConfigs> {
    contentPanGestureState: Animated.Value<State>;
    contentPanGestureTranslationY: Animated.Value<number>;
    contentPanGestureVelocityY: Animated.Value<number>;
    handlePanGestureState: Animated.Value<State>;
    handlePanGestureTranslationY: Animated.Value<number>;
    handlePanGestureVelocityY: Animated.Value<number>;
    scrollableContentOffsetY: Animated.Value<number>;
    snapPoints: number[];
    initialPosition: number;
}
export declare const useTransition: ({ animationDuration, animationEasing, contentPanGestureState, contentPanGestureTranslationY, contentPanGestureVelocityY, handlePanGestureState, handlePanGestureTranslationY, handlePanGestureVelocityY, scrollableContentOffsetY, snapPoints, initialPosition, }: TransitionProps) => {
    position: Animated.Node<number>;
    manualSnapToPoint: Animated.Value<number>;
    currentPosition: Animated.Value<number>;
    currentGesture: Animated.Value<GESTURE>;
};
export {};
