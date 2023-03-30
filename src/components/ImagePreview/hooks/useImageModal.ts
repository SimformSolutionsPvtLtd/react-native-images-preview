import type { Dispatch, SetStateAction } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../../theme';
import type { ModalConfigType } from '../types';

const useImageModal = (
  children: React.ReactElement,
  modalConfig: ModalConfigType,
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>
) => {
  const offset = useSharedValue(0);
  offset.value = withTiming(1, { duration: 300 });
  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = useWindowDimensions();
  const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

  const onPressClose = () => {
    offset.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setModalConfig)({ x: 0, y: 0, visible: false });
    });
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        offset.value,
        [0, 1],
        [children.props.style.height, WINDOW_HEIGHT]
      ),
      width: interpolate(
        offset.value,
        [0, 1],
        [children.props.style.width, WINDOW_WIDTH]
      ),
      top: interpolate(offset.value, [0, 1], [modalConfig.y, 0]),
      left: interpolate(offset.value, [0, 1], [modalConfig.x, 0]),
    };
  });

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        offset.value,
        [0, 1],
        [Colors.transparent, Colors.black]
      ),
    };
  });

  return {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    AnimatedSafeAreaView,
  };
};

export default useImageModal;
