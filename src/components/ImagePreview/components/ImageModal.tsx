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
    animatedImageRef,
    panGestureEvent,
    dropDownStyle,
    animatedImageStyle,
    loading,
    setLoading,
  } = useImageModal(modalConfig, setModalConfig);
  return (
    <Modal visible={modalConfig.visible} transparent>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <SafeAreaView style={styles.modalContainer}>
              <Header {...{ customHeader, onPressClose }} />
              {loading && (
                <ActivityIndicator style={styles.activityIndicatorStyle} />
              )}
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
