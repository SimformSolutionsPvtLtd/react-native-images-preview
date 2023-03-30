import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Strings } from '../../../constants';
import { useImageModal } from '../hooks';
import type { ImageModalProps } from '../types';
import styles from './styles/ImageModalStyle';

const ImageModal = ({
  children,
  setModalConfig,
  modalConfig,
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
        <View style={styles.closeButtonParent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onPressClose();
            }}>
            <Text style={styles.closeText}>{Strings.close}</Text>
          </TouchableOpacity>
        </View>
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
