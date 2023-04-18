import React from 'react';
import { Modal } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useImageModal } from '../hooks';
import type { ImageModalProps } from '../types';
import Header from './Header';
import imageModalStyle from './styles/ImageModalStyle';

const ImageModal = ({
  children,
  setModalConfig,
  modalConfig,
  customHeader,
}: ImageModalProps) => {
  const styles = imageModalStyle(modalConfig.x, modalConfig.y);
  const {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    AnimatedSafeAreaView,
    animatedImageRef,
    panGestureEvent,
    dropDownStyle,
    animatedImageStyle,
  } = useImageModal(modalConfig, setModalConfig);

  return (
    <Modal visible={modalConfig.visible} transparent>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector gesture={panGestureEvent}>
          <AnimatedSafeAreaView
            style={[styles.modalContainer, modalAnimatedStyle]}>
            <Header {...{ customHeader, onPressClose }} />
            <Animated.Image
              ref={animatedImageRef}
              source={children.props.source}
              resizeMode={'contain'}
              style={[
                imageAnimatedStyle,
                dropDownStyle,
                animatedImageStyle,
                styles.imageStyle,
              ]}
            />
          </AnimatedSafeAreaView>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ImageModal;
