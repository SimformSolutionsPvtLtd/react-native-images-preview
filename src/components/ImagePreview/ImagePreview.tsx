import React from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { ImageModal } from './components';
import { useImagePreview } from './hooks';
import styles from './styles';
import type { ImagePreviewProps } from './types';

const ImagePreview = ({ children, customHeader }: ImagePreviewProps) => {
  const {
    modalConfig,
    onPressImage,
    setModalConfig,
    imageRef,
    loading,
    setLoading,
  } = useImagePreview();

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
            <TouchableOpacity
              onPress={onPressImage}
              style={[children.props.style, styles.imageParent]}>
              <Image
                ref={imageRef}
                source={children.props.source}
                style={children.props.style}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onLoadEnd={() => {
                  setLoading(false);
                }}
              />
              {loading && (
                <ActivityIndicator style={styles.activityIndicatorStyle} />
              )}
            </TouchableOpacity>
          )}
          {modalConfig.visible && <View style={children.props.style} />}
        </>
      )}
    </>
  );
};

export default ImagePreview;
