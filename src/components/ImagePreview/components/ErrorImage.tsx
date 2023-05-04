import React from 'react';
import { Image } from 'react-native';
import type { ErrorImageProps } from '../types';
import styles from './styles/ErrorImageStyle';

const ErrorImage = ({ imageStyle, errorImageSource }: ErrorImageProps) => (
  <Image
    source={errorImageSource}
    style={[imageStyle, styles.defaultStyle]}
    resizeMode={'contain'}
  />
);

export default ErrorImage;
