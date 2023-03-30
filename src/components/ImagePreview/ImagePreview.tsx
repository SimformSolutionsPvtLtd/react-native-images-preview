import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ImageModal } from './components';
import { useImagePreview } from './hooks';
import styles from './styles';
import type { ImagePreviewProps } from './types';

const ImagePreview = ({ children, customHeader }: ImagePreviewProps) => {
  const { modalConfig, onPressImage, setModalConfig, viewRef } =
    useImagePreview();

  return (
    <>
      <View
        style={children.props.style}
        ref={viewRef}
        renderToHardwareTextureAndroid={true}>
        <TouchableOpacity onPress={onPressImage}>
          <Image
            source={children.props.source}
            style={styles.imageStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      {modalConfig.visible && (
        <ImageModal
          modalConfig={modalConfig}
          setModalConfig={setModalConfig}
          customHeader={customHeader}>
          {children}
        </ImageModal>
      )}
    </>
  );
};

export default ImagePreview;
