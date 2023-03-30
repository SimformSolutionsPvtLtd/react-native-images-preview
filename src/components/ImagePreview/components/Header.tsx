import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Strings } from '../../../constants';
import type { HeaderProps } from '../types';
import styles from './styles/HeaderStyle';

const Header = ({
  customHeader,
  onPressClose,
  headerOpacityAnimation,
}: HeaderProps) => {
  return (
    <Animated.View style={[styles.closeButtonParent, headerOpacityAnimation]}>
      {customHeader ? (
        customHeader(onPressClose)
      ) : (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onPressClose();
          }}>
          <Text style={styles.closeText}>{Strings.close}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Header;
