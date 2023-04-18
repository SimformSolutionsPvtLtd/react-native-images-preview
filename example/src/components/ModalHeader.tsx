import React from 'react';
import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { images } from '../assets';
import styles from './styles/ModalHeaderStyle';

const ModalHeader = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <Image source={images.close} style={styles.closeIcon} />
    </TouchableOpacity>
  );
};

export default ModalHeader;
