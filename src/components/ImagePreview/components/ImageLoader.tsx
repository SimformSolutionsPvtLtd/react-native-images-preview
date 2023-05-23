import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { ImageLoaderProps } from '../Types';
import { ImageLoaderStyle as styles } from './styles';

const ImageLoader = ({ renderImageLoader, ...rest }: ImageLoaderProps) => {
  return renderImageLoader ? (
    renderImageLoader()
  ) : (
    <ActivityIndicator style={styles.activityIndicatorStyle} {...rest} />
  );
};

export default ImageLoader;
