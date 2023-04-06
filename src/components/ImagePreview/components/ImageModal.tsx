import React from 'react';
import { Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import { useImageModal } from '../hooks';
import type { ImageModalProps } from '../types';
import Header from './Header';
import styles from './styles/ImageModalStyle';

const ImageModal = ({
  children,
  setModalConfig,
  modalConfig,
  customHeader,
}: ImageModalProps) => {
  const {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    AnimatedSafeAreaView,
  } = useImageModal(children, modalConfig, setModalConfig);

  return (
    <Modal visible={modalConfig.visible}>
      <AnimatedSafeAreaView style={[styles.modalContainer, modalAnimatedStyle]}>
        <Header customHeader={customHeader} onPressClose={onPressClose} />
        <Animated.Image
          source={children.props.source}
          resizeMode={'contain'}
          style={[styles.imageStyle, imageAnimatedStyle]}
        />
      </AnimatedSafeAreaView>
    </Modal>
  );
};

export default ImageModal;
