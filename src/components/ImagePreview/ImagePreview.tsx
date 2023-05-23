import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets';
import { ErrorImage, ImageLoader, ImageModal } from './components';
import { useImagePreview } from './hooks';
import styles from './Styles';
import type { ImagePreviewProps } from './Types';

const ImagePreview = ({
  imageSource,
  imageStyle,
  renderHeader,
  imageProps,
  pinchZoomEnabled = true,
  doubleTapZoomEnabled = true,
  swipeDownCloseEnabled = true,
  errorImageSource = images.errorImage,
  imageLoaderProps,
  renderImageLoader,
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
                renderHeader,
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
                <ImageLoader {...{ renderImageLoader }} {...imageLoaderProps} />
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
