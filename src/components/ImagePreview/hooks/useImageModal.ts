import type { Dispatch, SetStateAction } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Constants } from '../../../constants';
import { Colors } from '../../../theme';
import type { ModalConfigType } from '../types';

const useImageModal = (
  modalConfig: ModalConfigType,
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>
) => {
  const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = useWindowDimensions();
  const animatedImageRef = useAnimatedRef<Animated.Image>();

  const dropOffSet = useSharedValue(0);
  const offset = useSharedValue(0);
  const colorOffset = useSharedValue(0);
  const scale = useSharedValue(1);
  const startY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const imageSize = useSharedValue({
    height: modalConfig.height,
    width: modalConfig.width,
  });

  offset.value = withTiming(1);
  colorOffset.value = withTiming(1);

  const onPressClose = () => {
    colorOffset.value = withTiming(0);
    offset.value = withTiming(0, {}, () => {
      runOnJS(setModalConfig)({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: false,
      });
    });
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        offset.value,
        [0, 1],
        [modalConfig.height, WINDOW_HEIGHT]
      ),
      width: interpolate(
        offset.value,
        [0, 1],
        [modalConfig.width, WINDOW_WIDTH]
      ),
      top: interpolate(offset.value, [0, 1], [modalConfig.y, 0]),
      left: interpolate(offset.value, [0, 1], [modalConfig.x, 0]),
    };
  });
  const animatedImageStyle = useAnimatedStyle(() => ({
    top: translateY.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorOffset.value,
        [0, 1],
        [Colors.transparent, Colors.black]
      ),
    };
  });

  const panGestureEvent = Gesture.Pan()
    .onChange(e => {
      scale.value -= Constants.scaleThreshold;
      colorOffset.value -= Constants.colorOpacityThreshold;
      translateY.value = e.translationY + startY.value;
    })
    .onEnd(() => {
      const measured = measure(animatedImageRef);
      const { width, height, x } = measured;
      if (measured !== null) {
        imageSize.value = {
          height: height,
          width: width,
        };
        translateX.value = x;
        dropOffSet.value = withTiming(1, {}, () => {
          runOnJS(setModalConfig)({
            x: 0,
            height: 0,
            width: 0,
            y: 0,
            visible: false,
          });
        });
        colorOffset.value = withTiming(0);
      }
      startY.value = translateY.value;
    });

  const dropDownStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(dropOffSet.value, [0, 1], [startY.value, modalConfig.y]),
      left: interpolate(
        dropOffSet.value,
        [0, 1],
        [translateX.value, modalConfig.x]
      ),
      height: interpolate(
        dropOffSet.value,
        [0, 1],
        [imageSize.value.height, modalConfig.height]
      ),
      width: interpolate(
        dropOffSet.value,
        [0, 1],
        [imageSize.value.width, modalConfig.width]
      ),
    };
  });

  return {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    AnimatedSafeAreaView,
    animatedImageRef,
    dropDownStyle,
    panGestureEvent,
    animatedImageStyle,
  };
};

export default useImageModal;
