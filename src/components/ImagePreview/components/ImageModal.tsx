import React from 'react';
import { ActivityIndicator, Modal, SafeAreaView } from 'react-native';
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
  setModalConfig,
  modalConfig,
  customHeader,
  imageSource,
}: ImageModalProps) => {
  const styles = imageModalStyle(modalConfig.x, modalConfig.y);
  const {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    animatedImageRef,
    panGestureEvent,
    dropDownStyle,
    animatedImageStyle,
    loading,
    setLoading,
    headerOpacityAnimation,
  } = useImageModal(modalConfig, setModalConfig);
  return (
    <Modal visible={modalConfig.visible} transparent>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <SafeAreaView style={styles.modalContainer}>
              <Header
                {...{ customHeader, onPressClose, headerOpacityAnimation }}
              />
              {loading && (
                <ActivityIndicator style={styles.activityIndicatorStyle} />
              )}
              <Animated.Image
                ref={animatedImageRef}
                source={imageSource}
                resizeMode={'contain'}
                style={[
                  imageAnimatedStyle,
                  dropDownStyle,
                  animatedImageStyle,
                  styles.imageStyle,
                ]}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onLoadEnd={() => {
                  setLoading(false);
                }}
              />
            </SafeAreaView>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ImageModal;
