import React from 'react';
import {
  Image,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { images } from '../assets';
import { ModalHeaderStyle as styles } from './styles';

const ModalHeader = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <Image source={images.close} style={styles.closeIcon} />
    </TouchableOpacity>
  );
};

export default ModalHeader;
