import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ImageModal } from './components';
import { useImagePreview } from './hooks';
import type { ImagePreviewProps } from './types';

const ImagePreview = ({ children, customHeader }: ImagePreviewProps) => {
  const { modalConfig, onPressImage, setModalConfig, imageRef } =
    useImagePreview();

  return (
    <>
      {children && (
        <>
          {modalConfig.visible ? (
            <ImageModal
              modalConfig={modalConfig}
              setModalConfig={setModalConfig}
              customHeader={customHeader}>
              {children}
            </ImageModal>
          ) : (
            <TouchableOpacity onPress={onPressImage}>
              <Image
                ref={imageRef}
                source={children.props.source}
                style={children.props.style}
              />
            </TouchableOpacity>
          )}
          {modalConfig.visible && <View style={children.props.style} />}
        </>
      )}
    </>
  );
};

export default ImagePreview;
