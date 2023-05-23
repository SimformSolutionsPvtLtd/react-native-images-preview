import React from 'react';
import { Image } from 'react-native';
import type { ErrorImageProps } from '../Types';
import { ErrorImageStyle as styles } from './styles';

const ErrorImage = ({ imageStyle, errorImageSource }: ErrorImageProps) => (
  <Image
    source={errorImageSource}
    style={[imageStyle, styles.defaultStyle]}
    resizeMode={'contain'}
  />
);

export default ErrorImage;
