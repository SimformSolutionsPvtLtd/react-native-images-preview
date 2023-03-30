import React from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { ImageModal } from './components';
import { useImagePreview } from './hooks';
import styles from './styles';
import type { ImagePreviewProps } from './types';

const ImagePreview = ({
  imageSource,
  imageStyle,
  customHeader,
}: ImagePreviewProps) => {
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
      {imageSource && (
        <>
          {modalConfig.visible ? (
            <ImageModal
              {...{
                modalConfig,
                setModalConfig,
                customHeader,
                imageSource,
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={onPressImage}
              style={[imageStyle, styles.imageParent]}>
              <Image
                ref={imageRef}
                source={imageSource}
                style={imageStyle}
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
          {modalConfig.visible && <View style={imageStyle} />}
        </>
      )}
    </>
  );
};

export default ImagePreview;
