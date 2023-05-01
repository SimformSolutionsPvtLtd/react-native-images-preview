import { Dispatch, SetStateAction, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StaticValues } from '../../../constants';
import { Colors } from '../../../theme';
import type { ModalConfigType } from '../types';

const useImageModal = (
  modalConfig: ModalConfigType,
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>,
  pinchZoomEnabled: boolean | undefined,
  doubleTapZoomEnabled: boolean | undefined,
  swipeDownCloseEnabled: boolean | undefined
) => {
  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = useWindowDimensions();
  const animatedImageRef = useAnimatedRef<Animated.Image>();
  const [loading, setLoading] = useState<boolean>(false);

  const offset = useSharedValue(0);
  const colorOffset = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const saveScale = useSharedValue(1);
  const oldTranslateX = useSharedValue(0);
  const oldTranslateY = useSharedValue(0);

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

  const updateTranslate = (
    newTraslateX: number,
    newTraslateY: number,
    newScale: number
  ) => {
    'worklet';
    const maxTraslateX =
      ((WINDOW_WIDTH / 2) * newScale - WINDOW_WIDTH / 2) / newScale;
    const minTraslateX = -maxTraslateX;

    const maxTraslateY =
      ((WINDOW_HEIGHT / 2) * newScale - WINDOW_HEIGHT / 2) / newScale;
    const minTraslateY = -maxTraslateY;

    if (newTraslateX > maxTraslateX) {
      translateX.value = maxTraslateX;
    } else if (newTraslateX < minTraslateX) {
      translateX.value = minTraslateX;
    } else {
      translateX.value = newTraslateX;
    }

    if (newTraslateY > maxTraslateY) {
      translateY.value = maxTraslateY;
    } else if (newTraslateY < minTraslateY) {
      translateY.value = minTraslateY;
    } else {
      translateY.value = newTraslateY;
    }
  };

  const panGestureEvent = Gesture.Pan()
    .onChange(eventData => {
      if (scale.value > 1) {
        const newTraslateX = eventData.translationX + oldTranslateX.value;
        const newTraslateY = eventData.translationY + oldTranslateY.value;

        updateTranslate(newTraslateX, newTraslateY, scale.value);
      } else if (swipeDownCloseEnabled) {
        colorOffset.value -= StaticValues.colorOpacityThreshold;
        translateY.value = eventData.translationY + oldTranslateY.value;
      }
    })
    .onEnd(() => {
      if (scale.value === 1 && swipeDownCloseEnabled) {
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
      }
      oldTranslateX.value = translateX.value;
      oldTranslateY.value = translateY.value;
    });

  const doubleTapEvent = Gesture.Tap()
    .numberOfTaps(2)
    .enabled(doubleTapZoomEnabled ?? true)
    .onEnd(eventData => {
      if (scale.value !== 1) {
        scale.value = withTiming(1);
        translateY.value = withTiming(0);
        translateX.value = withTiming(0);
        saveScale.value = withTiming(1);
        oldTranslateX.value = withTiming(0);
        oldTranslateY.value = withTiming(0);
      } else {
        scale.value = withTiming(2);
        saveScale.value = 2;
        translateX.value = withTiming(
          ((WINDOW_WIDTH / 2 - eventData.x) * 1) / 2
        );
        translateY.value = withTiming(
          ((WINDOW_HEIGHT / 2 - eventData.y) * 1) / 2
        );
        oldTranslateX.value = ((WINDOW_WIDTH / 2 - eventData.x) * 1) / 2;
        oldTranslateY.value = ((WINDOW_HEIGHT / 2 - eventData.y) * 1) / 2;
      }
    });

  const pinchGestureEvent = Gesture.Pinch()
    .enabled(pinchZoomEnabled ?? true)
    .onChange(eventData => {
      const updatedScale = saveScale.value * eventData.scale;
      if (updatedScale < 1) {
        scale.value = 1;
      } else {
        scale.value = updatedScale;
        const newTraslateX = oldTranslateX.value;
        const newTraslateY = oldTranslateY.value;
        updateTranslate(newTraslateX, newTraslateY, updatedScale);
      }
    })
    .onEnd(() => {
      saveScale.value = scale.value;
      oldTranslateX.value = translateX.value;
      oldTranslateY.value = translateY.value;
    });

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    top: translateY.value,
    left: translateX.value,
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
      top: interpolate(offset.value, [0, 1], [modalConfig.y, translateY.value]),
      left: interpolate(
        offset.value,
        [0, 1],
        [modalConfig.x, translateX.value]
      ),
    };
  });

  const headerOpacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(colorOffset.value, [0, 1], [0, 1]),
    };
  });

  return {
    loading,
    setLoading,
    onPressClose,
    animatedImageRef,
    imageAnimatedStyle,
    modalAnimatedStyle,
    animatedImageStyle,
    headerOpacityAnimation,
    panGestureEvent,
    pinchGestureEvent,
    doubleTapEvent,
  };
};

export default useImageModal;
