import React from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets';
import { ErrorImage, ImageModal } from './components';
import { useImagePreview } from './hooks';
import styles from './styles';
import type { ImagePreviewProps } from './types';

const ImagePreview = ({
  imageSource,
  imageStyle,
  customHeader,
  imageProps,
  pinchZoomEnabled = true,
  doubleTapZoomEnabled = true,
  swipeDownCloseEnabled = true,
  errorImageSource = images.errorImage,
}: ImagePreviewProps) => {
  const {
    modalConfig,
    onPressImage,
    setModalConfig,
    imageRef,
    loading,
    setLoading,
    error,
    setError,
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
                pinchZoomEnabled,
                doubleTapZoomEnabled,
                swipeDownCloseEnabled,
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={onPressImage}
              style={[imageStyle, styles.imageParent]}
              disabled={error}>
              <Image
                ref={imageRef}
                source={imageSource}
                style={imageStyle}
                onLoadStart={() => {
                  setLoading(true);
                  setError(false);
                }}
                onLoadEnd={() => {
                  setLoading(false);
                }}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
                {...imageProps}
              />
              {error && <ErrorImage {...{ imageStyle, errorImageSource }} />}
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
